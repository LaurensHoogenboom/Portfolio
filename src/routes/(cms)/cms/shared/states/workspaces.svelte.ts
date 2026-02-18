import type { Workspace } from "$lib/server/db/schema/workspaces";

interface ICurrentWorkspaceState { workspace: Workspace | undefined }

const currentWorkspace: ICurrentWorkspaceState = $state({ workspace: undefined });

export { currentWorkspace };