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
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this)
    this.validateToNextPassword = this.validateToNextPassword.bind(this)
  }

  async handleOnSubmit (e) {
    e.preventDefault()
    const { form, registerAccount } = this.props
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const result = await registerAccount(values)
        console.log('======== Bao Minh debug :>: Register -> handleOnSubmit -> result', result)
      }
    })
  }

  handleConfirmBlur (e) {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword (rule, value, callback) {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback()
    } else {
      callback()
    }
  }

  validateToNextPassword (rule, value, callback) {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render () {
    const { form } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    }
    return (
      <div className='base-container' ref={this.props.containerRef}>
        <div className='header'>Register</div>
        <div className='content'>
          <div className='image'>
            <img src={loginImg} alt='img' />
          </div>
          <Form
            {...formItemLayout}
            onSubmit={this.handleOnSubmit}
            layout='vertical'
            style={{ width: '80%', margin: 'auto' }}
          >
            <Form.Item label='Full Name'>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your name'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Email' hasFeedback>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your email!'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Phone'>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your email!'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Password' hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!'
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label='Comfirm Password' hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Button className='Login' type='primary' htmlType='submit' style={{ width: '100%' }}>Register</Button>
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
