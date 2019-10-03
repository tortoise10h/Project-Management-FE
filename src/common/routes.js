import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import MainLayout from './hocs/MainLayout2'
import UnderContruct from '../pages/UnderContruct'
import ViewListPage from '../pages/RegisterModalPage'
import LandingPage from './components/LandingPage'
import RegisterModalPage from './../pages/RegisterModalPage'
import ConfirmEmail from './../pages/ConfirmEmail'
import ConfirmSuccess from './../pages/ConfirmSuccess'

export default class Routes extends Component {
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
          <Route key='landing-page' path='/confirm-success' exact component={ConfirmSuccess} />
        </Switch>
      )
    }
    if (user && user.user) {
      return (
        <MainLayout mode='1'>
          <Switch>
            <Route key='' path='/dashboard' exact component={ViewListPage} />
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
