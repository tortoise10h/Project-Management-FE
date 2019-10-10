import React, { Component } from 'react'
import ProjectItem from './ProjectItem'
export default class ProjectList extends Component {
  render () {
    const { min, max, projects } = this.props
    return (
      projects.slice(min, max).map((project) => (
        <ProjectItem
          history={this.props.history}
          key={project.id}
          project={project}
          id={this.props.id}
        />
      ))
    )
  }
}
