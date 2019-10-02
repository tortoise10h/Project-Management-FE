import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './css/layout.css'
import { Avatar, Layout, Menu, Icon, notification } from 'antd'
import storeAccessible from '../utils/storeAccessible'
import { clearAll } from '../actions/common'
import Sidebar from './SideBar'
import Myheader from './MyHeader'
// import AppProject from './project/App'
const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

notification.config({
  placement: 'bottomLeft'
})

const FULL_PAGES = ['/login']

class MenuPage extends React.Component {
  constructor(props) {
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
    this.handleClick = this.handleClick.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.changePage = this.changePage.bind(this)
  }

  setMenus(mode, type) {
    switch (mode) {
      case '1':
        this.MENUS = [
          {
            key: 'dashboard',
            title: (
              <span>
                <Icon type='home' style={{ fontSize: 20 }} />
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
                  My Project
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

  changePage (e) {
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
    const { collapsed, sidebarWidth } = this.state
    const { children, history: { location }, userName } = this.props
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
            position: 'fixed',
            left: 0
          }}
        >
          <div className='logo'>
            <a id='logo' href='/' className={logoClass.join(' ')}>
              <img alt='logo' src='' />
              <img alt='Banana' src='' />
            </a>
          </div>
          <Menu
            onClick={this.handleClick}
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
          </Menu>
        </Sider>
        <Layout>
          <Myheader userName={userName} sidebarWidth={sidebarWidth} />
          <Content style={{ minHeight: 'auto', backgroundColor: '#e4eaf6', padding: 20, marginTop: 66 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default connect((state) => {
  return (
    <div>Test</div>
  )
})(withRouter(MenuPage))
