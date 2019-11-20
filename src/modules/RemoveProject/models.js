import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'kanban'
export const ENDPOINTS = {
  deleteProject: (projectId) => `${DEFAULT_URL}/project/${projectId}`,
  memberOutProject: (projectId) => `${DEFAULT_URL}/project/${projectId}/user-in-project`
}

export const LIMIT = 20
