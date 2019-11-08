import { fetch } from '../../common/effects'
import { ENDPOINTS } from './models'

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
