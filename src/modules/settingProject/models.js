import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'kanban'
export const ENDPOINTS = {
  getProjectInfo: (projectId, userId) => `${DEFAULT_URL}/project/${projectId}`,
  updateProject: (projectId) => `${DEFAULT_URL}/project/${projectId}`,
  updateTitleProject: (projectId) => `${DEFAULT_URL}/project/${projectId}`,
  updateStatusProject: (projectId) => `${DEFAULT_URL}/project/${projectId}`,
  updateDescriptionProject: (projectId) => `${DEFAULT_URL}/project/${projectId}`,
  updateStartDateProject: (projectId) => `${DEFAULT_URL}/project/${projectId}`,
  updateEndDateProject: (projectId) => `${DEFAULT_URL}/project/${projectId}`
}

export const LIMIT = 20
