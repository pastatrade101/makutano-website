-- Makutano Digital Company Limited — initial schema
--
-- Content tables are readable by anyone (anon) and writable only by the service
-- role. The enquiry table accepts inserts from anon but is never readable
-- without the service role.
--
-- Bilingual fields are stored as jsonb: {"en": "...", "sw": "..."}.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- content ---

create table if not exists public.site_settings (
  id         text primary key default 'default',
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id          text primary key,
  slug        text not null unique,
  number      text not null,
  title       jsonb not null,
  description jsonb not null,
  icon        text not null,
  is_primary  boolean not null default false,
  "order"     integer not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.capabilities (
  id          text primary key,
  title       jsonb not null,
  description jsonb not null,
  icon        text not null,
  image       text not null,
  "order"     integer not null default 0
);

create table if not exists public.core_values (
  id          text primary key,
  title       jsonb not null,
  description jsonb not null,
  icon        text not null,
  "order"     integer not null default 0
);

create table if not exists public.credibility (
  id          text primary key,
  title       jsonb not null,
  description jsonb not null,
  icon        text not null,
  "order"     integer not null default 0
);

create table if not exists public.partners (
  id          text primary key,
  slug        text not null unique,
  name        text not null,
  sector      jsonb not null,
  description jsonb not null,
  tag         jsonb,
  url         text,
  logo        text not null,
  "order"     integer not null default 0
);

create table if not exists public.leadership (
  id      text primary key,
  name    text not null,
  role    jsonb not null,
  bio     jsonb not null,
  image   text not null,
  "order" integer not null default 0
);

-- ------------------------------------------------------------------ forms ---

create table if not exists public.contact_submissions (
  id         text primary key,
  name       text not null,
  email      text not null,
  phone      text,
  service    text,
  message    text not null,
  status     text not null default 'new' check (status in ('new', 'read', 'archived')),
  ip         text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);
create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

-- -------------------------------------------------------------------- RLS ---

alter table public.site_settings       enable row level security;
alter table public.services            enable row level security;
alter table public.capabilities        enable row level security;
alter table public.core_values              enable row level security;
alter table public.credibility         enable row level security;
alter table public.partners            enable row level security;
alter table public.leadership          enable row level security;
alter table public.contact_submissions enable row level security;

-- Content: anyone may read, nobody may write through the anon key.
do $$
declare t text;
begin
  foreach t in array array[
    'site_settings', 'services', 'capabilities', 'core_values',
    'credibility', 'partners', 'leadership'
  ]
  loop
    execute format('drop policy if exists %I on public.%I', t || '_public_read', t);
    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (true)',
      t || '_public_read', t
    );
  end loop;
end $$;

-- Enquiries: inserts allowed from the browser, reads never are. The API uses
-- the service role key, which bypasses RLS entirely.
drop policy if exists contact_submissions_anon_insert on public.contact_submissions;
create policy contact_submissions_anon_insert
  on public.contact_submissions for insert to anon, authenticated
  with check (true);
