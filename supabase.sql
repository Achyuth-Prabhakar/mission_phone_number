-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
create table public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('number', 'date')),
  phone text check (char_length(phone) <= 30),
  place text check (char_length(place) <= 40),
  activity text check (char_length(activity) <= 200),
  day text check (char_length(day) <= 20)
);

alter table public.events enable row level security;

-- The public site (anon key) may add rows but has no policy to read, change or delete them.
create policy "site can add events" on public.events for insert to anon with check (true);
