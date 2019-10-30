import React, { Component } from 'react'
import { Icon, Popconfirm, Input, Tooltip } from 'antd'

class BananaTrelloLaneHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      laneTitle: '',
      isEdit: false
    }
    this.setTitle = this.setTitle.bind(this)
    this.handleEditLaneTitle = this.handleEditLaneTitle.bind(this)
    this.handleUpdateTitle = this.handleUpdateTitle.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidMount () {
    const { title } = this.props
    this.setState({
      laneTitle: title
    })
  }

  setTitle (e) {
    this.setState({
      laneTitle: e.target.value
    })
  }

  handleEditLaneTitle () {
    this.setState({
      isEdit: true
    })
  }

  handleCancel () {
    const { title } = this.props
    this.setState({
      laneTitle: title,
      isEdit: false
    })
  }

  handleUpdateTitle () {
    const { updateTitle } = this.props
    const { laneTitle } = this.state
    updateTitle(laneTitle)
    this.setState({
      isEdit: false
    })
  }

  render () {
    const { label, onDelete } = this.props
    const { laneTitle, isEdit } = this.state
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ display: 'inline-block', width: '70%', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left', paddingLeft: 6 }} onClick={this.handleEditLaneTitle}>
          {
            isEdit
              ? (
                <Input
                  value={laneTitle}
                  autoFocus
                  onBlur={this.handleCancel}
                  onPressEnter={this.handleUpdateTitle}
                  onChange={(e) => this.setTitle(e)}
                />
              ) : (laneTitle.length > 21 ? (
                <Tooltip title={laneTitle} placement='bottom'>
                  {laneTitle}
                </Tooltip>
              ) : (<>{laneTitle}</>))
          }
        </span>
        <span style={{ display: 'inline-block', width: '20%' }}>
          {label}
        </span>
        <Popconfirm
          trigger='click'
          placement='bottom'
          title='Are you sure delete this lane?'
          onConfirm={onDelete}
          okText='Yes'
          cancelText='No'
        >
          <span style={{ display: 'inline-block', width: '10%', cursor: 'pointer' }}>
            <Icon type='more' />
          </span>
        </Popconfirm>
      </div>
    )
  }
}

export default BananaTrelloLaneHeader
