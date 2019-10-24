import { connect } from 'react-redux'
import handlers from '../handlers'
// import { MODULE_NAME as MODULE_VIEW } from '../models'
import LabelListModal from './../components/LabelListModal'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  return {
    project: state.kanban.project
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelListModal)
