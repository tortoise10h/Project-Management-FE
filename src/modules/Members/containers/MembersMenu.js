import { connect } from 'react-redux'
import handlers from '../handlers'
// import { MODULE_NAME as MODULE_VIEW } from '../models'
import MembersMenu from '../components/MembersMenu'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  return {
    user: state.user.user,
    project: state.kanban.project
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersMenu)
