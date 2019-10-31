import { connect } from 'react-redux'
import handlers from '../handlers'
// import { MODULE_NAME as MODULE_VIEW } from '../models'
import KanbanComponent from '../components/Kanban'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  return {
    user: state.user.user,
    kanban: state.kanban
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanComponent)
