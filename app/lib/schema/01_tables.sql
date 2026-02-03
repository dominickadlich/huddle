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
-- INDEXES (for query performance)
-- ============================================
create index idx_daily_summary_date_shift on public.daily_summary(date, shift);
create index idx_huddle_updates_summary_id on public.huddle_updates(daily_summary_id);
create index idx_huddle_updates_department on public.huddle_updates(department);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
alter table public.users enable row level security;
alter table public.daily_summary enable row level security;
alter table public.huddle_updates enable row level security;