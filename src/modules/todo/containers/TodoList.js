import { connect } from 'react-redux'
import handlers from '../handlers'
import { MODULE_NAME as MODULE_VIEW } from '../models'
import TodoList from '../components/TodoList'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  return {
    todo: state[MODULE_VIEW].todo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
