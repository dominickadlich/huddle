-- ============================================
-- TRIGGER: Sync TPN & HAZ to daily_summary
-- ============================================
create or replace function sync_iv_room_to_daily_summary()
returns trigger as $$
begin
  update public.daily_summary
  set 
    tpn = NEW.tpn,
    hazardous = NEW.hazardous,
    updated_by = NEW.updated_by,
    updated_at = now()
  where 
    date = NEW.date        -- Match same date
    and shift = NEW.shift; -- Match same shift

  return NEW;
end;
$$ language plpgsql;

create trigger trigger_sync_iv_room_to_daily_summary
  after insert or update of tpn, hazardous  -- Only fires when tpn or hazardous changes
  on public.iv_room
  for each row
  execute function sync_iv_room_to_daily_summary();


-- ============================================
-- HELPER: Upsert into huddle_updates
-- ============================================
create or replace function upsert_huddle_summary(
  p_date date,
  p_shift text,
  p_department text,
  p_summary_text text,
  p_user_id text
)
returns void as $$
declare
  v_summary_id uuid;
begin
  -- Find OR CREATE daily_summary
  select id into v_summary_id
  from public.daily_summary
  where date = p_date and shift = p_shift;
  
  if v_summary_id is null then
    insert into public.daily_summary (date, shift, created_by, updated_by)
    values (p_date, p_shift, p_user_id, p_user_id)
    returning id into v_summary_id;
  end if;
  
  -- Upsert into huddle_updates
  insert into public.huddle_updates(
    daily_summary_id,
    department,
    update_text,
    created_by,
    updated_by,
    updated_at
  )
  values (v_summary_id, p_department, p_summary_text, p_user_id, p_user_id, now())
  on conflict (daily_summary_id, department)
  do update set
    update_text = excluded.update_text,
    updated_by = p_user_id,
    updated_at = now();
end;
$$ language plpgsql security definer; 


-- ============================================
-- TRIGGER: iv_room to huddle_updates
-- ============================================
create or replace function sync_iv_room_summary()
returns trigger as $$
begin
  perform upsert_huddle_summary(
    NEW.date,
    NEW.shift,
    'IVR',
    NEW.summary_text,
    NEW.updated_by
  );
  return NEW;
end;
$$ language plpgsql;

create trigger trigger_iv_room_summary
  after insert or update of summary_text
  on public.iv_room
  for each row
  execute function sync_iv_room_summary();



-- ============================================
-- TRIGGER: command_center to huddle_updates
-- ============================================
create or replace function sync_command_center_summary()
returns trigger as $$
begin
  perform upsert_huddle_summary(
    NEW.date,
    NEW.shift,
    'CSR',
    NEW.summary_text,
    NEW.updated_by
  );
  return NEW;
end;
$$ language plpgsql;

create trigger trigger_sync_command_center_summary
  after insert or update of summary_text
  on public.command_center
  for each row
  execute function sync_command_center_summary();

-- ============================================
-- TRIGGER:  distribution to huddle_updates
-- ============================================
create or replace function sync_distribution_summary()
returns trigger as $$
begin
  perform upsert_huddle_summary(
    NEW.date,
    NEW.shift,
    'Distribution',
    NEW.summary_text,
    NEW.updated_by
  );
  return NEW;
end;
$$ language plpgsql;

create trigger trigger_sync_distribution_summary
  after insert or update of summary_text
  on public.distribution
  for each row
  execute function sync_distribution_summary();

-- ============================================
-- TRIGGER: non_sterile to huddle_updates
-- ============================================
create or replace function sync_non_sterile_summary()
returns trigger as $$
begin
  perform upsert_huddle_summary(
    NEW.date,
    NEW.shift,
    'Nonsterile',
    NEW.summary_text,
    NEW.updated_by
  );
  return NEW;
end;
$$ language plpgsql;

create trigger trigger_sync_non_sterile_summary
  after insert or update of summary_text
  on public.non_sterile
  for each row
  execute function sync_non_sterile_summary();