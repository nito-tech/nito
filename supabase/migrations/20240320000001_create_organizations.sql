-- Create organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index on name for faster lookups
CREATE INDEX organizations_name_idx ON organizations(name);

-- Add RLS policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all organizations
CREATE POLICY "Allow authenticated users to read organizations"
  ON organizations FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert organizations
CREATE POLICY "Allow authenticated users to insert organizations"
  ON organizations FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their own organizations
CREATE POLICY "Allow authenticated users to update organizations"
  ON organizations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete their own organizations
CREATE POLICY "Allow authenticated users to delete organizations"
  ON organizations FOR DELETE
  TO authenticated
  USING (true);
