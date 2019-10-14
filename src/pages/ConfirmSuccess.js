import React, { Component } from 'react'
import ConfirmSuccess from './../modules/verifyEmail/containers/ConfirmSuccess'

class ConfirmSuccessPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: '',
      email: ''
    }
  }

  render () {
    return (
      <ConfirmSuccess history={this.props.history} />
    )
  }
}

export default ConfirmSuccessPage
