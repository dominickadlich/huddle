-- ============================================
-- TRIGGER: Sync TPN to daily_summary
-- ============================================
create or replace function sync_iv_room_to_daily_summary()
returns trigger as $$
begin
  -- When iv_room is inserted or updated,
  -- find the matching daily_summary row and update tpn + hazardous

  update public.daily_summary
  set 
    tpn = NEW.tpn,
    updated_at = now()
  where 
    date = NEW.date        -- Match same date
    and shift = NEW.shift; -- Match same shift

  -- Return NEW is required for row-level triggers
  return NEW;
end;
$$ language plpgsql;

create trigger trigger_sync_iv_room_to_daily_summary
  after insert or update of tpn   -- Only fires when tpn column changes
  on public.iv_room
  for each row
  execute function sync_iv_room_to_daily_summary();