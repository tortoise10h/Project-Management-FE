import { fetchAuthLoading, fetch } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import { setTodoList } from './actions'

// export function getTodoListAsync({ page = 1, search = {}, params = {} }) {
//   return fetchAuthLoading({
//     url: ENDPOINTS.getTodoList,
//     method: 'GET',
//     params: {
//       page,
//       limit: LIMIT,
//       ...search,
//       ...params
//     }
//   }).then((response) => {
//     return response.data
//   })
// }

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
  }
})
