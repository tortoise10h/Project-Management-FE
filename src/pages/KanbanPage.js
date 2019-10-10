import React, { Component } from 'react'
import KanbanContainer from '../modules/kanban/containers/Kanban'

class KanbanPage extends Component {
  render () {
    const { history, match } = this.props

    return (
      <div
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <KanbanContainer
          history={history}
          projectId={match.params.id}
        />
      </div>
    )
  }
}

export default KanbanPage
