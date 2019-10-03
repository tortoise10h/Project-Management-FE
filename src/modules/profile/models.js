import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'user'
export const ENDPOINTS = {
  getUserProfileInformation: (userId) => `${DEFAULT_URL}/user/${userId}`,
  setUserProfileInformation: (userId) => `${DEFAULT_URL}/user/${userId}`,
  setPasswordUserProfileInformation: `${DEFAULT_URL}/auth/change-password`,
  getProjects: `${DEFAULT_URL}/project`
}

export const LIMIT = 20
