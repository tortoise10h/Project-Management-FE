import React, { Component } from 'react'
import { Icon, Popconfirm, Input, Tooltip, notification, Popover, Switch, Divider } from 'antd'
import checkError from '../../../libraries/CheckError'

class BananaTrelloLaneHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLocked: false,
      laneTitle: '',
      isEdit: false
    }
    this.getLaneInfo = this.getLaneInfo.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.handleEditLaneTitle = this.handleEditLaneTitle.bind(this)
    this.handleUpdateTitle = this.handleUpdateTitle.bind(this)
    this.handleOnDelete = this.handleOnDelete.bind(this)
    this.handleOnLock = this.handleOnLock.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  async getLaneInfo () {
    const { getColumn, id } = this.props
    const result = await getColumn(id)
    if (result.id) {
      this.setState({
        isLocked: result.is_locked
      })
    } else {
      checkError(result.error)
    }
  }

  componentDidMount () {
    const { title } = this.props
    this.setState({
      laneTitle: title
    })
    this.getLaneInfo()
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

  async handleOnDelete () {
    const { onDelete, deleteColumn, id } = this.props
    const result = await deleteColumn(id)
    if (result.error) {
      checkError(result.error.error)
    } else {
      onDelete()
      notification.success({
        placement: 'topRight',
        message: 'Delete lane success'
      })
    }
  }

  async handleOnLock (e) {
    const { updateColumn, id, title, onLockLane } = this.props
    const result = await updateColumn(id, { is_locked: e })
    if (result.error) {
      checkError(result.error.error)
    } else {
      notification.success({
        placement: 'topRight',
        message: e ? `Lock ${title} success` : `Unlock ${title} success`
      })
      this.setState({
        isLocked: e
      })
      onLockLane(id, e)
    }
  }

  render () {
    const { cards } = this.props
    const { laneTitle, isEdit, isLocked } = this.state
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
              ) : (
                laneTitle.length > 21
                  ? (
                    <Tooltip title={laneTitle} placement='bottom'>
                      {laneTitle}
                    </Tooltip>
                  ) : (
                    isLocked
                      ? (
                        <>
                          <span>{laneTitle}</span>
                          <Icon type='lock' style={{ marginLeft: 15 }} />
                        </>
                      ) : <span>{laneTitle}</span>
                  ))
          }
        </span>
        <span style={{ display: 'inline-block', width: '20%' }}>
          {cards.length}
        </span>
        <Popover
          trigger='click'
          placement='bottom'
          content={
            <div
              className='edit-column'
              style={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <span style={{ display: 'inline-block' }}>
                <Icon type='lock' style={{ marginRight: 10 }} />
                <Switch checked={isLocked} onChange={this.handleOnLock} />
              </span>
              <Divider type='vertical' style={{ height: 30 }} />
              <Popconfirm
                trigger='click'
                placement='bottom'
                title='Are you sure delete this lane?'
                onConfirm={this.handleOnDelete}
                okText='Yes'
                cancelText='No'
              >
                <span className='edit-column-btn'>
                  <Icon type='delete' />
                </span>
              </Popconfirm>
            </div>
          }
        >
          <span style={{ display: 'inline-block', width: '10%', cursor: 'pointer' }}>
            <Icon type='more' />
          </span>
        </Popover>
      </div>
    )
  }
}

export default BananaTrelloLaneHeader
