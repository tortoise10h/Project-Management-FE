import React, { Component } from 'react'
import Lottie from '../libraries/Lottie'
import { Button, Icon } from 'antd'
import { Link } from 'react-router-dom'

class ConfirmSuccess extends Component {
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
            animationData: require('./../assets/animations/success-animation.json')
          }}
          style={{ width: '50%', minWidth: '400px' }}
        />
        <h1>
          Thank You!
        </h1>
        <p style={{ width: 'auto', margin: 'auto', padding: 20 }}>Your account has been successfully registered. To complete the process please check your email for validation request </p>
        <Link to='/'>
          <Button size='large' type='primary' style={{ fontSize: 20, padding: 16, height: 'auto' }}>Move to workplace<Icon type='double-right' /></Button>
        </Link>
      </div>
    )
  }
}

export default ConfirmSuccess
