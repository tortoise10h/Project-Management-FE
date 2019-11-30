import { fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS } from './models'
import { setKanbanInfo } from './actions'

export default (dispatch, props) => ({
  addLabel: async (projectId, color, title) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.addLabel(projectId)}`,
        method: 'POST',
        data: {
          color: color,
          title: title
        }
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  deleteLabel: async (labelId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.deleteLabel(labelId)}`,
        method: 'DELETE'
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  getKanbanInfo: async (projectId) => {
    console.count()
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
  updateLabel: async (labelId, color, title) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.updateLabel(labelId)}`,
        method: 'PUT',
        data: {
          color: color,
          title: title
        }
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  updateLabelInTask: async (taskId, labelId, isInTask) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.updateLabelInTask(taskId)}`,
        method: 'POST',
        data: {
          label_id: labelId,
          is_in_task: isInTask
        }
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  getLabel: async (labelId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.getLabel(labelId)}`,
        method: 'GET'
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  getLabelList: async (projectId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.getLabelList(projectId)}`,
        method: 'GET'
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  getLabelListInTask: async (taskId) => {
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
  }
})
