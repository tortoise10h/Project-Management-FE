import React, { Component } from 'react'
import ProjectListModal from '../modules/project/containers/ProjectListModal'

class ProjectList extends Component {
  render () {
    const { history } = this.props

    return (
      <ProjectListModal
        history={history}
      />
    )
  }
}

export default ProjectList
