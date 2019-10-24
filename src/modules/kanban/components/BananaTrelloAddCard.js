import React, { Component } from 'react'
import { Icon } from 'antd'

export default class BananaTrelloAddCard extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { onClick } = this.props
    return (
      <div
        className='trello-add-card--btn'
        style={{
          textAlign: 'left',
          alignItems: 'center',
          padding: 10,
          borderRadius: 4,
          color: '#5e6c84',
          cursor: 'pointer'
        }}
        onClick={onClick}
      >
        <span><Icon type='plus' style={{ fontSize: 16, marginRight: 8 }} /></span>
        <span>Add another task</span>
      </div>
    )
  }
}
