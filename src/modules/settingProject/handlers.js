import { fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS } from './models'
import {} from './actions'
import { setProjectInfo } from '../settingProject/actions'

export default (dispatch, props) => ({
  updateStartDateProject: async (projectId, startDatePoj) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.updateStartDateProject(projectId)}`,
        method: 'PUT',
        data: {
          start_date: startDatePoj
        }
      })
      return result
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, message: 'Server Error' }
    }
  },
  updateEndDateProject: async (projectId, endDatePoj) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.updateEndDateProject(projectId)}`,
        method: 'PUT',
        data: {
          end_date: endDatePoj
        }
      })
      return result
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, message: 'Server Error' }
    }
  },
  updateTitleProject: async (projectId, titleProject) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.updateProject(projectId)}`,
        method: 'PUT',
        data: {
          title: titleProject
        }
      })
      return result
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, message: 'Server Error' }
    }
  },
  updateStatusProject: async (projectId, statusProject) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.updateProject(projectId)}`,
        method: 'PUT',
        data: {
          status: statusProject
        }
      })
      return result
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, message: 'Server Error' }
    }
  },
  updateDescriptionProject: async (projectId, descriptionProject) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.updateProject(projectId)}`,
        method: 'PUT',
        data: {
          description: descriptionProject
        }
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
