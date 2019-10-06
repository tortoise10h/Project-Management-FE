import { fetchAuthLoading, fetch } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import {
  setUserToken,
  setUserTokenExp,
  setUserInformation
} from './actions'

export default (dispatch, props) => ({
  getProjects: async (page = 1, offset, params) => {
    try {
      console.log('Run getProjects')
      const result = await fetchAuthLoading({
        url: ENDPOINTS.getProjects,
        method: 'GET',
        params: {
          ...params,
          page,
          offset
        }
      })
      console.log('======== Bao Minh debug :>: result', result)
      return result
    } catch (error) {
      console.log('======== Bao Minh debug :>: error', error)
      return { success: false, message: 'Server Error' }
    }
  },
  createProject: async (newProject) => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.createProject,
        method: 'POST',
        data: newProject
      })
      return result.data
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  }
})
