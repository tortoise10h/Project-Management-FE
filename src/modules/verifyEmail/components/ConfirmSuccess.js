import React, { Component } from 'react'
import Lottie from './../../../libraries/Lottie'
import { Button, Icon } from 'antd'
import { Link } from 'react-router-dom'

class ConfirmSuccess extends Component {
  constructor (props) {
    super(props)
    this.state = {
      success: false
    }
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  async componentDidMount () {
    const { verifyEmail, history } = this.props
    const token = new URLSearchParams(history.location.search).get('token')
    const email = new URLSearchParams(history.location.search).get('email')
    const result = await verifyEmail(token, email)
    this.setState({ success: result.data })
  }

  handleConfirm () {
    if (this.state.success) {
      return (
        <>
          <Lottie
            options={{
              loop: false,
              animationData: require('./../../../assets/animations/success-animation.json')
            }}
            style={{ width: '50%', minWidth: '400px' }}
          />
          <h1>
            Thank You!
          </h1>
          <p style={{ width: 'auto', margin: 'auto', padding: 20 }}>Your account has been successfully registered. To complete the process please check your email for validation request </p>
          <Link to='/'>
            <Button size='large' type='primary' style={{ fontSize: 20, padding: 16, height: 'auto' }}>Back to home<Icon type='double-left' /></Button>
          </Link>
        </>
      )
    } else {
      return (
        <>
          <Lottie
            options={{
              loop: false,
              animationData: require('./../../../assets/animations/confirm-error.json')
            }}
            style={{ width: '50%', minWidth: '400px' }}
          />
          <h1>
            SORRY !!!
          </h1>
          <p style={{ width: 'auto', margin: 'auto', padding: 20 }}>We have some problem . Please resgister again !! </p>
          <Link to='/'>
            <Button size='large' type='primary' style={{ fontSize: 20, padding: 16, height: 'auto' }}>Back to home<Icon type='double-left' /></Button>
          </Link>
        </>
      )
    }
  }

  render () {
    return (
      <div style={{ width: '60%', margin: 'auto', textAlign: 'center' }}>
        {
          this.state.success
            ? <>
              <Lottie
                options={{
                  loop: false,
                  animationData: require('./../../../assets/animations/success-animation.json')
                }}
                style={{ width: '50%', minWidth: '400px' }}
              />
              <h1>
                Thank You!
              </h1>
              <p style={{ width: 'auto', margin: 'auto', padding: 20 }}>Your account has been successfully registered. To complete the process please check your email for validation request </p>
              <Link to='/'>
                <Button size='large' type='primary' style={{ fontSize: 20, padding: 16, height: 'auto' }}>Back to home<Icon type='double-left' /></Button>
              </Link>
            </>
            : <>
              <Lottie
                options={{
                  loop: false,
                  animationData: require('./../../../assets/animations/confirm-error.json')
                }}
                style={{ width: '50%', minWidth: '400px' }}
              />
              <h1>
                SORRY !!!
              </h1>
              <p style={{ width: 'auto', margin: 'auto', padding: 20 }}>We have some problem . Please resgister again !! </p>
              <Link to='/'>
                <Button size='large' type='primary' style={{ fontSize: 20, padding: 16, height: 'auto' }}>Back to home<Icon type='double-left' /></Button>
              </Link>
            </>
        }
      </div>
    )
  }
}

export default ConfirmSuccess
