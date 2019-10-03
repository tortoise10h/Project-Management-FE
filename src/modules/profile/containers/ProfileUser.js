import { connect } from 'react-redux'
import handlers from '../handlers'
import { MODULE_NAME as MODULE_VIEW } from '../models'
import ProfileUser from '../components/ProfileUser'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  return {
    user: state[MODULE_VIEW].user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileUser)
