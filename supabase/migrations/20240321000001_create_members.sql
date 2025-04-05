-- Update organizations table
ALTER TABLE organizations
ADD COLUMN description TEXT,
ADD COLUMN logo_url TEXT,
ADD COLUMN domain TEXT,
ADD COLUMN created_by UUID REFERENCES auth.users(id),
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;

-- Create members table
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  role TEXT NOT NULL CHECK (role IN ('OWNER', 'DEVELOPER', 'BILLING', 'VIEWER')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(user_id, organization_id)
);

-- Create index on user_id for faster lookups
CREATE INDEX members_user_id_idx ON members(user_id);

-- Create index on organization_id for faster lookups
CREATE INDEX members_organization_id_idx ON members(organization_id);

-- Add RLS policies for members
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read members
CREATE POLICY "Allow authenticated users to read members"
  ON members FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert members
CREATE POLICY "Allow authenticated users to insert members"
  ON members FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their own memberships
CREATE POLICY "Allow authenticated users to update their own memberships"
  ON members FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to delete their own memberships
CREATE POLICY "Allow authenticated users to delete their own memberships"
  ON members FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
