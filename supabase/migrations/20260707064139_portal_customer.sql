-- Add customer role and phone/company columns
alter table profiles drop constraint if exists profiles_role_check;
alter table profiles add constraint profiles_role_check
  check (role in ('admin', 'editor', 'customer'));
alter table profiles add column if not exists phone text;
alter table profiles add column if not exists company text;

-- Invoices
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references profiles(id) on delete cascade,
  number text unique not null,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  status text not null default 'draft'
    check (status in ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  issued_date date not null default current_date,
  due_date date not null,
  paid_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Payments
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  amount numeric(10,2) not null,
  method text not null check (method in ('cash', 'mobile_money', 'bank_transfer', 'card', 'other')),
  reference text,
  status text not null default 'completed' check (status in ('pending', 'completed', 'failed', 'refunded')),
  paid_at timestamptz not null default now(),
  notes text,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table invoices enable row level security;
alter table payments enable row level security;

-- Admin full access on invoices
create policy "Admin full access on invoices"
  on invoices for all using (auth.role() = 'authenticated');

-- Customers can read their own invoices
create policy "Customers read own invoices"
  on invoices for select
  using (
    auth.uid() = customer_id
  );

-- Admin full access on payments
create policy "Admin full access on payments"
  on payments for all using (auth.role() = 'authenticated');

-- Customers can read payments on their invoices
create policy "Customers read own payments"
  on payments for select
  using (
    exists (
      select 1 from invoices
      where invoices.id = payments.invoice_id
      and invoices.customer_id = auth.uid()
    )
  );

-- Profiles: customers can read/update their own
create policy "Customers read own profile"
  on profiles for select
  using (
    auth.uid() = id
  );

create policy "Customers update own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and (
      -- customers can't change their role
      role = 'customer'
    )
  );

-- Auto-generate invoice number
create or replace function generate_invoice_number()
returns text
language plpgsql
as $$
declare
  year text := to_char(now(), 'YYYY');
  seq int;
begin
  select coalesce(max(cast(split_part(number, '-', 2) as integer)), 0) + 1
    into seq
    from invoices
    where number like year || '-%';
  return year || '-' || lpad(seq::text, 4, '0');
end;
$$;
