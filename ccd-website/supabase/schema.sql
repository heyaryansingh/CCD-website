-- CCD website — form intake schema.
-- Run this once in the CCD Supabase project (SQL editor), then set
-- SUPABASE_URL + SUPABASE_SERVICE_KEY in the site's server environment.
-- Forms start persisting immediately, with no code change.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first text,
  last text,
  email text,
  topic text,
  message text,
  source text
);

create table if not exists public.estimate_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  phone text,
  address text,
  service text,
  details text,
  source text
);

create table if not exists public.volunteer_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text,
  skills text,
  availability text,
  source text
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text unique,
  source text
);

-- Optional: member accounts (Wix Members is the real home; this is here so a
-- Next.js deployment can also store members if desired).
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text unique,
  tier text,
  status text default 'pending'
);

-- Row Level Security: the site writes with the service key (server-side only),
-- which bypasses RLS. Enable RLS so the anon/public key can never read PII.
alter table public.contact_submissions enable row level security;
alter table public.estimate_requests enable row level security;
alter table public.volunteer_signups enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.members enable row level security;
-- No public policies are created on purpose: only the server (service key) writes/reads.
