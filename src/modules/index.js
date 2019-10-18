// MODULE NAMES
import { MODULE_NAME as MODULE_USER } from './user/models'
import { MODULE_NAME as MODULE_KANBAN } from './kanban/models'

// MODULE REDUCERS
import userReducers from './user/reducers'
import kanbanReducers from './kanban/reducers'

export const MODULE_SAGAS = [

]

export const MODULE_REDUCERS = {
  [MODULE_USER]: userReducers,
  [MODULE_KANBAN]: kanbanReducers
}
