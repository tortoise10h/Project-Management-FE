import { fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS } from './models'
import {} from './actions'

export default (dispatch, props) => ({
  memberOutProject: async (userId, projectId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.memberOutProject(projectId)}`,
        method: 'PUT',
        data: {
          user_id: userId,
          project_id: projectId
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
  },
  deleteProject: async (userId, projectId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.deleteProject(projectId)}`,
        method: 'DELETE',
        data: {
          user_id: userId,
          project_id: projectId
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
