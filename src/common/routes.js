import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import MainLayout from './hocs/MainLayout'
import UnderContruct from '../pages/UnderContruct'
import ProjectListModal from '../pages/ProjectListModal'
import UserProfile from '../modules/profile/components/ProfileModal'
import LandingPage from './components/LandingPage'
import RegisterModalPage from './../pages/RegisterModalPage'
import ConfirmEmail from './../pages/ConfirmEmail'
import ConfirmSuccess from './../pages/ConfirmSuccess'
import KanbanPage from './../pages/KanbanPage'
import MembersMenu from './../modules/Members/containers/MembersMenu'
import LogPage from './../pages/LogPage'

export default class Routes extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { store } = this.props
    let { user } = store.getState()
    user = user || {}
    /** If use is not exists => not login then show mot found page */
    if (!user.user || !user.user.id) {
      return (
        <Switch>
          <Route key='landing-page' path='/' exact component={LandingPage} />
          <Route key='register-login' path='/register-login' exact component={RegisterModalPage} />
          <Route key='landing-page' path='/confirm-email' exact component={ConfirmEmail} />
          <Route key='landing-page' path='/verify' exact component={ConfirmSuccess} />
        </Switch>
      )
    }
    /** Case user is login */
    if (user && user.user) {
      return (
        <MainLayout>
          <Switch>
            <Route key='' path='/project' exact component={ProjectListModal} />
            <Route key='' path='/project-kanban/:id' exact component={KanbanPage} />
            <Route key='' path='/profile/:id' exact component={UserProfile} />
            <Route key='' path='/setting-members' exact component={MembersMenu} />
            <Route key='' path='/project-log' exact component={LogPage} />
            <Route component={UnderContruct} />
          </Switch>
        </MainLayout>
      )
    }
    return <Route path='*' exact component={UnderContruct} />
  }
}
