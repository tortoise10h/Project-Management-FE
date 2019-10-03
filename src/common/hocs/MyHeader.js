import React, { Component } from 'react'
import { Popover, Layout, Menu, Icon, Input, Badge, Row, Col, Typography, Dropdown } from 'antd'
import UserImg from './../../assets/images/logo.svg'

const { Text } = Typography
const { Header } = Layout

const menu = (
  <Menu>
    <Menu.Item key='0'>
      <a href='/'><Icon type='user' />Profile</a>
    </Menu.Item>
    <Menu.Item key='1'>
      <a href='/'><Icon type='logout' /> Log out</a>
    </Menu.Item>
  </Menu>
)

export default class Myheader extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { sidebarWidth, userName } = this.props
    let name = userName.split(' ')
    name = name[name.length - 1]
    return (
      <Header className='menuBar' style={{ width: 'calc(100% - ' + sidebarWidth + 'px)', padding: 16, position: 'fixed', zIndex: 10, transition: 'all 0.2s', boxShadow: '0 3px 8px -6px rgba(0,0,0,0.44)' }}>
        <Row type='flex'>
          <Col xs={{ span: 0 }} lg={{ span: 9, offset: 1 }} xl={{ span: 8, offset: 1 }}>
            <Input
              className='nav-input-search'
              placeholder='Search...'
              allowClear
              onSearch={value => console.log(value)}
              style={{ width: '100%', margin: 0, border: 'none', float: 'left' }}
              size='large'
              ref={(input) => { this.nameInput = input }}
              prefix={<Icon type='search' className='btn-search' />}
            />
          </Col>
          <Col xs={{ span: 2, offset: 10 }} lg={{ span: 0 }} className='btn-search-a right-menu-item'>

            <Popover
              trigger='click' placement='bottom' content={
                <Input.Search
                  placement='leftBottom'
                  placeholder='Search...'
                  allowClear
                  style={{ width: 500 }}
                  onSearch={value => console.log(value)}
                />
              }
            >
              <div className='circle-base notification'>
                <Icon type='search' className='btn-notice' style={{ fontSize: 20 }} />
              </div>
            </Popover>
          </Col>
          <Col xs={{ span: 2 }} lg={{ span: 1, offset: 8 }} xl={{ span: 1, offset: 11 }} className='right-menu-item'>
            <Popover
              // content={<Notification />}
              trigger='click' placement='bottom'
            >
              <Badge dot>
                <Icon type='notification' className='btn-notice' style={{ fontSize: 20 }} />
              </Badge>
            </Popover>
          </Col>
          <Col xs={{ span: 10 }} lg={{ span: 5 }} xl={{ span: 3 }} className='right-menu-item' style={{ float: 'left' }}>
            <Dropdown overlay={menu} trigger={['click']} className='menu-bar-dropdown'>
              <div className='circle-base user'>
                <img src={UserImg} style={UserImgStyle} alt='user-img' />
                <Text strong>Hi, {name || 'User'}</Text>
                <Icon type='down' style={{ marginLeft: 10, fontSize: 15 }} />
              </div>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    )
  }
}

const UserImgStyle = {
  height: 40,
  width: 40,
  borderRadius: '50%',
  marginRight: 30,
  marginBottom: 10,
  backgroundColor: '#64CCBD'
}
