import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  tasks: [],
  kanbanInfo: []
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setTasks]: (state, action) => ({
    ...state,
    tasks: action.payload
  }),
  [actions.setKanbanInfo]: (state, action) => ({
    ...state,
    kanbanInfo: action.payload
  })
}

export default handleActions(handlers, defaultState)
