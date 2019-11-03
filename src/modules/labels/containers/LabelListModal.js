import { connect } from 'react-redux'
import handlers from '../handlers'
import kanbanHandlers from '../../kanban/handlers'
// import { MODULE_NAME as MODULE_VIEW } from '../models'
import LabelListModal from './../components/LabelListModal'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props),
  ...kanbanHandlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  /** If LabelListModal was called by React-Trello
   * that's mean storage can not map to state than set it to default empty object
   * else if LabelListModal was called by another team made components
   * then set state is already has storage to project object
   */
  return {
    project: state.kanban ? state.kanban.project : {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelListModal)
