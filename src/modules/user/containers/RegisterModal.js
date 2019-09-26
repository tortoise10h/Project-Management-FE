import { connect } from 'react-redux'
import handlers from '../handlers'
// import { MODULE_NAME as MODULE_VIEW } from '../models'
import RegisterModal from '../components/RegisterModal'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)
