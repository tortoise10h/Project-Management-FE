import { fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS } from './models'
import {} from './actions'
import { setUserInformation } from '../user/actions'

export default (dispatch, props) => ({
  getUserProfileInformation: async (userId) => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.getUserProfileInformation(userId),
        method: 'GET'
      })
      if (result) {
        dispatch(setUserInformation(result.data))
        return result.data
      }
    } catch (error) {
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
  setPasswordUserProfileInformation: async (oldPassword, newPassword, confirmPassword, email, token) => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.setPasswordUserProfileInformation,
        method: 'POST',
        data: {
          oldPassword,
          newPassword,
          confirmPassword,
          email,
          token
        }
      })
      return result
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, error: { message: 'Server error' } }
    }
  },
  getProjects: async () => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.getProjects,
        method: 'GET'
      })
      return result
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  }
})
