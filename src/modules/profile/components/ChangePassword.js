import React from 'react'
import { Modal, Button, Form, Input, Switch, Typography, notification } from 'antd'

const { Title } = Typography
class ChangePassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      id: ''
    }
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this)
    this.validateToNextPassword = this.validateToNextPassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleShowModal (e) {
    this.setState({
      visible: true
    })
  }

  handleOk (e) {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  handleCancel (e) {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  handleConfirmBlur (e) {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword (rule, value, callback) {
    const { form } = this.props
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword (rule, value, callback) {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true })
    }
    callback()
  }

  handleSubmit (e) {
    e.preventDefault()
    const { form, setPasswordUserProfileInformation, email } = this.props
    form.validateFields(async (err, values) => {
      if (!err) {
        console.log('======== Tu Lan debug :>: Register -> handleOnSubmit -> values', values)
        const result = await setPasswordUserProfileInformation(values.oldPassword, values.newPassword, values.confirmPassword, email)
        if (result) {
          notification.success({
            message: ' successfully'
          })
          this.setState({ visible: false })
        } else {
          notification.error({
            message: ' error'
          })
        }
      }
    })
  }

  render () {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { visible } = this.state
    return (
      <div>
        <Button type='primary' onClick={this.handleShowModal}>
          Change Password
        </Button>
        <Modal
          title='Change Password'
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form layout='vertical' onSubmit={this.handleSubmit}>
            <Form.Item label='Current Password' hasFeedback>
              {getFieldDecorator('oldPassword', {
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
            <Form.Item label='New Password' hasFeedback>
              {getFieldDecorator('newPassword', {
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
              {getFieldDecorator('confirmPasword', {
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
          </Form>
        </Modal>
        <br />
        <Title style={{ textAlign: 'left', marginTop: 10 }} level={4}>
          Visible{' '}
        </Title>
        <Switch
          defaultChecked
        />
      </div>
    )
  }
}
export default Form.create({ name: 'ChangePassword' })(ChangePassword)
