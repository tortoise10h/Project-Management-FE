import React, { Component } from 'react'
import ProjectItem from './ProjectItem'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
export default class ProjectList extends Component {
  render () {
    const { min, max, projects, onFavorite, history } = this.props
    return (
      <ReactCSSTransitionGroup
        transitionName='project-list-card'
        transitionAppear={!false}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        {
          projects.slice(min, max).map((project) => (
            <ProjectItem history={history} onFavorite={onFavorite} key={project.id} project={project} />
          ))
        }
      </ReactCSSTransitionGroup>
    )
  }
}
