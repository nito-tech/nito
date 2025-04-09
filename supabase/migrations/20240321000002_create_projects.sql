-- Create projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    organization_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_projects_organization_id ON projects(organization_id);
CREATE INDEX idx_projects_status ON projects(status);

-- Add status check constraint
ALTER TABLE projects ADD CONSTRAINT check_project_status
    CHECK (status IN ('active', 'archived'));

-- Add RLS policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy for selecting projects
CREATE POLICY "Users can view projects they are members of"
    ON projects FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM members
            WHERE members.organization_id = projects.organization_id
            AND members.user_id = auth.uid()
        )
    );

-- Policy for inserting projects
CREATE POLICY "Users can create projects in their organizations"
    ON projects FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM members
            WHERE members.organization_id = projects.organization_id
            AND members.user_id = auth.uid()
        )
    );

-- Policy for updating projects
CREATE POLICY "Users can update projects in their organizations"
    ON projects FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM members
            WHERE members.organization_id = projects.organization_id
            AND members.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM members
            WHERE members.organization_id = projects.organization_id
            AND members.user_id = auth.uid()
        )
    );

-- Policy for deleting projects
CREATE POLICY "Users can delete projects in their organizations"
    ON projects FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM members
            WHERE members.organization_id = projects.organization_id
            AND members.user_id = auth.uid()
        )
    );
