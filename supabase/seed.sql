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
  '{"username": "saneatsu", "display_name": "Saneatsu Wakana"}'
);

-- Update the profile created by the trigger
UPDATE public.profiles
SET
  display_name = 'Saneatsu Wakana',
  avatar_url = 'https://github.com/shadcn.png',
  updated_at = now()
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Insert test organizations
INSERT INTO organizations (name, slug) VALUES
  ('A', 'a'),
  ('Apple Inc', 'apple'),
  ('Microsoft Corporation', 'microsoft'),
  ('Google LLC', 'google'),
  ('Amazon Inc', 'amazon'),
  ('Meta Platforms Inc', 'meta'),
  ('Netflix Inc', 'netflix'),
  ('Tesla Inc', 'tesla'),
  ('NVIDIA Corporation', 'nvidia'),
  ('Adobe Inc', 'adobe'),
  ('Salesforce Inc', 'salesforce'),
  ('Intel Corporation', 'intel'),
  ('AMD Inc', 'amd'),
  ('Oracle Corporation', 'oracle'),
  ('IBM Corporation', 'ibm'),
  ('Cisco Systems Inc', 'cisco'),
  ('Qualcomm Inc', 'qualcomm'),
  ('Samsung Electronics', 'samsung'),
  ('Sony Group Corporation', 'sony'),
  ('Dell Technologies', 'dell'),
  ('HP Inc', 'hp');
