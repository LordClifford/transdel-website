-- Seed hero background images (editable via admin site-content editor)
INSERT INTO site_content (page, section, key, value) VALUES
  ('home', 'hero', 'bg_image_1', 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg'),
  ('home', 'hero', 'bg_image_2', 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg'),
  ('home', 'hero', 'bg_image_3', 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg')
ON CONFLICT (page, section, key) DO NOTHING;
