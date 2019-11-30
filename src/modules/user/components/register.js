import React from 'react'
import './css/style.css'
import {
  Input, Form, Button
} from 'antd'
import checkError from '../../../libraries/CheckError'
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
    this.setState({ loading: true })
    const { form, registerAccount, history, onLoading } = this.props
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        onLoading()
        const result = await registerAccount(values)
        if (result) {
          const errors = result.error
          onLoading()
          checkError(errors.error)
        } else {
          history.push('/confirm-email')
        }
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
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword (rule, value, callback) {
    if (value.length >= 8) {
      const { form } = this.props
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    } else {
      callback('Password must be at least 8 characters')
    }
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
              {getFieldDecorator('confirmed', {
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
      </div>
    )
  }
}

export default Form.create({ name: 'Register' })(Register)
