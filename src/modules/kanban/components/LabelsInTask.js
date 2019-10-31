import React, { Component } from 'react'
import { Popover, Icon } from 'antd'

export default class LabelsInTask extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      labels: []
    }
    this.handleCloseLabelOption = this.handleCloseLabelOption.bind(this)
  }

  handleCloseLabelOption () {
    const { onUpdateLabel } = this.props
    this.setState({
      visible: !this.state.visible
    })
    onUpdateLabel()
  }

  async getLabelListInTask () {
    const { getLabelListInTask, taskId } = this.props
    const result = await getLabelListInTask(taskId)
    this.setState({
      labels: result
    })
  }

  componentDidMount () {
    this.getLabelListInTask()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.updateLabel) {
      this.getLabelListInTask()
    }
  }

  render () {
    const { listLabelInTask } = this.props
    const { visible, labels } = this.state
    return (
      <>
        {
          labels && labels.map((label) => (
            label.is_in_task
              ? (
                <span className='trello-card--labels-text modal' style={{ backgroundColor: label.color }}>
                  {label.title}
                </span>
              ) : null
          ))
        }
        <Popover
          visible={visible}
          onVisibleChange={this.handleCloseLabelOption}
          trigger='click'
          placement='bottom'
          title={
            <>
              <span>Labels</span>
              <span style={{ float: 'right', cursor: 'pointer' }} onClick={this.handleCloseLabelOption}>
                <Icon type='close' />
              </span>
            </>
          }
          content={listLabelInTask}
          overlayStyle={{
            width: '300px'
          }}
        >
          <span className='trello-card--labels modal add'>
            <Icon type='plus' />
          </span>
        </Popover>
      </>
    )
  }
}
