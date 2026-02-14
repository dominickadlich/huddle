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
  to public
    using (
      ((auth.uid())::text = id)
  );

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
  with check (
    (created_by IN ( SELECT users.id   FROM users))
  );

create policy "Authenticated users can update daily summaries"
  on public.daily_summary
  for update
  using (
    created_by IN (SELECT users.id FROM users)
  )
  with check (
    updated_by IN (SELECT users.id FROM users)
  );

create policy "Authenticated users can delete daily summaries"
  on public.daily_summary
  for delete
  using (
    (created_by IN ( SELECT users.id   FROM users))
  );

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
  with check (
    (created_by IN ( SELECT users.id   FROM users))
  );

create policy "Authenticated users can update huddle updates"
  on public.huddle_updates
  for update
  using (
    created_by IN (SELECT users.id FROM users)
  )
  with check (
    updated_by IN (SELECT users.id FROM users)
  );

create policy "Authenticated users can delete huddle updates"
  on public.huddle_updates
  for delete
  using (
    (created_by IN ( SELECT users.id   FROM users))
  );


-- ============================================
-- iv_room
-- ============================================
create policy "Anyone can view iv room"
  on public.iv_room
  for select using (true);

create policy "Authenticated users can insert iv room"
  on public.iv_room
  for insert
  with check (created_by IN (SELECT id FROM public.users));

create policy "Authenticated users can update iv room"
  on public.iv_room
  for update
  using (
    created_by IN (SELECT id FROM public.users)
  )
  with check (
    updated_by IN (SELECT id FROM public.users)
  );

create policy "Authenticated users can delete iv room"
  on public.iv_room
  for delete
  using (created_by IN (SELECT id FROM public.users));



-- ============================================
-- command_center
-- ============================================
create policy "Anyone can view command center"
  on public.command_center
  for select using (true);

create policy "Authenticated users can insert command center"
  on public.command_center
  for insert
  with check (created_by IN (SELECT id FROM public.users));

create policy "Authenticated users can update command center"
  on public.command_center
  for update
  using (
    created_by IN (SELECT id FROM public.users)
  )
  with check (
    updated_by IN (SELECT id FROM public.users)
  );

create policy "Authenticated users can delete command center"
  on public.command_center
  for delete
  using (created_by IN (SELECT id FROM public.users));



-- ============================================
-- distribution
-- ============================================
create policy "Anyone can view distribution"
  on public.distribution
  for select using (true);

create policy "Authenticated users can insert distribution"
  on public.distribution
  for insert
  with check (created_by IN (SELECT id FROM public.users));

create policy "Authenticated users can update distribution"
  on public.distribution
  for update
  using (
    created_by IN (SELECT id FROM public.users)
  )
  with check (
    updated_by IN (SELECT id FROM public.users)
  );

create policy "Authenticated users can delete distribution"
  on public.distribution
  for delete
  using (created_by IN (SELECT id FROM public.users));

-- ============================================
-- non_sterile
-- ============================================
create policy "Anyone can view non sterile"
  on public.non_sterile
  for select using (true);

create policy "Authenticated users can insert non sterile"
  on public.non_sterile
  for insert
  with check (created_by IN (SELECT id FROM public.users));

create policy "Authenticated users can update non sterile"
  on public.non_sterile
  for update
  using (
    created_by IN (SELECT id FROM public.users)
  )
  with check (
    updated_by IN (SELECT id FROM public.users)
  );

create policy "Authenticated users can delete non sterile"
  on public.non_sterile
  for delete
  using (created_by IN (SELECT id FROM public.users));