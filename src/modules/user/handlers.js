import { fetchAuthLoading, fetch } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import {
  setUserToken,
  setUserTokenExp,
  setUserInformation,
} from './actions'

export default (dispatch, props) => ({
  registerAccount: async (newUserInfo) => {
    try {
      const result = await fetch({
        url: ENDPOINTS.registerAccount,
        method: 'POST',
        data: newUserInfo
      })
      console.log('======== Bao Minh debug :>: result', result)
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  loginAccount: async (userInfo) => {
    try {
      const result = await fetch({
        url: ENDPOINTS.loginAccount,
        method: 'POST',
        data: userInfo
      })
      if (result.data && result.status === 200) {
        dispatch(setUserToken(result.data.token))
        dispatch(setUserTokenExp(result.data.exp))
        dispatch(setUserInformation(result.data.user))
      }
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  }
})
