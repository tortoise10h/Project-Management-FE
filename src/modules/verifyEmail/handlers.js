import { fetchAuthLoading, fetch } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import {
  setUserToken,
  setUserTokenExp,
  setUserInformation
} from './actions'

export default (dispatch, props) => ({
  verifyEmail: async (token, email) => {
    try {
      const result = await fetch({
        url: ENDPOINTS.verifyEmail,
        method: 'POST',
        data: { token, email }
      })
      return result
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  }
})
