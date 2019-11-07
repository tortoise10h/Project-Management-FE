import React, { Component } from 'react'
import LogContainer from '../modules/kanban/containers/Log'

class LogPage extends Component {
  render () {
    const { history } = this.props

    return (
      <LogContainer
        history={history}
      />
    )
  }
}

export default LogPage
