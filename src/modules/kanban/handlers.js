import { fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import {
  setTasks,
  setKanbanInfo,
  setUserRole,
  setProjectInfo
} from './actions'

export default (dispatch, props) => ({
  addColumn: async (projectId, data) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.addColumn(projectId)}`,
        method: 'POST',
        data: {
          ...data
        }
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, error: { message: 'Server error' } }
    }
  },
  updateColumn: async (columnId, data) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.updateColumn(columnId)}`,
        method: 'PUT',
        data: {
          ...data
        }
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  getKanbanInfo: async (projectId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.getKanbanInfo(projectId)}`,
        method: 'GET'
      })
      if (result) {
        dispatch(setKanbanInfo(result.data))
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  getUserRole: async (projectId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.getUserRole(projectId)}`,
        method: 'GET'
      })
      if (result) {
        dispatch(setUserRole(result.data))
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  getProjectInfo: async (projectId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.getProjectInfo(projectId)}`,
        method: 'GET'
      })
      if (result) {
        dispatch(setProjectInfo(result.data))
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  addTask: async (columnId, data) => {
    try {
      const propNames = Object.getOwnPropertyNames(data)
      for (let i = 0; i < propNames.length; i++) {
        const propName = propNames[i]
        if (data[propName] === null || data[propName] === undefined || data[propName] === '') {
          delete data[propName]
        }
      }
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.addTask(columnId)}`,
        method: 'POST',
        data: {
          ...data
        }
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  updateTask: async (taskId, data) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.updateTask(taskId)}`,
        method: 'PUT',
        data: {
          ...data
        }
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  updateTaskIndex: async (tasks) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.updateTaskIndex}`,
        method: 'PUT',
        data: {
          tasks: tasks
        }
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  }
})
