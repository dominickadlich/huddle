-- ============================================
-- Reset
-- ============================================
-- WARNING: This drops ALL data - only use in development!

drop table if exists public.huddle_items cascade;
drop table if exists public.huddle_metrics cascade;
drop table if exists public.huddles cascade;
drop table if exists public.daily_summary cascade;
drop table if exists public.users cascade;

-- Drop any custom types (if you add enums later)
drop type if exists shift_type cascade;
drop type if exists department_type cascade;