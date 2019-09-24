import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Avatar, Layout, Menu, Icon, notification } from 'antd'
import storeAccessible from '../utils/storeAccessible'
import { clearAll } from '../actions/common'
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
      collapsed: false
    }
    this.MENUS = []
    if (props.user && props.user.user_type_id === 3 && props.user.jobSeekerOfUser) {
      this.setMenus(props.mode, props.user.jobSeekerOfUser.type)
    } else {
      this.setMenus(props.mode)
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.changePage = this.changePage.bind(this)
  }

  setMenus (mode, type) {
    switch (mode) {
      case '1':
        this.MENUS = [
          {
            key: 'dashboard',
            title: (
              <>
                <span>
                  <Icon type='home' />
                  <span>Dashboard</span>
                </span>
                <div>
                Huy nguyen
                </div>
              </>
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

  changePage (e) {
    const { history } = this.props
    const item = this.MENUS.find(data => data.key === e.key)
    history.push(item.redirect)
  }

  handleToggle () {
    const { collapsed } = this.state
    this.setState({
      collapsed: !collapsed
    })
  }

  handleClick (value) {
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
    const { collapsed } = this.state
    const { children, history: { location }, userName } = this.props
    if (FULL_PAGES.includes(location.pathname)) {
      return children
    }
    return (
      <Layout className='menu-page'>
        <Sider
          theme='light'
          style={{ height: '100vh', overflow: 'auto' }}
          collapsed={collapsed}
          onCollapse={this.handleToggle}
        >
          <div style={{
            display: 'flex',
            justifyContent: !collapsed ? 'space-between' : 'center',
            alignItems: 'center',
            height: 55,
            padding: '0px 15px',
            borderBottom: '1px solid #303546'
          }}
          >
            {!collapsed
              ? <img alt='logo' src={require('../../assets/images/logo-ccp2x.png')} className='logo' />
              : null}
            <div style={{ fontSize: '1.4em', cursor: 'pointer', padding: 6 }} onClick={this.handleToggle}>
              <Icon type='menu' />
            </div>
          </div>
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={['dashboard']}
            selectedKeys={[this.props.location.pathname.replace('/', '')]}
            theme='light'
            mode='horizontal'
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
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: '#f3f6fd',
              padding: 0,
              paddingLeft: 20,
              paddingRight: 20,
              height: 55,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              borderBottom: '1px solid #d1d7e2'
            }}
          >
            <div style={{ borderLeft: '1px solid #d1d7e2', padding: '0px 10px' }}>
              <Avatar
                icon='user'
                style={{ backgroundColor: '#2c3e50', verticalAlign: 'middle' }}
                size='default'
              >
                {userName || ''}
              </Avatar>
            </div>
            <div style={{ color: '#2c3e50', maxWidth: 350, textOverflow: 'ellipsis', overflow: 'hidden', display: 'inline-block' }}>
              {userName || ''}
            </div>
          </Header>
          <Content style={{ minHeight: 'auto', backgroundColor: '#e4eaf6', padding: 20 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default connect((state) => {
  // return {
  //   user: state.user.user,
  //   userName: state.user.user
  //     ? state.user.user.user_name
  //     : 'N'
  // }
  return (
    <div>Test</div>
  )
})(withRouter(MenuPage))
