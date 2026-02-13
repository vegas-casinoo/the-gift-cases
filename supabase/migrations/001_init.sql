create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  telegram_id bigint unique not null,
  username text,
  first_name text,
  photo_url text,
  created_at timestamptz default now()
);

create table if not exists wallets (
  user_id uuid primary key references users(id) on delete cascade,
  balance_ton numeric(18,6) not null default 0,
  created_at timestamptz default now()
);

create table if not exists cases (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_url text,
  price_ton numeric(18,6) not null default 0.39,
  is_active boolean not null default true,
  popularity int not null default 0,
  sort int not null default 0,
  created_at timestamptz default now()
);

create table if not exists case_items (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references cases(id) on delete cascade,
  title text not null,
  rarity text not null default 'common',
  weight int not null default 1,
  reward_type text not null default 'gift', -- gift|stars|ton (позже)
  reward_value text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists openings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  case_id uuid references cases(id) on delete set null,
  item_id uuid references case_items(id) on delete set null,
  spent_ton numeric(18,6) not null default 0,
  created_at timestamptz default now()
);

create table if not exists promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  reward_ton numeric(18,6) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists promo_uses (
  id uuid primary key default gen_random_uuid(),
  promo_id uuid references promo_codes(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  used_at timestamptz default now(),
  unique (promo_id, user_id)
);