import React, { Component } from 'react'
import ProjectItem from './ProjectItem'
export default class ProjectList extends Component {
  render () {
    const { min, max, projects } = this.props
    return (
      projects.slice(min, max).map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))
    )
  }
}
