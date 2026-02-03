-- ============================================
-- users
-- ============================================
create policy "Anyone can view users"
  on public.users
  for select
  using (true);

create policy "Users can update own profile"
  on public.users
  for update
  using (auth.uid() = id);

-- ============================================
-- daily_summary
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
-- huddle_updates
-- ============================================
create policy "Anyone can view huddle updates"
  on public.huddle_updates
  for select
  using (true);

create policy "Authenticated users can insert huddle updates"
  on public.huddle_updates
  for insert
  with check (auth.uid() is not null);

create policy "Authenticated users can update huddle updates"
  on public.huddle_updates
  for update
  using (auth.uid() is not null);

create policy "Authenticated users can delete huddle updates"
  on public.huddle_updates
  for delete
  using (auth.uid() is not null);