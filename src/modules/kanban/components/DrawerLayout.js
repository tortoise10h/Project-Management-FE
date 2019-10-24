import React, { Component } from 'react'
import { Drawer } from 'antd'
import LabelListModal from '../../labels/containers/LabelListModal'

export default class DrawerLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      title: 'Label'
    }
    this.CONTENT = ''
    if (props.content) {
      this.setDrawer(props.content)
    }
    this.showDrawer = this.showDrawer.bind(this)
  }

  setDrawer (content) {
    switch (content) {
      case 'setting-label':
        this.showDrawer()
        this.CONTENT = <LabelListModal />
        break
      default:
        break
    }
  }

  showDrawer () {
    this.setState({
      visible: true
    })
  }

  handleOnClose () {
    const { content, onClose } = this.props
    this.setDrawer(content)
    this.setState({
      visible: false
    })
    onClose()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.content) {
      this.setDrawer(newProps.content)
    }
  }

  render () {
    const { visible, title } = this.state
    return (
      <Drawer
        title={title}
        placement='right'
        width='20%'
        onClose={() => this.handleOnClose()}
        visible={visible}
        bodyStyle={{
          height: '80%'
        }}
      >
        {this.CONTENT}
      </Drawer>
    )
  }
}
