import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'kanban'
export const ENDPOINTS = {
  addLabel: (projectId) => `${DEFAULT_URL}/project/${projectId}/label`,
  getLabelList: (projectId) => `${DEFAULT_URL}/project/${projectId}/label`,
  updateLabel: (labelId) => `${DEFAULT_URL}/label/${labelId}`
}

export const LIMIT = 20
