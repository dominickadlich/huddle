-- ============================================
-- TABLE 10: overnight
-- ============================================
create table public.overnight (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null check (shift in ('morning', 'afternoon', 'evening')),

  -- Core metrics (top grid)
  project_shifts text,
  ivrm_support text,

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


-- Overnight Search
CREATE OR REPLACE FUNCTION overnight_search(search_term TEXT)
RETURNS TABLE (department TEXT, date DATE, summary TEXT, field_label TEXT)
LANGUAGE sql
AS $$

SELECT 'Overnight', date, project_shifts, 'Project Shifts'
FROM overnight WHERE project_shifts ILIKE '%' || search_term || '%'

UNION ALL
SELECT 'Overnight', date, ivrm_support, 'IVRM Support'
FROM overnight WHERE ivrm_support ILIKE '%' || search_term || '%'

UNION ALL
SELECT 'Overnight', date, safety, 'Safety'
FROM overnight WHERE safety ILIKE '%' || search_term || '%'

UNION ALL
SELECT 'Overnight', date, barriers, 'Barriers'
FROM overnight WHERE barriers ILIKE '%' || search_term || '%'

UNION ALL
SELECT 'Overnight', date, wins, 'Team Wins'
FROM overnight WHERE wins ILIKE '%' || search_term || '%'

UNION ALL
SELECT 'Overnight', date, announcements, 'Announcements'
FROM overnight WHERE announcements ILIKE '%' || search_term || '%'

UNION ALL
SELECT 'Overnight', date, opportunities, 'Opportunities'
FROM overnight WHERE opportunities ILIKE '%' || search_term || '%'

UNION ALL
SELECT 'Overnight', date, inventory, 'Inventory'
FROM overnight WHERE inventory ILIKE '%' || search_term || '%'

ORDER BY date DESC
$$;