import React, { Component } from 'react'
import Lottie from '../libraries/Lottie'
import { Button, Icon } from 'antd'
import { Link } from 'react-router-dom'

class ConfirmEmail extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div style={{ width: '60%', margin: 'auto', textAlign: 'center' }}>
        <Lottie
          options={{
            loop: false,
            animationData: require('./../assets/animations/confirm-email.json')
          }}
          style={{ width: '50%', minWidth: '400px' }}
        />
        <h1>
          Confirm your email!
        </h1>
        <p style={{ width: 'auto', margin: 'auto', padding: 20 }}>Your account has been successfully registered. To complete the process please check your email for validation request </p>
        <Link to='/'>
          <Button size='large' type='primary' style={{ fontSize: 20, padding: 16, height: 'auto' }}><Icon type='double-left' />Back to homepage</Button>
        </Link>
      </div>
    )
  }
}

export default ConfirmEmail
