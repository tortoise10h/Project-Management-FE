import { fetchAuthLoading, fetch } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import {} from './actions'
import { setProjectInfo, setUserRole } from '../Members/actions'

export default (dispatch, props) => ({
  getMembers: async () => {
    try {
      console.log('Run getMembers')
      const result = await fetchAuthLoading({
        url: ENDPOINTS.getMembers,
        method: 'GET'
      })
      console.log('======== Tu Linh debug :>: result', result)
      return result
    } catch (error) {
      console.log('======== Tu Linh debug :>: error', error)
      return { success: false, message: 'Server Error' }
    }
  },
  getMembersNotInProject: async (projectId) => {
    try {
      console.log('Run getMembers')
      const result = await fetchAuthLoading({
        url: ENDPOINTS.getMembersNotInProject(projectId),
        method: 'GET'
      })
      console.log('======== Tu Linh debug :>: result', result)
      return result
    } catch (error) {
      console.log('======== Tu Linh debug :>: error', error)
      return { success: false, message: 'Server Error' }
    }
  },
  addMembers: async (projectId, userIds, inviationMessage) => {
    try {
      console.log('Run addMembers')
      const result = await fetchAuthLoading({
        url: ENDPOINTS.addMembers(projectId),
        method: 'POST',
        data: {
          user_ids: userIds,
          inviation_message: inviationMessage
        }
      })
      return result
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      // return { success: false, error: { message: 'Server error' } }
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
  getListMemberProject: async (projectId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.getListMemberProject(projectId)}`,
        method: 'GET'
      })
      return result
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  removeMemberProject: async (projectId, userId) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.removeMemberProject(projectId)}`,
        method: 'delete',
        data: {
          user_id: userId
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
  updateRoleMemberProject: async (projectId, userId, roleMember) => {
    try {
      const result = await fetchAuthLoading({
        url: `${ENDPOINTS.updateRoleMemberProject(projectId, userId)}`,
        method: 'put',
        data: {
          role: roleMember
        }
      })
      return result
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, message: 'Server Error' }
    }
  }
})
