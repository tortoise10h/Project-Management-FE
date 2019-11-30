import { fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS } from './models'
import {} from './actions'
import { setProjectInfo } from '../settingProject/actions'

export default (dispatch, props) => ({
  updateProject: async (projectId, editProject) => {
    const project = editProject
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.updateProject(projectId)}`,
        method: 'PUT',
        data: project
      })
      return result
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, message: 'Server Error' }
    }
  },
  setUserProfileInformation: async (userId, user) => {
    try {
      await fetchAuthLoading({
        url: ENDPOINTS.setUserProfileInformation(userId),
        method: 'PUT',
        data: user
      })
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, error: { message: 'Server error' } }
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
  }
})
