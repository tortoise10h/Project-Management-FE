import { connect } from 'react-redux'
import handlers from '../handlers'
// import { MODULE_NAME as MODULE_VIEW } from '../models'
// import MainLayout from '../../../common/hocs/MainLayout'
import RemoveProject from '../components/RemoveProject'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  return {
    kanban: state.kanban,
    user: state.user.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveProject)
