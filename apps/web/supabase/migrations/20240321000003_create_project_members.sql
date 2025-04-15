-- Create project_members table
CREATE TABLE project_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    member_id UUID NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'EDITOR',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    UNIQUE(project_id, member_id)
);

-- Create indexes
CREATE INDEX idx_project_members_project_id ON project_members(project_id);
CREATE INDEX idx_project_members_member_id ON project_members(member_id);
CREATE INDEX idx_project_members_role ON project_members(role);

-- Add role check constraint
ALTER TABLE project_members ADD CONSTRAINT check_project_member_role
    CHECK (role IN ('OWNER', 'EDITOR', 'VIEWER'));

-- Add RLS policies
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;

-- Policy for selecting project members
CREATE POLICY "Users can view project members they are members of"
    ON project_members FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM projects p
            JOIN members m ON m.organization_id = p.organization_id
            WHERE p.id = project_members.project_id
            AND m.user_id = auth.uid()
        )
    );

-- Policy for inserting project members
-- DROP POLICY IF EXISTS "Users can add project members if they are project owners" ON project_members;
-- CREATE POLICY "Users can add project members if they are owners/editors or if it's the first member"
--     ON project_members FOR INSERT
--     WITH CHECK (
--         -- プロジェクトメンバーがまだいない場合は、誰でも追加できる
--         (
--             NOT EXISTS (
--                 SELECT 1 FROM project_members pm
--                 WHERE pm.project_id = project_members.project_id
--             )
--         )
--         OR
--         -- 既存のプロジェクトメンバーがいて、そのユーザーがOWNERまたはEDITORである場合
--         (
--             EXISTS (
--                 SELECT 1 FROM project_members pm
--                 JOIN projects p ON p.id = pm.project_id
--                 JOIN members m ON m.id = pm.member_id
--                 WHERE pm.project_id = project_members.project_id
--                 AND m.user_id = auth.uid()
--                 AND (pm.role = 'OWNER' OR pm.role = 'EDITOR')
--             )
--         )
--     );
DROP POLICY IF EXISTS "Users can add project members if they are project owners" ON project_members;
CREATE POLICY "Allow all authenticated users to insert project members"
    ON project_members FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy for updating project members
CREATE POLICY "Users can update project members if they are project owners"
    ON project_members FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM project_members pm
            JOIN projects p ON p.id = pm.project_id
            JOIN members m ON m.id = pm.member_id
            WHERE pm.project_id = project_members.project_id
            AND m.user_id = auth.uid()
            AND pm.role = 'OWNER'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM project_members pm
            JOIN projects p ON p.id = pm.project_id
            JOIN members m ON m.id = pm.member_id
            WHERE pm.project_id = project_members.project_id
            AND m.user_id = auth.uid()
            AND pm.role = 'OWNER'
        )
    );

-- Policy for deleting project members
CREATE POLICY "Users can delete project members if they are project owners"
    ON project_members FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM project_members pm
            JOIN projects p ON p.id = pm.project_id
            JOIN members m ON m.id = pm.member_id
            WHERE pm.project_id = project_members.project_id
            AND m.user_id = auth.uid()
            AND pm.role = 'OWNER'
        )
    );
