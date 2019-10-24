import React, { Component } from 'react'
import { TwitterPicker } from 'react-color'
import { Icon, Row, Col, Input, Popover, Button } from 'antd'
import './css/style.css'

class LabelModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayColorPicker: false,
      color: '#f17014',
      title: 'None'
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

  handleDelete () {}

  handleCancel () {
    this.setLabel()
    this.handleVisible(false)
  }

  handleVisible (visible) {
    if (!visible) this.setLabel()
    this.setState({ displayColorPicker: visible })
  }

  handleChange (color) {
    this.setState({ color: color.hex })
  }

  handleChangeTitle (e) {
    this.setState({ title: e.target.value })
  }

  setLabel () {
    const { color, title } = this.props.content
    this.setState({
      color: color,
      title: title
    })
  }

  componentDidMount () {
    this.setLabel()
  }

  render () {
    const { color, title, displayColorPicker } = this.state
    return (
      <>
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
                {/* <Col span={12}>
                  <Button type='primary' onClick={this.handleDelete}>Delete</Button>
                </Col> */}
              </Row>
            </div>
          }
          placement='bottom'
        >
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
              onClick={this.handleClick}
            >
              <p>{title}</p>
            </Col>
            <Col span={4} offset={1} className='label-btn' onClick={this.handleClick}>
              <Icon
                type='edit'
                fontSize={15}
              />
            </Col>
          </Row>
        </Popover>
      </>
    )
  }
}

export default LabelModal
