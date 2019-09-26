import React from 'react'
import './css/style.css'
import {
  Input, Form, Button
} from 'antd'
import loginImg from './../../../assets/images/login.svg'

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  async handleOnSubmit (e) {
    e.preventDefault()
    const { form, registerAccount } = this.props
    console.log('======== Bao Minh debug :>: Register -> handleOnSubmit -> this.props', this.props)
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const result = await registerAccount(values)
        console.log('======== Bao Minh debug :>: Register -> handleOnSubmit -> result', result)
      }
    })
  }

  render () {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <div className='base-container' ref={this.props.containerRef}>
        <div className='header'>Register</div>
        <div className='content'>
          <div className='image'>
            <img src={loginImg} />
          </div>
          <Form
            className='form'
            onSubmit={this.handleOnSubmit}
          >
            <div className='form-group'>
              <Form.Item label='Full name'>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your name'
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </div>
            <div className='form-group'>
              <Form.Item label='Email'>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'Sai email !!!!!'
                    },
                    {
                      required: true,
                      message: 'Please input your email'
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </div>
            <div className='form-group'>
              <Form.Item label='Password'>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password'
                    }
                  ]
                })(<Input type='Password' />)}
              </Form.Item>
            </div>
            <div className='form-group'>
              <Form.Item label='Phone'>
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your phone'
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </div>
            <Button className='Login' type='primary' htmlType='submit'>Register</Button>
          </Form>
        </div>
        {/* <a href='#' className='Login'>
          <span />
          <span />
          <span />
          <span />
          Register
        </a> */}
      </div>
    )
  }
}

export default Form.create({ name: 'Register' })(Register)
