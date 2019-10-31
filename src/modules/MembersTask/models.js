import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'kanban'
export const ENDPOINTS = {
  getMembersNotInTask: (taskId) => `${DEFAULT_URL}/task/${taskId}/user-not-in`,
  addMembersInTask: (taskId) => `${DEFAULT_URL}/task/${taskId}/user`,
  getMembersInTask: (taskId) => `${DEFAULT_URL}/task/${taskId}/user`
}

export const LIMIT = 20
