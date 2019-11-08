import React, { Component } from 'react'
import { Popover, Input, Row, Col, Button } from 'antd'
import { TwitterPicker } from 'react-color'

class AddLabel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayColorPicker: false,
      color: '#f17014',
      title: ''
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
    this.handleVisible = this.handleVisible.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleAddLabel = this.handleAddLabel.bind(this)
  }

  handleAddLabel () {
    const { color, title } = this.state
    const { addLabel } = this.props
    this.handleVisible(false)
    addLabel(color, title)
  }

  handleCancel () {
    this.handleVisible(false)
  }

  handleChangeColor (color) {
    this.setState({ color: color.hex })
  }

  handleVisible (visible) {
    this.setState({ displayColorPicker: visible })
  }

  handleChangeTitle (e) {
    this.setState({ title: e.target.value })
  }

  render () {
    const { displayColorPicker, title, color } = this.state
    return (
      <div>
        <Popover
          trigger='click'
          visible={displayColorPicker}
          onVisibleChange={this.handleVisible}
          content={
            <div>
              <Input autoFocus value={title} onChange={(e) => this.handleChangeTitle(e)} onPressEnter={this.handleAddLabel} />
              <TwitterPicker
                triangle='hide'
                colors={this.COLORS}
                color={color}
                onChangeComplete={this.handleChangeColor}
                style={{
                  boxShadow: 'none'
                }}
              />
              <Row type='flex' justify='center' align='middle' style={{ textAlign: 'center' }}>
                <Col span={12}>
                  <Button type='primary' onClick={this.handleAddLabel}>Add</Button>
                </Col>
                <Col span={12}>
                  <Button type='danger' onClick={this.handleCancel}>Cancel</Button>
                </Col>
              </Row>
            </div>
          }
          placement='bottom'
        >
          <div
            className='add-label'
          >
            Create label
          </div>
        </Popover>
      </div>
    )
  }
}

export default AddLabel
