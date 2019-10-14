import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './css/style.css'
import { Layout, Menu, Icon, notification, Row, Col, Popover, Dropdown, Input, Badge, Typography } from 'antd'
import storeAccessible from '../utils/storeAccessible'
import { clearAll } from '../actions/common'

const { Text } = Typography
const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

notification.config({
  placement: 'bottomLeft'
})

const FULL_PAGES = ['/login']

class MenuPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      sidebarWidth: 260
    }
    this.MENUS = []
    if (props.user && props.user.user_type_id === 3 && props.user.jobSeekerOfUser) {
      this.setMenus(props.mode, props.user.jobSeekerOfUser.type)
    } else {
      this.setMenus(props.mode)
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleOnSelectMenuItem = this.handleOnSelectMenuItem.bind(this)
  }

  setMenus (mode, type) {
    switch (mode) {
      case '1':
        this.MENUS = [
          {
            key: 'dashboard',
            title: (
              <span>
                <Icon type='bar-chart' style={{ fontSize: 20 }} />
                <span>
                  Dashboard
                </span>
              </span>
            )
          },
          {
            key: 'project',
            title: (
              <span>
                <Icon type='project' style={{ fontSize: 20 }} />
                <span>
                  My Projects
                </span>
              </span>
            )
          }
        ]
        break
      default:
        this.MENUS = [
          {
            key: 'dashboard',
            title: (
              <span>
                <Icon type='home' />
                <span>Dashboard</span>
              </span>
            )
          }
        ]
    }
  }

  componentWillReceiveProps (nextProps) {
    const { user, mode } = nextProps
    if (user && user.user_type_id === 3 && user.jobSeekerOfUser) {
      this.setMenus(mode, user.jobSeekerOfUser.type)
    } else {
      this.setMenus(mode)
    }
  }

  handleChangePage (e) {
    const { history } = this.props
    const item = this.MENUS.find(data => data.key === e.key)
    history.push(item.redirect)
  }

  handleToggle () {
    let { collapsed } = this.state
    collapsed = !collapsed
    const sidebarWidth = collapsed ? 80 : 260
    this.setState({ collapsed, sidebarWidth })
  }

  handleOnSelectMenuItem (value) {
    const { history } = this.props
    switch (value.key) {
      case 'logout':
        storeAccessible.dispatch(clearAll())
        setTimeout(() => {
          window.location.href = '/'
        }, 200)
        break
      default:
        history.push(`/${value.key}`)
        break
    }
  }

  render () {
    const { collapsed, sidebarWidth } = this.state
    const { children, history: { location }, user } = this.props
    let name = user.name.split(' ')
    name = name[name.length - 1]
    if (FULL_PAGES.includes(location.pathname)) {
      return children
    }
    const logoClass = ['my-logo']
    const menuGroupClass = ['menu-item-group']
    if (collapsed) {
      logoClass.push('collapse')
    } else {
      menuGroupClass.push('non-collapse')
    }
    return (
      <Layout style={{ minHeight: '100vh' }} id='components-layout-demo-side'>
        <Sider
          // {...this.state.width < 700 ? 'breakpoint='lg' collapsedWidth='0'' : '' }
          className='side-bar'
          theme='light'
          width={sidebarWidth}
          collapsible
          collapsed={collapsed}
          onCollapse={this.handleToggle}
          style={{
            overflow: 'auto',
            height: '100vh',
            minHeight: 'auto',
            position: 'fixed',
            zIndex: 99
          }}
        >
          <div className='logo'>
            <a id='logo' href='/' className={logoClass.join(' ')}>
              <img alt='logo' src={require('../../assets/images/logo.svg')} />
              <img alt='Banana' src={require('../../assets/images/BananaBoys.png')} style={{ fill: '#ffff' }} />
            </a>
          </div>
          <Menu
            onClick={this.handleOnSelectMenuItem}
            theme='light'
            defaultSelectedKeys={['dashboard']}
            selectedKeys={[this.props.location.pathname.replace('/', '')]}
            mode='inline'
          >
            <Menu.ItemGroup title={
              <span style={collapsed ? { display: 'none' } : { display: 'block' }}>PROJECTS</span>
            }
            >
              {this.MENUS.map(item => {
                if (item.children) {
                  return (
                    <SubMenu
                      key={item.key}
                      title={item.title}
                    >
                      {item.children.map(child => {
                        return <Menu.Item key={child.key}>{child.title}</Menu.Item>
                      })}
                    </SubMenu>
                  )
                }
                return (
                  <Menu.Item key={item.key}>
                    {item.title}
                  </Menu.Item>
                )
              })}
            </Menu.ItemGroup>
            <Menu.ItemGroup
              title={
                <span style={collapsed ? { display: 'none' } : { display: 'block' }}>ACCOUNT</span>
              }
            >
              <Menu.Item key='profile'>
                <Icon type='user' />
                <span>Profile</span>
              </Menu.Item>
              {/* <Menu.Divider /> */}
              <Menu.Item key='logout'>
                <Icon type='logout' />
                <span>Sign out</span>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: sidebarWidth, transition: 'all 0.2s' }}>
          <Header className='menuBar' style={{ width: 'calc(100% - ' + sidebarWidth + 'px)', padding: 16, position: 'fixed', zIndex: 10, transition: 'all 0.2s', boxShadow: '0 3px 8px -6px rgba(0,0,0,0.44)' }}>
            <Row type='flex'>
              <Col xs={{ span: 0 }} lg={{ span: 9, offset: 1 }} xl={{ span: 8, offset: 1 }} xxl={{ span: 8, offset: 1 }}>
                <Input
                  className='nav-input-search'
                  placeholder='Search...'
                  allowClear
                  style={{ width: '100%', margin: 0, border: 'none', float: 'left' }}
                  size='large'
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
              <Col xs={{ span: 2 }} lg={{ span: 1, offset: 7 }} xl={{ span: 1, offset: 10 }} xxl={{ span: 1, offset: 910 }} className='right-menu-item'>
                <Popover
                  // content={<Notification />}
                  trigger='click' placement='bottom'
                >
                  <Badge dot>
                    <Icon type='notification' className='btn-notice' style={{ fontSize: 20 }} />
                  </Badge>
                </Popover>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 5 }} xl={{ span: 4 }} xxl={{ span: 3 }} className='right-menu-item' style={{ float: 'left' }}>
                <Dropdown
                  overlay={
                    <Menu onClick={this.handleOnSelectMenuItem}>
                      <Menu.Item key='profile'>
                        <Icon type='user' />
                        <span>
                          Profile
                        </span>
                      </Menu.Item>
                      <Menu.Item key='logout'>
                        <Icon type='logout' />
                        <span>
                          Log out
                        </span>
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={['click']} className='menu-bar-dropdown'
                >
                  <div className='circle-base user'>
                    <img
                      src={require('../../assets/images/logo.svg')}
                      alt='user-img'
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: '50%',
                        marginRight: 30,
                        marginBottom: 10,
                        backgroundColor: '#64CCBD'
                      }}
                    />
                    <Text strong>Hi, {name || 'User'}</Text>
                    <Icon type='down' style={{ marginLeft: 10, fontSize: 15 }} />
                  </div>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 20,
              marginTop: 100,
              minHeight: 280
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default connect((state) => {
  return {
    user: state.user.user
  }
})(withRouter(MenuPage))
