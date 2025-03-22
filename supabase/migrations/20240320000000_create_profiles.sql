-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username VARCHAR(50) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  -- Add other profile information if needed
  CONSTRAINT username_length CHECK (char_length(username) >= 1),
  CONSTRAINT username_no_newlines CHECK (username !~ '[\n\r]')
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
