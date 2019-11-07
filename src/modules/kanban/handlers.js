import { fetchAuthLoading, loading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import {
  setKanbanInfo,
  setUserRole,
  setProjectInfo
} from './actions'
import { async } from 'q'

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
  deleteColumn: async (columnId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.deleteColumn(columnId)}`,
        method: 'delete'
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
  getKanbanInfo: async projectId => {
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
  getUserRole: async projectId => {
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
  getProjectInfo: async projectId => {
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
  getTaskInfo: async taskId => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.getTaskInfo(taskId)}`,
        method: 'GET'
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  // ================== Handle Task =====================
  addTask: async (columnId, data) => {
    try {
      const propNames = Object.getOwnPropertyNames(data)
      for (let i = 0; i < propNames.length; i++) {
        const propName = propNames[i]
        if (
          data[propName] === null ||
          data[propName] === undefined ||
          data[propName] === ''
        ) {
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
  deleteTask: async taskId => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.deleteTask(taskId)}`,
        method: 'delete'
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
  updateTaskIndex: async tasks => {
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
  },
  getLabelListInTask: async taskId => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.getLabelListInTask(taskId)}`,
        method: 'GET'
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  // ======= Handle Member ===============
  getMembersInTask: async taskId => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.getMembersInTask(taskId)}`,
        method: 'GET'
      })
      return result
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  removeMemberInTask: async (taskId, userId, isInTask) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.removeMemberInTask(taskId)}`,
        method: 'delete',
        data: {
          user_id: userId,
          is_in_task: isInTask
        }
      })
      return result
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  // ======= Handle Todos ===============
  addTodo: async (taskId, title) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.addTodo(taskId)}`,
        method: 'POST',
        data: {
          title: title
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
  setTodo: async (taskId, data) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.setTodo(taskId)}`,
        method: 'PUT',
        data: { ...data }
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
  deleteTodo: async todoId => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.deleteTodo(todoId)}`,
        method: 'DELETE'
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
  checkTodos: async (taskId, todoIds) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.checkTodos(taskId)}`,
        method: 'POST',
        data: {
          todo_ids: todoIds
        }
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },

  // ======= Handle Log ===============
  getLogOfProject: async (projectId, page, params = {}) => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.getLogOfProject(projectId),
        method: 'GET',
        params: {
          page,
          sort: 'createdAt',
          direction: 'desc',
          offset: LIMIT,
          ...params
        }
      })
      return result.data
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  addMedia: async (taskId, data) => {
    try {
      const result = await loading(async () => {
        const fields = {
          ...data
        }

        const form = new FormData()

        if (data.media && data.media.length) {
          form.append('media', data.media[0].originFileObj)
        }

        delete fields.media

        Object.keys(fields).forEach(key => {
          fields[key] && form.append(key, fields[key])
        })

        const url = ENDPOINTS.addMedia(taskId)

        const result = await fetchAuthLoading({
          url,
          method: 'POST',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (result.data && result.data.success) {
        }
        return { success: true }
      })
      return result
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, error: { message: 'Server error' } }
    }
  },
  getListMedia: async (taskId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.getListMedia(taskId)}`,
        method: 'GET'
      })
      return result
    } catch (error) {
      return { success: false, error: { message: 'Server error' } }
    }
  },
  deleteMediaInTask: async (mediaId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.deleteMediaInTask(mediaId)}`,
        method: 'DELETE'
      })
      return result
    } catch (error) {
      return { success: false, error: { message: 'Server error' } }
    }
  }
})
