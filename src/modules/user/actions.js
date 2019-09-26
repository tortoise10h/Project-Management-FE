import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setAdminList = createAction(`${MODULE_NAME}_SET_ADMIN_LIST`)
export const setUserToken = createAction(`${MODULE_NAME}_SET_USER_TOKEN`)
export const setUserTokenExp = createAction(
  `${MODULE_NAME}_SET_USER_TOKEN_EXP`
)
export const setCustomerList = createAction(`${MODULE_NAME}_SET_CUSTOMER_LIST`)
export const setStudentList = createAction(`${MODULE_NAME}_SET_STUDENT_LIST`)
export const setUserInformation = createAction(
  `${MODULE_NAME}_SET_USER_INFORMATION`
)
export const searchCustomer = createAction(`${MODULE_NAME}_SEARCH_CUSTOMER`)
export const getStudentByCustomer = createAction(`${MODULE_NAME}_GET_STUDENTS_BY_CUSTOMER`)

export const setTodoList = createAction(`${MODULE_NAME}_SET_TODO_LIST`)
