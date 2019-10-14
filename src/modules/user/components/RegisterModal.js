import React, { Component } from 'react'
import { Spin, Icon } from 'antd'
import { Link } from 'react-router-dom'
import Login from './login'
import Register from './register'

export default class RegisterModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      isLogginActive: true
    }
    this.handleLoading = this.handleLoading.bind(this)
  }

  handleLoading () {
    this.setState({
      loading: !this.state.loading
    })
  }

  componentDidMount () {
    // Add .right by default
    this.rightSide.classList.add('right')
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
    const { isLogginActive, loading } = this.state
    const { loginAccount, registerAccount, history } = this.props
    const current = isLogginActive ? 'Register' : 'Login'
    const currentActive = isLogginActive ? 'login' : 'register'
    return (
      <Spin spinning={loading} size='large' indicator={<Icon type='reload' spin />}>
        <div className='login'>
          <div className='container' ref={ref => (this.container = ref)}>
            <Link to='/'>
              <Icon
                type='close'
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '90%',
                  fontSize: 15
                }}
              />
            </Link>
            {isLogginActive && (
              <Login
                history={history}
                containerRef={ref => (this.current = ref)}
                loginAccount={loginAccount}
                onLoading={this.handleLoading}
              />
            )}
            {!isLogginActive && (
              <Register
                history={this.props.history}
                containerRef={ref => (this.current = ref)}
                registerAccount={registerAccount}
                onLoading={this.handleLoading}
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
      </Spin>
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
