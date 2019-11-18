import { fetchAuthLoading, fetch, loading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import {
  setProjectInfo
} from './actions'
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
  },
  // Change Avatar //
  changeAvatar: async (userId, data) => {
    try {
      const result = await loading(async () => {
        const fields = {
          ...data
        }

        const form = new FormData()

        if (data.avatar && data.avatar.length) {
          form.append('avatar', data.avatar[0].originFileObj)
        }

        delete fields.avatar

        Object.keys(fields).forEach(key => {
          fields[key] && form.append(key, fields[key])
        })

        const url = ENDPOINTS.changeAvatar(userId)

        const result = await fetchAuthLoading({
          url,
          method: 'PUT',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (result.data && result.data.success) {
        }
        return result.data
      })
      console.log('=========> TuLinh Debug: >: result', result)
      return result
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
        console.log('=========> TuLinh Debug: >: dispatch', dispatch)
        return result.data
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  }
})
