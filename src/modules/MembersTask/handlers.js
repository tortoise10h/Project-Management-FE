import { fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS } from './models'
import {} from './actions'

export default (dispatch, props) => ({
  getMembersNotInTask: async (taskId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.getMembersNotInTask(taskId)}`,
        method: 'GET'
      })
      return result
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  addMembersInTask: async (taskId, userIds) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.addMembersInTask(taskId)}`,
        method: 'POST',
        data: {
          user_ids: userIds
        }
      })
      if (result) {
        return result.data
      }
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
    }
  }
})
