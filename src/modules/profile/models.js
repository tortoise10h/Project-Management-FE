import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'kanban'
export const ENDPOINTS = {
  getUserProfileInformation: (userId) => `${DEFAULT_URL}/user/${userId}`,
  setUserProfileInformation: (userId) => `${DEFAULT_URL}/user/${userId}`,
  setPasswordUserProfileInformation: `${DEFAULT_URL}/auth/change-password`,
  getProjects: `${DEFAULT_URL}/project`,
  changeAvatar: (userId) => `${DEFAULT_URL}/user/${userId}`,
  getProjectInfo: (projectId, userId) => `${DEFAULT_URL}/project/${projectId}`,
}

export const LIMIT = 20
