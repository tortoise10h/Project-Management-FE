import React, { Component } from 'react'
import { Form, Icon } from 'antd'

class BananaTrelloLaneSection extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { onClick } = this.props

    return (
      <div
        className='trello-add-label--btn'
        style={{
          marginLeft: 5,
          marginTop: 5,
          textAlign: 'left',
          alignItems: 'center',
          padding: 10,
          borderRadius: 4,
          color: '#172b4d',
          cursor: 'pointer',
          minWidth: 200
        }}
        onClick={onClick}
      >
        <span><Icon type='plus' style={{ fontSize: 16, marginRight: 8 }} /></span>
        <span>Add another lane</span>
      </div>
    )
  }
}

export default Form.create({ name: 'Lane_From ' })(BananaTrelloLaneSection)
