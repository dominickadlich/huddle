-- ============================================
-- TABLE 1: users (your existing table, cleaned up)
-- ============================================
create table public.users (
  id text primary key,  -- Duo provides text IDs, not UUIDs
  email text unique not null, -- Email is uploaded after every login
  full_name text,
  first_name text,
  last_name text,
  
  -- Audit timestamps
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  last_sign_in timestamp with time zone
);

-- ============================================
-- TABLE 2: daily_summary
-- ============================================
create table public.daily_summary (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null check (shift in ('morning', 'afternoon', 'evening')),
  
  -- Shared metrics
  census integer,
  staffing text,
  shift_leads text,
  
  -- Audit fields (FK now points to text, not uuid!)
  created_at timestamp with time zone default now(),
  created_by text references public.users(id), 
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id), 
  
  unique(date, shift)
);

-- ============================================
-- TABLE 3: huddles
-- ============================================
create table public.huddles (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null check (shift in ('morning', 'afternoon', 'evening')),
  department text not null check (department in ('CSR', 'IVR', 'Cambridge', 'Operations')),
  
  daily_summary_id uuid references public.daily_summary(id) on delete cascade,
  
  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id),  
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id),  
  
  unique(date, shift, department)
);

-- ============================================
-- TABLE 4: huddle_metrics
-- ============================================
create table public.huddle_metrics (
  id uuid primary key default gen_random_uuid(),
  huddle_id uuid references public.huddles(id) on delete cascade,
  
  metrics jsonb not null default '{}',
  
  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id),
  updated_at timestamp with time zone default now(),
  updated_by text references public.users(id),
  
  unique(huddle_id)
);

-- ============================================
-- TABLE 5: huddle_items
-- ============================================
create table public.huddle_items (
  id uuid primary key default gen_random_uuid(),
  huddle_id uuid references public.huddles(id) on delete cascade,
  
  type text not null check (type in (
    'unresolved_issue',
    'barrier',
    'shout_out',
    'go_live',
    'safety',
    'inventory'
  )),
  
  description text not null,
  status text check (status in ('open', 'completed')),
  
  -- Audit fields
  created_at timestamp with time zone default now(),
  created_by text references public.users(id), 
  completed_at timestamp with time zone,
  completed_by text references public.users(id), 
  
  -- Ensure status is only set for items that can be completed
  check (
    (type in ('unresolved_issue', 'barrier') and status is not null) or
    (type not in ('unresolved_issue', 'barrier') and status is null)
  )
);

-- ============================================
-- Indexes for common queries
-- ============================================
create index idx_huddles_date_shift on public.huddles(date, shift);
create index idx_huddle_items_huddle_id on public.huddle_items(huddle_id);
create index idx_huddle_items_status on public.huddle_items(status) where status = 'open';