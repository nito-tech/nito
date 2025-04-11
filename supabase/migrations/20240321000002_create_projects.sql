-- Create projects table
CREATE TYPE project_status AS ENUM ('active', 'archived', 'draft');

CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status project_status NOT NULL DEFAULT 'draft',
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT project_name_check CHECK (
        -- Allow only lowercase letters, numbers, and symbols (., _, -)
        name ~ '^[a-z0-9._-]+$'
        -- Maximum length of 100 characters
        AND length(name) <= 100
        -- No spaces allowed (both half-width and full-width)
        AND name !~ '[\s　]'
    ),
    -- Project names must be unique within an organization
    UNIQUE (organization_id, name)
);

-- Create indexes
CREATE INDEX idx_projects_organization_id ON projects(organization_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX projects_name_idx ON projects(name);
CREATE INDEX projects_is_active_idx ON projects(is_active);

-- Add status check constraint
ALTER TABLE projects ADD CONSTRAINT check_project_status
    CHECK (status IN ('active', 'archived'));

-- Add RLS policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy for selecting projects
CREATE POLICY "Members can view projects"
    ON projects FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM members
            WHERE members.organization_id = projects.organization_id
            AND members.user_id = auth.uid()
            AND members.is_active = true
        )
    );

-- Policy for inserting projects
CREATE POLICY "Owners and developers can create projects"
    ON projects FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM members
            WHERE members.organization_id = projects.organization_id
            AND members.user_id = auth.uid()
            AND members.role IN ('OWNER', 'DEVELOPER')
            AND members.is_active = true
        )
    );

-- Policy for updating projects
CREATE POLICY "Owners and developers can update projects"
    ON projects FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM members
            WHERE members.organization_id = projects.organization_id
            AND members.user_id = auth.uid()
            AND members.role IN ('OWNER', 'DEVELOPER')
            AND members.is_active = true
        )
    );

-- Policy for deleting projects (soft delete)
CREATE POLICY "Only owners can delete projects"
    ON projects FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM members
            WHERE members.organization_id = projects.organization_id
            AND members.user_id = auth.uid()
            AND members.role = 'OWNER'
            AND members.is_active = true
        )
    )
    WITH CHECK (NOT is_active);
