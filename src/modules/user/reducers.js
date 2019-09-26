import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  todo: []
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setTodoList]: (state, action) => ({
    ...state
  })
}

export default handleActions(handlers, defaultState)
