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
    'RX Leadership'
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
-- INDEXES (for query performance)
-- ============================================
create index idx_daily_summary_date_shift on public.daily_summary(date, shift);
create index idx_huddle_updates_summary_id on public.huddle_updates(daily_summary_id);
create index idx_huddle_updates_department on public.huddle_updates(department);
create index idx_iv_room_date_shift on public.iv_room(date, shift);
create index idx_command_center_date_shift on public.command_center(date, shift);
create index idx_distribution_date_shift on public.distribution(date, shift);
create index idx_non_sterile_date_shift on public.non_sterile(date, shift);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
alter table public.users enable row level security;
alter table public.daily_summary enable row level security;
alter table public.huddle_updates enable row level security;
alter table public.iv_room enable row level security;
alter table public.command_center enable row level security;
alter table public.distribution enable row level security;
alter table public.non_sterile enable row level security;