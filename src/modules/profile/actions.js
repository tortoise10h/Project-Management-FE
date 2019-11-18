import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setProjectInfo = createAction(`${MODULE_NAME}_SET_PPROJECT_INFO`)
export const setUserInformation = createAction(`${MODULE_NAME}_SET_USER_INFORMATION`)
export const setKanbanInfo = createAction(`${MODULE_NAME}_SET_KANBAN_INFO`)