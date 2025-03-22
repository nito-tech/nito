-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  -- Add other profile information if needed
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

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
