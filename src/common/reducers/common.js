import { handleActions } from 'redux-actions'
import * as actions from '../actions/common'

const defaultState = {
  language: 'en',
  timeout: 30000,
  roles: [],
  locations: []
}

const handlers = {
  [actions.clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setRequestTimeout]: (state, action) => {
    return {
      ...state,
      timeout: action.payload
    }
  },
  [actions.setLocations]: (state, action) => ({
    ...state,
    locations: action.payload
  })
}

export default handleActions(handlers, defaultState)
