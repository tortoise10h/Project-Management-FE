import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setTodoList = createAction(`${MODULE_NAME}_SET_TODO_LIST`)
