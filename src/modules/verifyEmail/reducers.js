import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  todo: []
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setTodoList]: (state, action) => ({
    ...state,
    todo: action.payload
  })
}

export default handleActions(handlers, defaultState)
