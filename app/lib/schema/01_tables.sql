-- ============================================
-- TABLE 1: users (update existing table)
-- ============================================
-- If your users table already exists, skip this and just verify it has these columns
create table if not exists public.users (
  id text primary key,
  email text unique not null,
  full_name text,
  first_name text,
  last_name text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  last_sign_in timestamp with time zone
);


-- ============================================
-- TABLE 2: daily_summary (shared shift data)
-- ============================================
create table public.daily_summary (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null check (shift in ('morning', 'afternoon', 'evening')),
  
  -- Core metrics 
  census integer, -- Patient count (842, 896, etc.)
  tpn text, -- "22 total, 5 NICU"
  hazardous text, -- "3 plus 2 ITs"
  staffing text, -- "Full with 3 projects" or "Contingency"
  shift_lead text,
  
  
  -- Weekend-only fields (nullable on weekdays)
  recognition text, -- "Weekend only" - recognition/question of the day
  issues_safety text, -- "Weekend only" - issues or safety events
  announcements text, -- "Weekend only" - announcements
  
  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id), -- Text because DUO ID's are text not UUID
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id), -- Text because DUO ID's are text not UUID
  
  unique(date, shift)
);

-- ============================================
-- TABLE 3: huddle_updates (team updates)
-- ============================================
create table public.huddle_updates (
  id uuid primary key default gen_random_uuid(),
  daily_summary_id uuid not null references public.daily_summary(id) on delete cascade,
  
  department text not null check (department in (
    'Distribution',
    'CSR',
    'IVR',
    'Nonsterile',
    'RX Leadership',
    'ORP',
    'T8'
  )),

  -- Actual update content from team huddle
  update_text text, -- "5 complex preps completed, queue clear"
  
  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id), -- Text because DUO ID's are text not UUID
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id), -- Text because DUO ID's are text not UUID
  
  -- Only one update per department per shift
  unique(daily_summary_id, department)
);


-- ============================================
-- TABLE 4: iv_room
-- ============================================
create table public.iv_room (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null check (shift in ('morning', 'afternoon', 'evening')),

  -- Core metrics (top grid)
  bell_iv text,
  tpn text,            -- Triggers update to daily_summary.tpn
  hazardous text,      -- Triggers update to daily_summary.hazardous
  sc text,             -- Sterile compounding hours
  assignment_two text,
  training text,
  iv_support text,

  -- Full-width fields (bottom section)
  safety text,       -- Safety concerns, good catches, workarounds
  barriers text,       -- Medkeeper/DP barriers, missing/failing equipment
  wins text,     -- Team wins and recognition
  opportunities text,
  announcements text,  -- Department announcements
  inventory text,      -- Medication supply escalations
  team_building text,  -- Team building questions

  -- Trigger field
  summary_text text,

  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id),
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id),

  -- Prevent duplicate entries
  unique(date, shift)
);


-- ============================================
-- TABLE 5: command_center
-- ============================================
create table public.command_center (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null default 'morning'
    check (shift in ('morning', 'afternoon', 'evening')),

  -- Metrics
  hot_spots text,
  ca_tpn text, -- This actually won't be supplied iv room
  hc_tpn text, -- Neither will this

  
  -- Workload descriptions
  workload_csr text,
  workload_cmd text,
  workload_pp text,

  -- Shared fields
  safety text,
  barriers text,
  wins text,
  opportunities text,
  announcements text,

  -- Trigger field
  summary_text text,

  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id),
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id),

  unique(date, shift)
);


-- ============================================
-- TABLE 6: distribution
-- ============================================
create table public.distribution (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null default 'morning'
    check (shift in ('morning', 'afternoon', 'evening')),

  -- Metrics
  hot_spots text,
  ca_tpn text, -- This actually won't be supplied iv room
  hc_tpn text, -- Neither will this

  -- Shared fields
  barriers text,
  safety text,
  wins text,
  opportunities text,
  inventory text,
  announcements text,

  -- Trigger fields
  summary_text text,

  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id),
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id),

  unique(date, shift)
);


-- ============================================
-- TABLE 7: non_sterile
-- ============================================
create table public.non_sterile (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null default 'morning'
    check (shift in ('morning', 'afternoon', 'evening')),

  -- Shared fields
    barriers text,
    safety text,
    wins text,
    opportunities text,
    announcements text,

  -- Trigger field
    summary_text text,

  -- Audit fields
    created_at timestamp with time zone default now(),
    created_by text references public.users(id),
    updated_at timestamp with time zone default now(),
    updated_by text references public.users(id),

    unique(date, shift)
);


-- ============================================
-- TABLE 8: team_eight
-- ============================================
create table public.team_eight (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null check (shift in ('morning', 'afternoon', 'evening')),

  -- Core metrics (top grid)
  eight_a text,
  eight_b text,
  iv_one text,
  iv_two text,

  -- Full-width fields (bottom section)
  safety text,
  barriers text,
  wins text,
  announcements text,
  opportunities text,
  inventory text,

  -- Trigger field
  summary_text text,

  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id),
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id),

  -- Prevent duplicate entries
  unique(date, shift)
);


-- ============================================
-- TABLE 9: or_pharmacy
-- ============================================
create table public.or_pharmacy (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null check (shift in ('morning', 'afternoon', 'evening')),

  -- Core metrics (top grid)
  assignment_one text,
  assignment_two text,
  orft text,
  training text,
  support text,
  monthly_clean text,

  -- Full-width fields (bottom section)
  safety text,
  barriers text,
  wins text,
  announcements text,
  opportunities text,
  inventory text,

  -- Trigger field
  summary_text text,

  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id),
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id),

  -- Prevent duplicate entries
  unique(date, shift)
);


-- ============================================
-- TABLE 10: overnight
-- ============================================
create table public.overnight (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null check (shift in ('morning', 'afternoon', 'evening')),

  -- Core metrics (top grid)
  -- assignment_one text,
  -- assignment_two text,
  -- orft text,
  -- training text,
  -- support text,
  -- monthly_clean text,

  -- Full-width fields (bottom section)
  safety text,
  barriers text,
  wins text,
  announcements text,
  opportunities text,
  inventory text,

  -- Trigger field
  summary_text text,

  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id),
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id),

  -- Prevent duplicate entries
  unique(date, shift)
);


-- ============================================
-- INDEXES (for query performance)
-- ============================================
create index idx_daily_summary_date_shift on public.daily_summary(date, shift);
create index idx_huddle_updates_summary_id on public.huddle_updates(daily_summary_id);
create index idx_huddle_updates_department on public.huddle_updates(department);
create index idx_iv_room_date_shift on public.iv_room(date, shift);
create index idx_command_center_date_shift on public.command_center(date, shift);
create index idx_distribution_date_shift on public.distribution(date, shift);
-- create index idx_non_sterile_date_shift on public.non_sterile(date, shift);
create index idx_or_pharmacy_date_shift on public.or_pharmacy(date, shift);
create index idx_team_eight_date_shift on public.team_eight(date, shift);
create index idx_overnight_date_shift on public.team_eight(date, shift);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
alter table public.users enable row level security;
alter table public.daily_summary enable row level security;
alter table public.huddle_updates enable row level security;
alter table public.iv_room enable row level security;
alter table public.command_center enable row level security;
alter table public.distribution enable row level security;
-- alter table public.non_sterile enable row level security;
alter table public.or_pharmacy enable row level security;
alter table public.team_eight enable row level security;
alter table public.overnight enable row level security;



-- For Supabase SQL Editor
-- ============================================
-- TABLE 10: overnight
-- ============================================
create table public.overnight (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null check (shift in ('morning', 'afternoon', 'evening')),

  -- Core metrics (top grid)
  -- assignment_one text,
  -- assignment_two text,
  -- orft text,
  -- training text,
  -- support text,
  -- monthly_clean text,

  -- Full-width fields (bottom section)
  safety text,
  barriers text,
  wins text,
  announcements text,
  opportunities text,
  inventory text,

  -- Trigger field
  summary_text text,

  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id),
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id),

  -- Prevent duplicate entries
  unique(date, shift)
);

create index idx_overnight_date_shift on public.overnight(date, shift);

alter table public.overnight enable row level security;

-- ============================================
-- TRIGGER:  overnight to huddle_updates
-- ============================================
create or replace function sync_overnight_summary()
returns trigger as $$
begin
  perform upsert_huddle_summary(
    NEW.date,
    NEW.shift,
    'ON',
    NEW.summary_text,
    NEW.updated_by
  );
  return NEW;
end;
$$ language plpgsql;

create trigger trigger_sync_overnight_summary
  after insert or update of summary_text
  on public.overnight
  for each row
  execute function sync_overnight_summary();

CREATE TRIGGER trigger_audit_overnight
AFTER INSERT OR UPDATE OR DELETE ON overnight
FOR EACH ROW EXECUTE FUNCTION log_audit_change();




-- ============================================
-- TABLE 11: med_history
-- ============================================
create table public.med_history (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null check (shift in ('morning', 'afternoon', 'evening')),

  -- Full-width fields (bottom section)
  safety text,
  barriers text,
  wins text,
  announcements text,
  opportunities text,

  -- Trigger field
  summary_text text,

  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id),
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id),

  -- Prevent duplicate entries
  unique(date, shift)
);

create index idx_med_history_date_shift on public.med_history(date, shift);


alter table public.med_history enable row level security;

create policy "Allow public access to med_history"
  on public.med_history for all
  using (true) with check (true);

-- ============================================
-- TRIGGER:  med_history to huddle_updates
-- ============================================
create or replace function sync_med_history_summary()
returns trigger as $$
begin
  perform upsert_huddle_summary(
    NEW.date,
    NEW.shift,
    'MH',
    NEW.summary_text,
    NEW.updated_by
  );
  return NEW;
end;
$$ language plpgsql;

create trigger trigger_sync_med_history_summary
  after insert or update of summary_text
  on public.med_history
  for each row
  execute function sync_med_history_summary();


CREATE TRIGGER trigger_audit_med_history
AFTER INSERT OR UPDATE OR DELETE ON med_history
FOR EACH ROW EXECUTE FUNCTION log_audit_change();

-- Med History Search
CREATE OR REPLACE FUNCTION med_history_search(search_term TEXT)
RETURNS TABLE (department TEXT, date DATE, summary TEXT, field_label TEXT)
LANGUAGE sql
AS $$

SELECT 'Med History', date, safety, 'Safety'
FROM med_history WHERE safety ILIKE '%' || search_term || '%'

UNION ALL
SELECT 'Med History', date, barriers, 'Barriers'
FROM med_history WHERE barriers ILIKE '%' || search_term || '%'

UNION ALL
SELECT 'Med History', date, wins, 'Team Wins'
FROM med_history WHERE wins ILIKE '%' || search_term || '%'

UNION ALL
SELECT 'Med History', date, announcements, 'Announcements'
FROM med_history WHERE announcements ILIKE '%' || search_term || '%'

UNION ALL
SELECT 'Med History', date, opportunities, 'Opportunities'
FROM med_history WHERE opportunities ILIKE '%' || search_term || '%'

ORDER BY date DESC
$$;