-- Create user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'saneatsu.wakana@gmail.com',
  crypt('testtest', gen_salt('bf')),
  now(),
  now(),
  now()
);

-- Create profile
INSERT INTO public.profiles (
  id,
  username
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'saneatsu'
);
