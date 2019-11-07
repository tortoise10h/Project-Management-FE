import { connect } from 'react-redux'
import handlers from '../handlers'
// import { MODULE_NAME as MODULE_VIEW } from '../models'
import Log from '../components/KanbanLog/Log'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  return {
    kanban: state.kanban
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)
