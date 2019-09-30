import React, { Component } from 'react'
import Login from './login'
import Register from './register'

export default class RegisterModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogginActive: true
    }
  }

  componentDidMount () {
    // Add .right by default
    this.rightSide.classList.add('right')
    console.log('=========> TuLinh Debug: >: RegisterModal -> componentDidMount -> this.props', this.props)
  }

  changeState () {
    const { isLogginActive } = this.state

    if (isLogginActive) {
      this.rightSide.classList.remove('right')
      this.rightSide.classList.add('left')
    } else {
      this.rightSide.classList.remove('left')
      this.rightSide.classList.add('right')
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }))
  }

  render () {
    console.log('======== Bao Minh debug :>: RegisterModal -> render -> this.props', this.props)
    const { isLogginActive } = this.state
    const { loginAccount, registerAccount } = this.props
    const current = isLogginActive ? 'Register' : 'Login'
    const currentActive = isLogginActive ? 'login' : 'register'
    return (
      <div className='login'>
        <div className='container' ref={ref => (this.container = ref)}>
          {isLogginActive && (
            <Login
              containerRef={ref => (this.current = ref)}
              loginAccount={loginAccount}
            />
          )}
          {!isLogginActive && (
            <Register
              containerRef={ref => (this.current = ref)}
              registerAccount={registerAccount}
            />
          )}
        </div>
        <RightSide
          current={current}
          currentActive={currentActive}
          containerRef={ref => (this.rightSide = ref)}
          onClick={this.changeState.bind(this)}
        />

      </div>
    )
  }
}

const RightSide = props => {
  return (
    <div
      className='right-side'
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className='inner-container'>
        <div className='text'>{props.current}</div>
      </div>
    </div>
  )
}
