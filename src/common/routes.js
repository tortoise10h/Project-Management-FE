import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import MainLayout from './hocs/MainLayout'
import UnderContruct from '../pages/UnderContruct'
import LoginPage from '../pages/LoginPage'
import ViewListPage from '../pages/ViewListPage'

import LandingPage from './components/LandingPage'

export default class Routes extends Component {
  render () {
    const { store } = this.props
    let { user } = store.getState()
    user = user || {}
    /** If use is not exists => not login then show mot found page */
    if (!user.user || !user.user.id) {
      return (
        <LandingPage />
      )
    }
    if (true) {
      return (
        <MainLayout mode='1'>
          <Switch>
            <Route key='' path='/' exact component={ViewListPage} />,
            {/* <Route key='' path='/login' exact component={LoginPage} />, */}
            <Route component={UnderContruct} />
          </Switch>
        </MainLayout>
      )
    }
    /** Case user is login */
    // if (user.user.user_type_id === 1 && user.user.admin_id) {
    //   return (
    //     <MainLayout mode='1'>
    //       <Switch>
    //         <Route path='/' exact component={UnderContruct} />
    //       </Switch>
    //     </MainLayout>
    //   )
    // }
    return <Route path='*' exact component={UnderContruct} />
  }
}
