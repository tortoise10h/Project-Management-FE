import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'kanban'
export const ENDPOINTS = {
  addLabel: (projectId) => `${DEFAULT_URL}/project/${projectId}/label`,
  getLabelList: (projectId) => `${DEFAULT_URL}/project/${projectId}/label`,
  getLabelListInTask: (taskId) => `${DEFAULT_URL}/task/${taskId}/label`,
  updateLabelInTask: (taskId) => `${DEFAULT_URL}/task/${taskId}/label`,
  updateLabel: (labelId) => `${DEFAULT_URL}/label/${labelId}`,
  getLabel: (labelId) => `${DEFAULT_URL}/label/${labelId}`
}

export const LIMIT = 20
