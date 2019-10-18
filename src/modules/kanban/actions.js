import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const clearAll = createAction(`${MODULE_NAME}_CLEAR_ALL`)
export const setTasks = createAction(`${MODULE_NAME}_SET_TASKS`)
export const setKanbanInfo = createAction(`${MODULE_NAME}_SET_KANBAN_INFO`)
export const setUserRole = createAction(`${MODULE_NAME}_SET_USER_ROLE`)
export const setProjectInfo = createAction(`${MODULE_NAME}_SET_PPROJECT_INFO`)
