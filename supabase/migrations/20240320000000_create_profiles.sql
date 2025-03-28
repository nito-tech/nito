-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
	id UUID PRIMARY KEY REFERENCES auth.users(id),
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(100),
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  -- Add constraints
  CONSTRAINT username_length CHECK (char_length(username) >= 1),
  CONSTRAINT username_no_newlines CHECK (username !~ '[\n\r]'),
  CONSTRAINT display_name_length CHECK (char_length(display_name) >= 1),
  CONSTRAINT display_name_no_newlines CHECK (display_name !~ '[\n\r]'),
  CONSTRAINT avatar_url_format CHECK (
    avatar_url IS NULL OR
    avatar_url ~ '^https?://[a-zA-Z0-9][a-zA-Z0-9\-\._\~:/\?#@!$&''()*+,;=]*$'
  )
);

-- Add comments
COMMENT ON COLUMN public.profiles.display_name IS 'User''s display name (e.g. Saneatsu Wakana)';
COMMENT ON COLUMN public.profiles.avatar_url IS 'URL to user''s avatar image';

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view profiles
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT USING (true);

-- Allow users to update only their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Allow users to delete only their own profile
CREATE POLICY "Users can delete their own profile"
ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create function to automatically update updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to execute the function before update
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'username', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create a profile when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
