-- Fix RLS policies: replace `auth.role() = 'authenticated'` with proper admin role check
-- Previously ANY authenticated user (including portal customers) had full CRUD on all tables.

-- 1. Helper function (bypasses RLS via security definer to avoid recursion with profiles table)
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid()
    and role in ('admin', 'super_admin')
  );
$$;

-- 2. schema.sql policies (base admin tables)
drop policy if exists "Admins full access on profiles" on profiles;
drop policy if exists "Admins full access on inquiries" on inquiries;
drop policy if exists "Admins full access on quotations" on quotations;
drop policy if exists "Admins full access on projects" on projects;
drop policy if exists "Admins full access on testimonials" on testimonials;
drop policy if exists "Admins full access on services" on services;

create policy "Admins full access on profiles"
  on profiles for all using (is_admin() or auth.uid() = id);

create policy "Admins full access on inquiries"
  on inquiries for all using (is_admin());

create policy "Admins full access on quotations"
  on quotations for all using (is_admin());

create policy "Admins full access on projects"
  on projects for all using (is_admin());

create policy "Admins full access on testimonials"
  on testimonials for all using (is_admin());

create policy "Admins full access on services"
  on services for all using (is_admin());

-- 3. portal/migration policies (invoices, payments)
drop policy if exists "Admin full access on invoices" on invoices;
drop policy if exists "Admin full access on payments" on payments;

create policy "Admin full access on invoices"
  on invoices for all using (is_admin());

create policy "Admin full access on payments"
  on payments for all using (is_admin());

-- 4. super_admin migration policies (site_content)
drop policy if exists "Authenticated can read site_content" on site_content;
drop policy if exists "Authenticated can insert site_content" on site_content;
drop policy if exists "Authenticated can update site_content" on site_content;
drop policy if exists "Authenticated can delete site_content" on site_content;

create policy "Admins can insert site_content"
  on site_content for insert with check (is_admin());

create policy "Admins can update site_content"
  on site_content for update using (is_admin()) with check (is_admin());

create policy "Admins can delete site_content"
  on site_content for delete using (is_admin());

-- 5. Storage policies (site-images bucket)
drop policy if exists "Authenticated insert site-images" on storage.objects;
drop policy if exists "Authenticated update site-images" on storage.objects;
drop policy if exists "Authenticated delete site-images" on storage.objects;

create policy "Admins insert site-images"
  on storage.objects for insert with check (bucket_id = 'site-images' and is_admin());

create policy "Admins update site-images"
  on storage.objects for update using (bucket_id = 'site-images' and is_admin());

create policy "Admins delete site-images"
  on storage.objects for delete using (bucket_id = 'site-images' and is_admin());
