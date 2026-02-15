-- ============================================
-- RESET
-- WARNING: This drops ALL data
-- ONLY USE IN DEVELOPMENT!!!
-- ============================================


-- ============================================
-- TABLES
-- ============================================

drop table if exists public.users cascade;
drop table if exists public.daily_summary cascade;
drop table if exists public.huddle_updates cascade;
drop table if exists public.iv_room cascade;
drop table if exists public.command_center cascade;
drop table if exists public.distribution cascade;
drop table if exists public.non_sterile cascade;


-- ============================================
-- TRIGGERS
-- ============================================
drop function if exists sync_iv_room_to_daily_summary cascade;
drop function if exists upsert_huddle_summary cascade;
drop function if exists sync_iv_room_summary cascade;
drop function if exists sync_command_center_summary cascade;
drop function if exists sync_distribution_summary cascade;
drop function if exists sync_non_sterile_summary cascade;


-- ============================================
-- RLS POLICIES
-- ============================================

-- users
drop policy if exists "Anyone can view users" on public.users;
drop policy if exists "Users can update own profile" on public.users;

-- daily_summary
drop policy if exists "Anyone can view daily summaries" on public.daily_summary;
drop policy if exists "Authenticated users can insert daily summaries" on public.daily_summary;
drop policy if exists "Authenticated users can update daily summaries" on public.daily_summary;
drop policy if exists "Authenticated users can delete daily summaries" on public.daily_summary;

-- huddle_updates
drop policy if exists "Anyone can view huddle updates" on public.huddle_updates;
drop policy if exists "Authenticated users can insert huddle updates" on public.huddle_updates;
drop policy if exists "Authenticated users can update huddle updates" on public.huddle_updates;
drop policy if exists "Authenticated users can delete huddle updates" on public.huddle_updates;

-- iv_room
drop policy if exists "Anyone can view iv room" on public.iv_room;
drop policy if exists "Authenticated users can insert iv room" on public.iv_room;
drop policy if exists "Authenticated users can update iv room" on public.iv_room;
drop policy if exists "Authenticated users can delete iv room" on public.iv_room;

-- command_center
drop policy if exists "Anyone can view command center" on public.command_center;
drop policy if exists "Authenticated users can insert command center" on public.command_center;
drop policy if exists "Authenticated users can update command center" on public.command_center;
drop policy if exists "Authenticated users can delete command center" on public.command_center;

-- distribution
drop policy if exists "Anyone can view distribution" on public.distribution;
drop policy if exists "Authenticated users can insert distribution" on public.distribution;
drop policy if exists "Authenticated users can update distribution" on public.distribution;
drop policy if exists "Authenticated users can delete distribution" on public.distribution;

-- non_sterile
drop policy if exists "Anyone can view non sterile" on public.non_sterile;
drop policy if exists "Authenticated users can insert non sterile" on public.non_sterile;
drop policy if exists "Authenticated users can update non sterile" on public.non_sterile;
drop policy if exists "Authenticated users can delete non sterile" on public.non_sterile;