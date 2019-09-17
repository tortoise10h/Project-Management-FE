import { fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import { setTodoList } from './actions'

export function getTodoListAsync ({ page = 1, search = {}, params = {} }) {
  return fetchAuthLoading({
    url: ENDPOINTS.getTodoList,
    method: 'GET',
    params: {
      page,
      limit: LIMIT,
      ...search,
      ...params
    }
  }).then((response) => {
    return response.data
  })
}

export default (dispatch, props) => ({
  getTodoList: async ({ page = 1, search = {}, params = {} }) => {
    dispatch(setTodoList([
      { id: 1, title: 'Ninh' },
      { id: 2, title: 'Quyen' },
      { id: 3, title: 'Cuong' }
    ]))
  }
})
