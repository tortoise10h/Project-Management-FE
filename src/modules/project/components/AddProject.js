import React, { Component } from 'react'
import { Button, Modal, Form, Input, notification } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

class AddProject extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleShowModal () {
    this.setState({
      visible: true
    })
  }

  handleCancel () {
    this.setState({
      visible: false
    })
  }

  handleOk () {
    this.setState({
      visible: false
    })
  }

  handleCreate (e) {
    e.preventDefault()
    const { form, onAddProject: createProject } = this.props
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const result = await createProject(values)
        if (result.data) {
          notification.success({
            message: 'Create project successfully'
          })
          this.setState({ visible: false })
          this.props.form.resetFields()
          this.props.onGetProjectList()
        } else {
          notification.error({
            message: 'Create project error'
          })
        }
      }
    })
  }

  handleSave (formRef) {
    this.formRef = formRef
  }

  render () {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { visible } = this.state
    return (
      <div style={{ paddingRight: 20 }}>
        <Button icon='plus' type='primary' style={btnStyle} size='large' onClick={this.handleShowModal}>Add Project</Button>
        <Modal
          visible={visible}
          title='Create new project'
          onCancel={this.handleCancel}
          onOk={this.handleCreate}
          okText='Create'
        >
          <Form
            layout='vertical'
            onSubmit={this.handleCreate}
          >
            <Form.Item label='Title' hasFeedback>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the title of project!'
                  }
                ]
              })(<Input autoFocus placeholder='Title here ...' />)}
            </Form.Item>
            <Form.Item label='Decription'>
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: false,
                    message: 'Please input the title of collection!'
                  }]
              })(<TextArea placeholder='Text here ...' />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

const btnStyle = {
  marginBottom: 30,
  float: 'right'
}

export default Form.create({ name: 'create_project' })(AddProject)
