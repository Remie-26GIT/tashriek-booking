-- ============================================================
-- Entertainer Booking CRM — Supabase schema
-- Run this once in your Supabase project's SQL editor.
-- Safe to re-run: guarded with IF NOT EXISTS / OR REPLACE.
-- ============================================================

create extension if not exists "pgcrypto";

-- Booking status as an enum keeps the workflow explicit and
-- prevents invalid statuses from ever being written.
do $$
begin
  if not exists (select 1 from pg_type where typname = 'booking_status') then
    create type booking_status as enum ('pending', 'accepted', 'declined');
  end if;
end
$$;

create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  client_name     text not null,
  phone_number    text not null,
  email           text,

  event_type      text not null,
  event_date      date not null,
  event_time      time not null,
  venue           text not null,
  notes           text,

  status          booking_status not null default 'pending',
  whatsapp_sent_at timestamptz
);

create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_event_date_idx on public.bookings (event_date);

-- Keep updated_at current on every change.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
-- Public (anon) visitors may only INSERT a new booking request.
-- Only authenticated users (the entertainer's admin login) may
-- read, update or delete bookings — this is what powers the
-- dashboard.
-- ------------------------------------------------------------
alter table public.bookings enable row level security;

drop policy if exists "Public can submit a booking" on public.bookings;
create policy "Public can submit a booking"
  on public.bookings
  for insert
  to anon
  with check (status = 'pending');

drop policy if exists "Admins can view all bookings" on public.bookings;
create policy "Admins can view all bookings"
  on public.bookings
  for select
  to authenticated
  using (true);

drop policy if exists "Admins can update bookings" on public.bookings;
create policy "Admins can update bookings"
  on public.bookings
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can delete bookings" on public.bookings;
create policy "Admins can delete bookings"
  on public.bookings
  for delete
  to authenticated
  using (true);

-- ------------------------------------------------------------
-- After running this file, create your admin login under
-- Supabase Dashboard -> Authentication -> Users -> Add user.
-- That email + password is what signs in at /admin/login.
-- ------------------------------------------------------------
