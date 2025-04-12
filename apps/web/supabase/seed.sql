-- Create test users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000001',
  'authenticated',
  'authenticated',
  'nito.tech.official@gmail.com',
  crypt('Password123!', gen_salt('bf')),
  '2025-03-22 22:22:23.105643+00',
  null,
  '',
  null,
  '',
  null,
  '',
  '',
  null,
  '2025-03-22 22:22:23.093826+00',
  '2025-03-22 22:22:58.384429+00',
  '{"username": "nito", "display_name": "Nito Tech", "avatar_url": "https://github.com/shadcn.png"}'
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000002',
  'authenticated',
  'authenticated',
  'saneatsu.wakana@gmail.com',
  crypt('Password123!', gen_salt('bf')),
  '2025-03-22 22:22:23.105643+00',
  null,
  '',
  null,
  '',
  null,
  '',
  '',
  null,
  '2025-03-22 22:22:23.093826+00',
  '2025-03-22 22:22:58.384429+00',
  '{"username": "saneatsu", "display_name": "Saneatsu Wakana", "avatar_url": "https://github.com/shadcn.png"}'
);

-- Insert test organizations
INSERT INTO organizations (name, slug, description, logo_url, domain, created_by, is_active) VALUES
  ('Nito', 'nito', 'Nito', 'https://github.com/shadcn.png', 'https://nito.tech', '00000000-0000-0000-0000-000000000001', true),
  ('Apple Inc', 'apple', 'Think Different', 'https://github.com/shadcn.png', 'apple.com', '00000000-0000-0000-0000-000000000001', true),
  ('Microsoft Corporation', 'microsoft', 'Empowering every person and every organization on the planet to achieve more', 'https://github.com/shadcn.png', 'microsoft.com', '00000000-0000-0000-0000-000000000001', true),
  ('Google LLC', 'google', 'Don''t be evil', 'https://github.com/shadcn.png', 'google.com', '00000000-0000-0000-0000-000000000001', true),
  ('Amazon Inc', 'amazon', 'Work hard, have fun, make history', 'https://github.com/shadcn.png', 'amazon.com', '00000000-0000-0000-0000-000000000001', true),
  ('Meta Platforms Inc', 'meta', 'Connect with friends and the world around you on Facebook', 'https://github.com/shadcn.png', 'meta.com', '00000000-0000-0000-0000-000000000001', true),
  ('Netflix Inc', 'netflix', 'See what''s next', 'https://github.com/shadcn.png', 'netflix.com', '00000000-0000-0000-0000-000000000001', true),
  ('Tesla Inc', 'tesla', 'Accelerate the world''s transition to sustainable energy', 'https://github.com/shadcn.png', 'tesla.com', '00000000-0000-0000-0000-000000000001', true),
  ('NVIDIA Corporation', 'nvidia', 'The pioneer of GPU-accelerated computing', 'https://github.com/shadcn.png', 'nvidia.com', '00000000-0000-0000-0000-000000000001', true),
  ('Adobe Inc', 'adobe', 'Creativity for all', 'https://github.com/shadcn.png', 'adobe.com', '00000000-0000-0000-0000-000000000001', true),
  ('Salesforce Inc', 'salesforce', 'We bring companies and customers together', 'https://github.com/shadcn.png', 'salesforce.com', '00000000-0000-0000-0000-000000000001', true),
  ('Intel Corporation', 'intel', 'Intel inside', 'https://github.com/shadcn.png', 'intel.com', '00000000-0000-0000-0000-000000000001', true),
  ('AMD Inc', 'amd', 'The future of computing', 'https://github.com/shadcn.png', 'amd.com', '00000000-0000-0000-0000-000000000001', true),
  ('Oracle Corporation', 'oracle', 'Oracle Cloud Infrastructure', 'https://github.com/shadcn.png', 'oracle.com', '00000000-0000-0000-0000-000000000001', true),
  ('IBM Corporation', 'ibm', 'Let''s put smart to work', 'https://github.com/shadcn.png', 'ibm.com', '00000000-0000-0000-0000-000000000001', true),
  ('Cisco Systems Inc', 'cisco', 'The bridge to possible', 'https://github.com/shadcn.png', 'cisco.com', '00000000-0000-0000-0000-000000000001', true),
  ('Qualcomm Inc', 'qualcomm', 'Inventing the technology the world loves', 'https://github.com/shadcn.png', 'qualcomm.com', '00000000-0000-0000-0000-000000000001', true),
  ('Samsung Electronics', 'samsung', 'Do what you can''t', 'https://github.com/shadcn.png', 'samsung.com', '00000000-0000-0000-0000-000000000001', true),
  ('Sony Group Corporation', 'sony', 'Make. Believe', 'https://github.com/shadcn.png', 'sony.com', '00000000-0000-0000-0000-000000000001', true),
  ('Dell Technologies', 'dell', 'The power to do more', 'https://github.com/shadcn.png', 'dell.com', '00000000-0000-0000-0000-000000000001', true),
  ('HP Inc', 'hp', 'Keep reinventing', 'https://github.com/shadcn.png', 'hp.com', '00000000-0000-0000-0000-000000000001', true);

-- Insert test members
INSERT INTO members (user_id, organization_id, role, joined_at, last_active_at, is_active) VALUES
  ('00000000-0000-0000-0000-000000000001', (SELECT id FROM organizations WHERE slug = 'nito'), 'OWNER', NOW(), NOW(), true),
  ('00000000-0000-0000-0000-000000000001', (SELECT id FROM organizations WHERE slug = 'apple'), 'OWNER', NOW(), NOW(), true),
  ('00000000-0000-0000-0000-000000000002', (SELECT id FROM organizations WHERE slug = 'google'), 'OWNER', NOW(), NOW(), true),
  ('00000000-0000-0000-0000-000000000002', (SELECT id FROM organizations WHERE slug = 'meta'), 'OWNER', NOW(), NOW(), true),
  ('00000000-0000-0000-0000-000000000002', (SELECT id FROM organizations WHERE slug = 'nito'), 'DEVELOPER', NOW(), NOW(), true);

-- Insert test projects
INSERT INTO projects (name, status, organization_id) VALUES
  ('nito-website', 'active', (SELECT id FROM organizations WHERE slug = 'nito')),
  ('nito-mobile-app', 'active', (SELECT id FROM organizations WHERE slug = 'nito')),
  ('nito-api', 'archived', (SELECT id FROM organizations WHERE slug = 'nito')),
  ('iphone.15', 'active', (SELECT id FROM organizations WHERE slug = 'apple')),
  ('macbook-pro', 'active', (SELECT id FROM organizations WHERE slug = 'apple')),
  ('vision-pro', 'archived', (SELECT id FROM organizations WHERE slug = 'apple')),
  ('google-search', 'active', (SELECT id FROM organizations WHERE slug = 'google')),
  ('gmail-api', 'active', (SELECT id FROM organizations WHERE slug = 'google')),
  ('google-maps', 'active', (SELECT id FROM organizations WHERE slug = 'google')),
  ('instagram-web', 'active', (SELECT id FROM organizations WHERE slug = 'meta')),
  ('whatsapp-api', 'active', (SELECT id FROM organizations WHERE slug = 'meta')),
  ('oculus-quest', 'archived', (SELECT id FROM organizations WHERE slug = 'meta'));

-- Insert test project members
INSERT INTO project_members (project_id, member_id, role) VALUES
  -- Nito projects
  ((SELECT id FROM projects WHERE name = 'nito-website'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000001' AND organization_id = (SELECT id FROM organizations WHERE slug = 'nito')), 'OWNER'),
  ((SELECT id FROM projects WHERE name = 'nito-website'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000002' AND organization_id = (SELECT id FROM organizations WHERE slug = 'nito')), 'EDITOR'),
  ((SELECT id FROM projects WHERE name = 'nito-mobile-app'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000001' AND organization_id = (SELECT id FROM organizations WHERE slug = 'nito')), 'OWNER'),
  ((SELECT id FROM projects WHERE name = 'nito-mobile-app'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000002' AND organization_id = (SELECT id FROM organizations WHERE slug = 'nito')), 'EDITOR'),
  ((SELECT id FROM projects WHERE name = 'nito-api'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000001' AND organization_id = (SELECT id FROM organizations WHERE slug = 'nito')), 'OWNER'),
  ((SELECT id FROM projects WHERE name = 'nito-api'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000002' AND organization_id = (SELECT id FROM organizations WHERE slug = 'nito')), 'VIEWER'),
  -- Apple projects
  ((SELECT id FROM projects WHERE name = 'iphone.15'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000001' AND organization_id = (SELECT id FROM organizations WHERE slug = 'apple')), 'OWNER'),
  ((SELECT id FROM projects WHERE name = 'macbook-pro'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000001' AND organization_id = (SELECT id FROM organizations WHERE slug = 'apple')), 'OWNER'),
  ((SELECT id FROM projects WHERE name = 'vision-pro'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000001' AND organization_id = (SELECT id FROM organizations WHERE slug = 'apple')), 'OWNER'),
  -- Google projects
  ((SELECT id FROM projects WHERE name = 'google-search'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000002' AND organization_id = (SELECT id FROM organizations WHERE slug = 'google')), 'OWNER'),
  ((SELECT id FROM projects WHERE name = 'gmail-api'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000002' AND organization_id = (SELECT id FROM organizations WHERE slug = 'google')), 'OWNER'),
  ((SELECT id FROM projects WHERE name = 'google-maps'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000002' AND organization_id = (SELECT id FROM organizations WHERE slug = 'google')), 'OWNER'),
  -- Meta projects
  ((SELECT id FROM projects WHERE name = 'instagram-web'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000002' AND organization_id = (SELECT id FROM organizations WHERE slug = 'meta')), 'OWNER'),
  ((SELECT id FROM projects WHERE name = 'whatsapp-api'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000002' AND organization_id = (SELECT id FROM organizations WHERE slug = 'meta')), 'OWNER'),
  ((SELECT id FROM projects WHERE name = 'oculus-quest'), (SELECT id FROM members WHERE user_id = '00000000-0000-0000-0000-000000000002' AND organization_id = (SELECT id FROM organizations WHERE slug = 'meta')), 'OWNER');
