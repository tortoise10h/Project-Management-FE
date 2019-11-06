import React, { Component } from 'react'
import { Input, Button, Form, Icon } from 'antd'

const { TextArea } = Input

class BananaTrelloCardForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (e) {
    e.preventDefault()
    const { form, onAdd, laneId, addTask } = this.props
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const task = await addTask(laneId, values)
        onAdd({
          id: task.id,
          title: task.title,
          description: task.description,
          index: task.index
        })
      }
    })
  }

  render () {
    const { form, onCancel } = this.props
    console.log('======== Bao Minh: BananaTrelloCardForm -> render -> this.props', this.props)
    const { getFieldDecorator } = form
    return (
      <Form
        className='react-trello-addCard'
        style={{
          backgroundColor: '#ffff',
          padding: 8,
          borderRadius: 4
        }}
        onSubmit={this.handleSubmit}
      >
        <Form.Item style={{ marginBottom: 0 }}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input task title' }]
          })(
            <Input autoFocus placeholder='Title' style={{ marginBottom: 8 }} />
          )}
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          {getFieldDecorator('description', {
            rules: [{ required: false, message: 'Please input task title' }]
          })(
            <TextArea placeholder='Add description ...' row={4} style={{ marginBottom: 8 }} />
          )}
        </Form.Item>
        <div style={{ textAlign: 'left' }}>
          <Button type='primary' htmlType='submit' style={{ marginRight: 13 }}>Add</Button>
          <Icon type='close' onClick={onCancel} />
        </div>
      </Form>
    )
  }
}

export default Form.create({ name: 'Card_From ' })(BananaTrelloCardForm)
