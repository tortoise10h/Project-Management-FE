import React from 'react'
import RegisterModal from './../modules/user/containers/RegisterModal'

export default class RegisterModalPage extends React.Component {
  render () {
    const { history } = this.props
    return (
      <div>
        <RegisterModal history={history} />
      </div>
    )
  }
}
