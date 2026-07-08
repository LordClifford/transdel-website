-- Add super_admin to the profiles role constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('admin', 'editor', 'customer', 'super_admin'));

-- Make the main user a super admin
UPDATE profiles SET role = 'super_admin' WHERE email = 'cliffordayerh@gmail.com';

-- Add image and benefits columns to services
ALTER TABLE services ADD COLUMN IF NOT EXISTS image text;
ALTER TABLE services ADD COLUMN IF NOT EXISTS benefits text[] DEFAULT '{}';

-- Create site_content table
CREATE TABLE IF NOT EXISTS site_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page text NOT NULL,
  section text NOT NULL,
  key text NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page, section, key)
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Public can read site_content" ON site_content FOR SELECT TO anon USING (true);
CREATE POLICY "Authenticated can read site_content" ON site_content FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert site_content" ON site_content FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update site_content" ON site_content FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete site_content" ON site_content FOR DELETE TO authenticated USING (true);

-- Seed default site content
INSERT INTO site_content (page, section, key, value) VALUES
  ('home', 'hero', 'title', 'Enterprise-Grade Security & IT Solutions'),
  ('home', 'hero', 'subtitle', 'Professional CCTV installation, access control, network infrastructure, and IT support services across Accra and all regions of Ghana.'),
  ('home', 'hero', 'cta_text', 'Get a Free Consultation'),
  ('home', 'about_preview', 'title', 'Trusted Technology Partner'),
  ('home', 'about_preview', 'body', 'Transdel Set-Up Services delivers enterprise-grade security systems, IT infrastructure, and technology solutions across Ghana. With hundreds of successful projects completed, we are the trusted partner for businesses and institutions seeking reliable, professional service.'),
  ('home', 'about_preview', 'cta_text', 'Learn More About Us'),
  ('home', 'cta', 'title', 'Ready to Get Started?'),
  ('home', 'cta', 'subtitle', 'Contact us today for a free consultation and quote.'),
  ('home', 'cta', 'button_text', 'Contact Us Now'),
  ('about', 'hero', 'title', 'About Transdel Set-Up Services'),
  ('about', 'hero', 'subtitle', 'Your trusted partner for security systems and IT infrastructure in Ghana.'),
  ('about', 'intro', 'paragraph_1', 'Transdel Set-Up Services was founded to bridge the gap between growing demand for reliable technology infrastructure and the need for professional, accountable service delivery in Ghana.'),
  ('about', 'intro', 'paragraph_2', 'Over the years, we have completed hundreds of projects across Accra and all regions of Ghana — from CCTV installations for small businesses to complete network infrastructure for large institutions.'),
  ('about', 'intro', 'paragraph_3', 'Whether you are securing your premises, setting up a new office, or upgrading your IT infrastructure, we deliver results that work.'),
  ('about', 'values', 'title', 'Our Values'),
  ('about', 'values', 'items', '[{"title":"Reliability","description":"We show up on time, deliver on promises, and stand behind every installation."},{"title":"Quality","description":"We use only proven equipment and follow industry best practices."},{"title":"Transparency","description":"Clear pricing, honest timelines, and open communication."},{"title":"Support","description":"Ongoing maintenance, fast support, and genuine care for every client."}]'),
  ('about', 'why_us', 'title', 'Why Choose Us?'),
  ('about', 'why_us', 'items', '[{"title":"Local Expertise","desc":"Deep understanding of the Ghanaian market and regulatory requirements."},{"title":"End-to-End Service","desc":"From consultation and design to installation, training, and ongoing support — we handle it all."},{"title":"Proven Track Record","desc":"Hundreds of successful projects across multiple sectors including education, healthcare, retail, and government."},{"title":"Fast Response","desc":"We respond to inquiries within 24 hours and prioritize urgent support requests from existing clients."}]')
ON CONFLICT (page, section, key) DO NOTHING;
