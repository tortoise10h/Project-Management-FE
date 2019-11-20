import { connect } from 'react-redux'
import handlers from '../handlers'
// import { MODULE_NAME as MODULE_VIEW } from '../models'
// import MainLayout from '../../../common/hocs/MainLayout'
import OutProject from '../components/OutProject'

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
)(OutProject)
