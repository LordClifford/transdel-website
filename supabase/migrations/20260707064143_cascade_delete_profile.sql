-- Cascade delete profiles when auth user is deleted
create or replace function public.handle_delete_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  delete from public.profiles where id = old.id;
  return old;
end;
$$;

create trigger on_auth_user_deleted
  before delete on auth.users
  for each row
  execute function public.handle_delete_user();
