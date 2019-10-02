import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import storeAccessible from '../utils/storeAccessible'
import { clearAll } from '../actions/common'
// import logo from './../asset/image/logo.svg'
// import banana from './../asset/image/banana-boy.svg'

const { Sider } = Layout;
const { SubMenu } = Menu;

const menuItems =
  [
    {
      key: 'dashboard',
      icon: 'bar-chart',
      title: 'Dash Board',
      notice: false,
    },
    {
      key: 'project',
      icon: 'project',
      title: 'My Projects',
      notice: true,
    }
  ]

export default class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleOnCollapse = this.handleOnCollapse.bind(this)
  }

  componentDidMount () {

  }

  componentWillUnmount () {
  }

  // Get Screen Width

  handleOnCollapse () {
    this.props.handleCollapse()
  };

  focusSearch () {
    this.nameInput.focus()
  }

  changeLogoStyle () {
    const collapsed = this.state.collapsed
    if (collapsed) {

    }
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
    // const { location } = this.props
    const { collapsed, width, MENUS, history: { location } } = this.props
    // console.log('======== Bao Minh debug :>: Sidebar -> render -> location', location)
    let logoClass = ['my-logo']
    let menuGroupClass = ['menu-item-group']
    if (collapsed) {
      logoClass.push('collapse')
    }
    else {
      menuGroupClass.push('non-collapse')
    }
    return (
      <Sider
        // {...this.state.width < 700 ? 'breakpoint='lg' collapsedWidth='0'' : '' }
        className='side-bar'
        theme='light'
        width={width}
        collapsible
        collapsed={collapsed}
        onCollapse={this.handleOnCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}>
        <div className='logo'>
          <a id='logo' href='/' className={logoClass.join(' ')}>
            <img alt='logo' src='' />
            <img alt='Banana' src='' />
          </a>
        </div>
        <Menu
          theme='light'
          defaultSelectedKeys={['dashboard']}
          selectedKeys={[this.props.location.pathname.replace('/', '')]}
          mode='inline'>
          <Menu.ItemGroup key='g1' title={
            <span style={collapsed ? { display: 'none' } : { display: 'block' }}>PROJECTS</span>
          }>
            {/* {menuItems.map((menuItem) => (
              <Menu.Item key={menuItem.key}>
                <Link to={'/' + menuItem.key}>
                  <Icon type={menuItem.icon} style={{ fontSize: 20 }} />
                  <span>
                    {menuItem.title}
                  </span>
                </Link>
              </Menu.Item>
            ))} */}
            {MENUS.map(item => {
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
    )
  }
}
