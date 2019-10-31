import React, { Component } from 'react'
import { TwitterPicker } from 'react-color'
import { Icon, Row, Col, Input, Popover, Button, Tooltip } from 'antd'
import './css/style.css'

class LabelModalInTask extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayColorPicker: false,
      color: '#f17014',
      title: 'None',
      isInTask: false
    }
    this.COLORS = [
      '#FF6900',
      '#FCB900',
      '#7BDCB5',
      '#00D084',
      '#8ED1FC',
      '#0693E3',
      '#ABB8C3',
      '#EB144C',
      '#F78DA7',
      '#9900EF'
    ]
    this.setLabel = this.setLabel.bind(this)
    this.getLabel = this.getLabel.bind(this)
    this.handleTogleAddToTask = this.handleTogleAddToTask.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleVisible = this.handleVisible.bind(this)
  }

  async handleSave () {
    const { color, title } = this.state
    const { updateLabel, content: { id } } = this.props
    const result = await updateLabel(id, color, title)
    if (result.id) {
      this.setState({
        color: result.color,
        title: result.title
      })
    }
    this.handleVisible(false)
  }

  handleDelete () { }

  handleCancel () {
    this.getLabel()
    this.handleVisible(false)
  }

  async handleTogleAddToTask () {
    const { updateLabelInTask, taskId, content: { id, is_in_task: isInTask } } = this.props
    await updateLabelInTask(taskId, id, !isInTask)
    this.setState({
      isInTask: !this.state.isInTask
    })
  }

  handleVisible (visible) {
    this.setState({ displayColorPicker: visible })
  }

  handleChange (color) {
    this.setState({ color: color.hex })
  }

  handleChangeTitle (e) {
    this.setState({ title: e.target.value })
  }

  async getLabel () {
    const { getLabel, content: { id } } = this.props
    const result = await getLabel(id)
    if (result.id) {
      this.setState({
        color: result.color,
        title: result.title,
        isInTask: result.is_in_task
      })
    }
  }

  setLabel (value) {
    const { color, title, is_in_task: isInTask } = value || this.props.content
    this.setState({
      color: color,
      title: title,
      isInTask: isInTask
    })
  }

  componentDidMount () {
    this.setLabel()
  }

  componentWillReceiveProps (nextProps) {
    this.setLabel(nextProps.content)
  }

  render () {
    const { color, title, isInTask, displayColorPicker } = this.state
    return (
      <>
        <Row
          className='label'
          justify='center' type='flex'
        >
          <Col
            className='label-box'
            span={18}
            style={{
              background: color
            }}
            onClick={this.handleTogleAddToTask}
          >
            {
              title && title.length > 21
                ? (
                  <Tooltip placement='bottom' title={title}>
                    <span>{title}</span>
                  </Tooltip>
                )
                : (<span>{title}</span>)
            }
            {
              isInTask ? <span><Icon type='check' /></span> : null
            }
          </Col>
          <Popover
            trigger='click'
            visible={displayColorPicker}
            onVisibleChange={this.handleVisible}
            content={
              <div>
                <Input value={title} onChange={(e) => this.handleChangeTitle(e)} onPressEnter={this.handleSave} />
                <TwitterPicker
                  triangle='hide'
                  colors={this.COLORS}
                  color={color}
                  onChangeComplete={this.handleChange}
                  style={{
                    boxShadow: 'none'
                  }}
                />
                <Row type='flex' justify='center' align='middle' style={{ textAlign: 'center' }}>
                  <Col span={12}>
                    <Button type='primary' onClick={this.handleSave}>Save</Button>
                  </Col>
                  <Col span={12}>
                    <Button type='danger' onClick={this.handleCancel}>Cancel</Button>
                  </Col>
                </Row>
              </div>
            }
            placement='bottom'
          >
            <Col span={4} offset={1} className='label-btn' onClick={this.handleClick}>
              <Icon
                type='edit'
                fontSize={15}
              />
            </Col>
          </Popover>
        </Row>
      </>
    )
  }
}

export default LabelModalInTask
