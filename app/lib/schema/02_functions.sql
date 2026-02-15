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
  p_date date, -- 'p_' prefix = parameter (convention)
  p_shift text,
  p_department text, -- Dynamic pience
  p_summary_text text
)
returns void as $$ -- 'void' means it returns nothing (just does work)
declare
  v_summary_id uuid;
begin
  -- Step 1: Find daily_summary id
  select id into v_summary_id
  from public.daily_summary
  where date = p_date
    and shift = p_shift;

  -- Step 2: Only proceed if daily_summary exists
  if v_summary_id is not null then
    -- Insert if new, Update if exists
    insert into public.huddle_updates(
      daily_summary_id,
      department,
      update_text,
      updated_at
    )
    values (
      v_summary_id,
      p_department,
      p_summary_text,
      now()
    )
    on conflict (daily_summary_id, department)
    do update set
      update_text = excluded.update_text,
      updated_at = now();
  end if;
end;
$$ language plpgsql;


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
    NEW.summary_text
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
    NEW.summary_text
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
    NEW.summary_text
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
    NEW.summary_text
  );
  return NEW;
end;
$$ language plpgsql;

create trigger trigger_sync_non_sterile_summary
  after insert or update of summary_text
  on public.non_sterile
  for each row
  execute function sync_non_sterile_summary();