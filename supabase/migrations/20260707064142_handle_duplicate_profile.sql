-- Update trigger function to handle duplicate email gracefully
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, phone, company, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'company',
    'customer'
  )
  on conflict (email) do update set
    id = excluded.id,
    full_name = excluded.full_name,
    phone = excluded.phone,
    company = excluded.company;
  return new;
end;
$$;
