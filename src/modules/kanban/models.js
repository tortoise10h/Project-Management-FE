import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'todo'
export const ENDPOINTS = {
  getTasks: `${DEFAULT_URL}/task`,
  addColumn: (projectId) => `${DEFAULT_URL}/project/${projectId}/column`,
  getKanbanInfo: (projectId) => `${DEFAULT_URL}/project/${projectId}/kanban`,
  addTask: (columnId) => `${DEFAULT_URL}/column/${columnId}/task`,
  updateTask: (taskId) => `${DEFAULT_URL}/task/${taskId}`,
  updateTaskIndex: `${DEFAULT_URL}/task/updateIndex`,
  updateColumn: (columnId) => `${DEFAULT_URL}/column/${columnId}`
}

export const LIMIT = 20
