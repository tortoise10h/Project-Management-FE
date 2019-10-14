import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'project'
export const ENDPOINTS = {
  getProjects: `${DEFAULT_URL}/project`,
  createProject: `${DEFAULT_URL}/project`,
  toggleFavorite: (userId, projectId) => `${DEFAULT_URL}/user/${userId}/project/${projectId}`
}

export const LIMIT = 20
