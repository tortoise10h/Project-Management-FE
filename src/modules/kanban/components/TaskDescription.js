import React, { Component } from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { Button, Icon, Form } from 'antd'

class TaskDescription extends Component {
  constructor (props) {
    super(props)
    this.state = {
      description: '',
      isEdit: false
    }
    this.handleEditDesc = this.handleEditDesc.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleUpdateDescription = this.handleUpdateDescription.bind(this)
  }

  handleEditDesc () {
    this.setState({
      isEdit: true
    })
  }

  handleCancel () {
    const { description } = this.props
    this.setState({
      isEdit: false,
      description: description || ''
    })
  }

  componentDidMount () {
    const { description } = this.props
    this.setState({
      description: description || ''
    })
  }

  handleUpdateDescription (e) {
    const { onUpdateDescription } = this.props
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onUpdateDescription(values.description)
        this.setState({
          isEdit: false,
          description: values.description
        })
      }
    })
  }

  render () {
    const { isEdit, description } = this.state
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <div>
        {
          isEdit
            ? (
              <>
                <Form onSubmit={this.handleUpdateDescription}>
                  <Form.Item>
                    {getFieldDecorator('description', {
                      rules: [{ required: false, message: 'Add a more detailed description...' }],
                      initialValue: `${description}`
                    })(
                      <TextArea
                        autoFocus
                        onBlur={this.handleCancel}
                        rows={5}
                        placeholder='Add a more detailed description...'
                      />
                    )}
                  </Form.Item>
                  <Form.Item style={{ textAlign: 'left' }}>
                    <Button type='primary' htmlType='submit' style={{ marginRight: 13 }}>Add</Button>
                    <Icon type='close' onClick={this.handleCancel} />
                  </Form.Item>
                </Form>
              </>
            ) : (
              <div className='description' style={{ cursor: 'pointer', minHeight: 80, borderRadius: 4, padding: 12 }} onClick={this.handleEditDesc}>
                {description || 'Add a more detailed description...'}
              </div>
            )
        }
      </div>
    )
  }
}

export default Form.create({ name: 'description_form' })(TaskDescription)
