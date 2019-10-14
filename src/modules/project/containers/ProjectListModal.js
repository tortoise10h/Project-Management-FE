import { connect } from 'react-redux'
import handlers from '../handlers'
// import { MODULE_NAME as MODULE_VIEW } from '../models'
import ProjectListModal from '../components/ProjectListModal'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListModal)
