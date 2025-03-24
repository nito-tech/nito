-- Add display_name and avatar_url columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN display_name VARCHAR(100),
ADD COLUMN avatar_url TEXT;

-- Set default values for existing records
UPDATE public.profiles
SET display_name = username
WHERE display_name IS NULL;

-- Make display_name NOT NULL after setting default values
ALTER TABLE public.profiles
ALTER COLUMN display_name SET NOT NULL;

-- Add constraints for display_name
ALTER TABLE public.profiles
ADD CONSTRAINT display_name_length CHECK (char_length(display_name) >= 1),
ADD CONSTRAINT display_name_no_newlines CHECK (display_name !~ '[\n\r]');

-- Add URL format constraint for avatar_url
-- This constraint ensures that avatar_url is either NULL or a valid HTTP(S) URL
-- The URL pattern requires:
-- 1. Starts with http:// or https://
-- 2. Contains a valid domain name
-- 3. May have an optional path and query parameters
ALTER TABLE public.profiles
ADD CONSTRAINT avatar_url_format CHECK (
  avatar_url IS NULL OR
  avatar_url ~ '^https?://[a-zA-Z0-9][a-zA-Z0-9\-\._\~:/\?#@!$&''()*+,;=]*$'
);

-- Add comment for display_name and avatar_url
COMMENT ON COLUMN public.profiles.display_name IS 'User''s display name (e.g. Saneatsu Wakana)';
COMMENT ON COLUMN public.profiles.avatar_url IS 'URL to user''s avatar image';
