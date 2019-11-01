import React, { Component } from 'react'
import { Drawer } from 'antd'
import LabelListModal from '../../labels/containers/LabelListModal'
import SettingProject from '../../settingProject/containers/SettingProject'

export default class DrawerLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
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
        this.showDrawer('Labels', 20)
        this.CONTENT = <LabelListModal />
        break
      case 'setting-project':
        this.showDrawer('Project', 33)
        this.CONTENT = <SettingProject />
        break
      default:
        break
    }
  }

  showDrawer (value, width) {
    this.setState({
      visible: true,
      title: value || 'Title',
      width: width || 20
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
    const { visible, title, width } = this.state
    return (
      <Drawer
        title={title}
        placement='right'
        width={`${width}%`}
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
