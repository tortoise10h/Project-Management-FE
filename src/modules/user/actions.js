import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setUserToken = createAction(`${MODULE_NAME}_SET_USER_TOKEN`)
export const setUserTokenExp = createAction(
  `${MODULE_NAME}_SET_USER_TOKEN_EXP`
)
export const setUserInformation = createAction(
  `${MODULE_NAME}_SET_USER_INFORMATION`
)

