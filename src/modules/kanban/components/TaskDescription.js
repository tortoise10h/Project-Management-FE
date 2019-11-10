import React, { Component } from 'react'
import { Button, Icon, Form } from 'antd'
import ReactQuill from 'react-quill'

class TaskDescription extends Component {
  constructor (props) {
    super(props)
    this.state = {
      description: '',
      newDescription: '',
      isEdit: false
    }
    this.handleEditDesc = this.handleEditDesc.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdateDescription = this.handleUpdateDescription.bind(this)
  }

  handleChange (content, editor) {
    this.setState({
      newDescription: content !== '<p><br></p>' ? content : ''
    })
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
      description: description || '',
      newDescription: description || ''
    })
  }

  componentDidMount () {
    const { description } = this.props
    this.setState({
      description: description || '',
      newDescription: description || ''
    })
  }

  handleUpdateDescription () {
    const { onUpdateDescription } = this.props
    const { newDescription } = this.state
    onUpdateDescription(newDescription)
    this.setState({
      isEdit: false,
      description: newDescription
    })
  }

  render () {
    const { isEdit, description, newDescription } = this.state
    return (
      <div>
        {
          isEdit
            ? (
              <>
                <ReactQuill
                  defaultValue={newDescription}
                  theme='snow'
                  style={{
                    height: '100px',
                    marginBottom: 50
                  }}
                  onChange={(content, delta, source, editor) => this.handleChange(content, editor)}
                  placeholder='Add a more detailed description...'
                />
                <div>
                  <Button type='primary' onClick={() => this.handleUpdateDescription()} style={{ marginRight: 13 }}>Add</Button>
                  <Icon type='close' onClick={this.handleCancel} />
                </div>
              </>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: description || 'Add a more detailed description...' }} className='description' style={{ cursor: 'pointer', minHeight: 80, borderRadius: 4, padding: 12 }} onClick={this.handleEditDesc}>
                {/* {description || 'Add a more detailed description...'} */}
              </div>
            )
        }
      </div>
    )
  }
}

export default TaskDescription
