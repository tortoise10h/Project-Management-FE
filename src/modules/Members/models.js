import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'kanban'
export const ENDPOINTS = {
  getMembers: `${DEFAULT_URL}/user`,
  getMembersNotInProject: (projectId) => `${DEFAULT_URL}/project/${projectId}/user-not-in-project`,
  addMembers: (projectId) => `${DEFAULT_URL}/project/${projectId}/user-project`,
  getProjectInfo: (projectId, userId) => `${DEFAULT_URL}/project/${projectId}`,
  getListMemberProject: (projectId) => `${DEFAULT_URL}/project/${projectId}/user-project`,
  removeMemberProject: (projectId) => `${DEFAULT_URL}/project/${projectId}/user-project`,
  updateRoleMemberProject: (projectId, userId) => `${DEFAULT_URL}/project/${projectId}/user-project/${userId}`,
  searchMemberNotInProject: (projectId) => `${DEFAULT_URL}/project/${projectId}/user-not-in-project`
}

export const LIMIT = 20
