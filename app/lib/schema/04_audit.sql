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
-- Audit Table
-- ============================================
create table if not exists public.audit (
  id uuid not null default gen_random_uuid() primary key,
  user_id text references users(id),
  department text,
  table_name text not null,
  record_id uuid not null,
  operation text not null check (operation in ('INSERT', 'UPDATE', 'DELETE')),
  category text,
  change_summary text,
  old_data jsonb,
  new_data jsonb,
  created_at timestamp with time zone default now()
);


-- ============================================
-- Audit Index
-- ============================================
create index if not exists idx_audit_department_date 
  on public.audit (department, created_at desc);



-- ============================================
-- Audit Trigger Function
-- ============================================
CREATE OR REPLACE FUNCTION log_audit_change()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
    dept TEXT;
    acting_user TEXT;
BEGIN
    dept := TG_TABLE_NAME;

    IF TG_OP = 'DELETE' THEN
        acting_user := OLD.updated_by;
    ELSE
        acting_user := COALESCE(NEW.updated_by, NEW.created_by);
    END IF;

    INSERT INTO audit (department, table_name, record_id, operation, user_id, old_data, new_data)
    VALUES (
        dept,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        TG_OP,
        acting_user,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
    );

    RETURN COALESCE(NEW, OLD);
END;
$$;

-- ============================================
-- Audit Table Call
-- ============================================
CREATE TRIGGER trigger_audit_iv_room
AFTER INSERT OR UPDATE OR DELETE ON iv_room
FOR EACH ROW EXECUTE FUNCTION log_audit_change();

CREATE TRIGGER trigger_audit_distribution
AFTER INSERT OR UPDATE OR DELETE ON distribution
FOR EACH ROW EXECUTE FUNCTION log_audit_change();

CREATE TRIGGER trigger_audit_command_center
AFTER INSERT OR UPDATE OR DELETE ON command_center
FOR EACH ROW EXECUTE FUNCTION log_audit_change();

CREATE TRIGGER trigger_audit_or_pharmacy
AFTER INSERT OR UPDATE OR DELETE ON or_pharmacy
FOR EACH ROW EXECUTE FUNCTION log_audit_change();

CREATE TRIGGER trigger_audit_team_eight
AFTER INSERT OR UPDATE OR DELETE ON team_eight
FOR EACH ROW EXECUTE FUNCTION log_audit_change();