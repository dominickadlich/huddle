-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
alter table public.users enable row level security;
alter table public.daily_summary enable row level security;
alter table public.huddles enable row level security;
alter table public.huddle_metrics enable row level security;
alter table public.huddle_items enable row level security;

-- ============================================
-- USERS TABLE POLICIES
-- ============================================
-- Users can view all users (for displaying names in UI)
create policy "Anyone can view users"
  on public.users
  for select
  using (true);

-- Users can update their own profile only
create policy "Users can update own profile"
  on public.users
  for update
  using (auth.uid() = id); -- Will this work with DUO text ID's?

-- ============================================
-- DAILY_SUMMARY (MVP: Everyone can edit)
-- ============================================
create policy "Anyone can view daily summaries"
  on public.daily_summary
  for select
  using (true);

create policy "Authenticated users can insert daily summaries"
  on public.daily_summary
  for insert
  with check (auth.uid() is not null);

create policy "Authenticated users can update daily summaries"
  on public.daily_summary
  for update
  using (auth.uid() is not null);

create policy "Authenticated users can delete daily summaries"
  on public.daily_summary
  for delete
  using (auth.uid() is not null);

-- ============================================
-- HUDDLES (MVP: Everyone can edit)
-- ============================================
create policy "Anyone can view huddles"
  on public.huddles
  for select
  using (true);

create policy "Authenticated users can insert huddles"
  on public.huddles
  for insert
  with check (auth.uid() is not null);

create policy "Authenticated users can update huddles"
  on public.huddles
  for update
  using (auth.uid() is not null);

create policy "Authenticated users can delete huddles"
  on public.huddles
  for delete
  using (auth.uid() is not null);

-- ============================================
-- HUDDLE_METRICS (MVP: Everyone can edit)
-- ============================================
create policy "Anyone can view huddle metrics"
  on public.huddle_metrics
  for select
  using (true);

create policy "Authenticated users can insert huddle metrics"
  on public.huddle_metrics
  for insert
  with check (auth.uid() is not null);

create policy "Authenticated users can update huddle metrics"
  on public.huddle_metrics
  for update
  using (auth.uid() is not null);

create policy "Authenticated users can delete huddle metrics"
  on public.huddle_metrics
  for delete
  using (auth.uid() is not null);

-- ============================================
-- HUDDLE_ITEMS POLICIES (MVP: Everyone can edit)
-- ============================================
create policy "Anyone can view huddle items"
  on public.huddle_items
  for select
  using (true);

create policy "Authenticated users can insert huddle items"
  on public.huddle_items
  for insert
  with check (auth.uid() is not null);

create policy "Authenticated users can update huddle items"
  on public.huddle_items
  for update
  using (auth.uid() is not null);

create policy "Authenticated users can delete huddle items"
  on public.huddle_items
  for delete
  using (auth.uid() is not null);