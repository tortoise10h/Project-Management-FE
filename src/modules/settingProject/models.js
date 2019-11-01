import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'kanban'
export const ENDPOINTS = {
  getProjectInfo: (projectId, userId) => `${DEFAULT_URL}/project/${projectId}`,
  updateProject: (projectId) => `${DEFAULT_URL}/project/${projectId}`
}

export const LIMIT = 20
