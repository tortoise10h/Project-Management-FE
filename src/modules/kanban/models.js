import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'kanban'
export const ENDPOINTS = {
  getTasks: `${DEFAULT_URL}/task`,
  addColumn: (projectId) => `${DEFAULT_URL}/project/${projectId}/column`,
  deleteColumn: (columnId) => `${DEFAULT_URL}/column/${columnId}`,
  getKanbanInfo: (projectId) => `${DEFAULT_URL}/project/${projectId}/kanban`,
  getUserRole: (projectId) => `${DEFAULT_URL}/project/${projectId}/user-in-project`,
  getProjectInfo: (projectId) => `${DEFAULT_URL}/project/${projectId}`,
  getTaskInfo: (taskId) => `${DEFAULT_URL}/task/${taskId}`,
  getLabelListInTask: (taskId) => `${DEFAULT_URL}/task/${taskId}/label`,
  addTask: (columnId) => `${DEFAULT_URL}/column/${columnId}/task`,
  deleteTask: (taskId) => `${DEFAULT_URL}/task/${taskId}`,
  updateTask: (taskId) => `${DEFAULT_URL}/task/${taskId}`,
  addTodo: (taskId) => `${DEFAULT_URL}/task/${taskId}/todo`,
  setTodo: (taskId) => `${DEFAULT_URL}/todo/${taskId}`,
  deleteTodo: (todoId) => `${DEFAULT_URL}/todo/${todoId}`,
  checkTodos: (taskId) => `${DEFAULT_URL}/task/${taskId}/todo-status`,
  updateTaskIndex: `${DEFAULT_URL}/task/updateIndex`,
  updateColumn: (columnId) => `${DEFAULT_URL}/column/${columnId}`,
  getMembersInTask: (taskId) => `${DEFAULT_URL}/task/${taskId}/user`,
  removeMemberInTask: (taskId) => `${DEFAULT_URL}/task/${taskId}/user`
}

export const LIMIT = 20
