import React from 'react'
import loginImg from './../../../assets/images/login.svg'
import { Form, Input, Icon, Checkbox, Button, Row, Col } from 'antd'
import checkError from '../../../libraries/CheckError'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  async handleOnSubmit (e) {
    e.preventDefault()
    const { form, loginAccount, onLoading, history } = this.props
    form.validateFieldsAndScroll(['email', 'password'], async (err, values) => {
      if (!err) {
        onLoading()
        const result = await loginAccount(values)
        if (result) {
          const errors = result.error
          onLoading()
          checkError(errors.error)
        } else {
          history.push('/')
        }
      }
    })
  }

  render () {
    const { form } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 }
    }
    return (
      <div className='base-container' ref={this.props.containerRef}>
        <div className='header'>Login</div>
        <div className='content'>
          <div className='image'>
            <img src={loginImg} alt='' />
          </div>
          <Form {...formItemLayout} style={{ width: '80%', margin: 'auto' }} onSubmit={this.handleOnSubmit}>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    required: true,
                    message: 'Please input email !!'
                  }
                ]
              })(
                <Input
                  placeholder='Email' size='large'
                  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
            </Form.Item>
            <Form.Item className='form-group'>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input password'
                  }
                ]
              })(
                <Input.Password
                  placeholder='Password' size='large'
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className='login-form-forgot' href='' style={{ float: 'right' }}>
                Forgot password
              </a>
              <Button className='Login' type='primary' size='large' htmlType='submit' style={{ width: '100%' }}>Login</Button>
            </Form.Item>
          </Form>
        </div>
        <h3 style={{ textAlign: 'center' }}>
          OR
        </h3>
        <Row className='login-fb-gg'>
          <Col lg={{ span: 12 }} sm={{ span: 24 }}>
            <div className='loginBtn loginBtn--facebook'>
              Login with Facebook
            </div>
          </Col>
          <Col lg={{ span: 12 }} sm={{ span: 24 }}>
            <div className='loginBtn loginBtn--google'>
              Login with Google
            </div>
          </Col>
        </Row>

      </div>
    )
  }
}

export default Form.create({ name: 'login' })(Login)
