import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './css/style.css'
import { Layout, Menu, Icon, notification, Row, Col, Popover, Dropdown, Badge, Typography, Tooltip, Tabs } from 'antd'
import storeAccessible from '../utils/storeAccessible'
import { clearAll } from '../actions/common'
import { Link } from 'react-router-dom'
import {
  setKanbanInfo,
  setUserRole,
  setProjectInfo
} from '../../modules/kanban/actions'
import MenuItem from 'antd/lib/menu/MenuItem'
import DrawerLayout from '../../modules/kanban/components/DrawerLayout'
// import { setKanbanInfo, clearAll } from './../../modules/kanban/actions'

const { Text, Title } = Typography
const { Header, Content, Sider } = Layout
const { TabPane } = Tabs
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
      sidebarWidth: 260,
      collapsedWidth: 80,
      breakpoint: false,
      // Drawer state
      drawerContent: '',
      popOverSettingVisible: false
    }
    this.MENUS = []
    if (props.kanban.user && props.kanban.user.id) {
      this.handleToggle(true)
      switch (props.kanban.user.role) {
        case 'Admin':
          this.setMenus('1', props.kanban.project)
          break
        default:
          this.setMenus('2', props.kanban.project)
      }
    } else {
      this.setMenus('10')
    }
    this.setHeader = this.setHeader.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleOnSelectMenuItem = this.handleOnSelectMenuItem.bind(this)
    this.handleSettingKanban = this.handleSettingKanban.bind(this)
    this.handleViewModeMobile = this.handleViewModeMobile.bind(this)
    this.handlePopOverSettingVisibleChange = this.handlePopOverSettingVisibleChange.bind(this)
  }

  setMenus (mode, value) {
    switch (mode) {
      // When USER click to a project
      case '1':
        this.MENUS = [
          {
            key: 'project',
            title: value.title,
            children: [
              {
                key: `project-kanban/${value.id}`,
                title: (
                  <span>
                    <Icon type='schedule' style={{ fontSize: 20 }} />
                    <span>
                      Kanban
                    </span>
                  </span>
                )
              },
              {
                key: 'setting',
                title: (
                  <span>
                    <Icon type='setting' style={{ fontSize: 20 }} />
                    <span>
                      Setting
                    </span>
                  </span>
                ),
                children: [
                  {
                    key: 'setting-members',
                    title: (
                      <span>
                        <Icon type='team' style={{ fontSize: 20 }} />
                        <span>
                          Members
                        </span>
                      </span>
                    )
                  },
                  {
                    key: 'setting-label',
                    title: (
                      <span>
                        <Icon type='bars' style={{ fontSize: 20 }} />
                        <span>
                          Labels
                        </span>
                      </span>
                    )
                  }
                ]
              }
            ]
          }
        ]
        break
      // USER IN PROJECT IS MEMBER
      case '2':
        this.MENUS = [
          {
            key: 'project',
            title: value.title,
            children: [
              {
                key: `project-kanban/${value.id}`,
                title: (
                  <span>
                    <Icon type='schedule' style={{ fontSize: 20 }} />
                    <span>
                      Kanban
                    </span>
                  </span>
                )
              }
            ]
          }
        ]
        break
      default:
        this.MENUS = []
        break
    }
  }

  setHeader (project, user) {
    if (project && project.id) {
      return (
        <Row type='flex' justify='center' align='middle'>
          <Col lg={{ span: 16 }} xl={{ span: 12 }}>
            <div>
              <span>
                <img
                  alt=''
                  src={project.photo_location || require('./../../assets/images/project_img.jpg')}
                  className='user-project'
                  style={{
                    float: 'left',
                    width: 40,
                    height: 40,
                    backgroundColor: '#64CCBD',
                    borderRadius: '50%',
                    marginRight: 10,
                    marginTop: 10
                  }}
                />
              </span>
              {
                project.title.length > 12
                  ? (
                    <Tooltip placement='bottom' title={project.title}>
                      <span style={{ display: 'inline-block', maxWidth: '150px', height: 40, fontSize: 20, fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {project.title}
                      </span>
                    </Tooltip>
                  )
                  : (
                    <span style={{ display: 'inline-block', maxWidth: '150px', height: 40, fontSize: 20, fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {project.title}
                    </span>
                  )
              }
              
              <Popover
                placement='bottom'
                title='Setting'
                trigger='click'
                visible={this.state.popOverSettingVisible}
                onVisibleChange={this.handlePopOverSettingVisibleChange}
                content={
                  // Get setting menu item from main menu in side bar
                  <Menu onClick={this.handleSettingKanban}>
                    {
                      this.MENUS.children && this.MENUS[0].children.find(x => x.key === 'setting').children.map((item) => (
                        <MenuItem key={item.key}>
                          {item.title}
                        </MenuItem>
                      ))
                    }
                  </Menu>
                }
              >
                <Tooltip placement='bottom' title='Setting'>
                  <Icon
                    className='kanban-settings'
                    type='setting'
                    style={{
                      fontSize: 21,
                      cursor: 'pointer',
                      float: 'right',
                      marginTop: 23,
                      marginRight: 12
                    }}
                  />
                </Tooltip>
              </Popover>
            </div>
          </Col>
          <Col
            lg={{ span: 8 }}
            xl={{ span: 12 }}
            style={{
              borderLeft: '2px solid #e8e8e8',
              borderRight: '2px solid #e8e8e8'
            }}
          >
            <Row type='flex' justify='center' align='middle'>
              {
                project.Users.slice(0, 2).map((user) => (
                  <Col span={6} key={user.id}>
                    <Tooltip placement='bottom' title={user.name}>
                      <img
                        alt=''
                        src={user.photo_location || require('./../../assets/images/landingpage/user/avatar2.png')}
                        className='user-project'
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: '#64CCBD',
                          borderRadius: '50%'
                        }}
                      />
                    </Tooltip>
                  </Col>
                ))
              }
              {
                user.id && user.role === 'Admin'
                  ? (
                    <Col span={6} key={project.Users.length}>
                      <Link to='/setting-members'>
                        <Tooltip placement='bottom' title='Add member'>
                          <Icon
                            type='plus'
                            style={{
                              width: 40,
                              height: 40,
                              backgroundColor: '#64CCBD',
                              borderRadius: '50%',
                              verticalAlign: 'middle',
                              fontSize: 20,
                              lineHeight: 2.17,
                              color: '#ffff',
                              cursor: 'pointer'
                            }}
                          />
                        </Tooltip>
                      </Link>
                    </Col>
                  )
                  : ''
              }
            </Row>
          </Col>
        </Row>
      )
    }
  }

  componentWillReceiveProps (nextProps) {
    const { kanban } = nextProps
    if (kanban.user && kanban.user.id) {
      switch (kanban.user.role) {
        case 'Admin':
          this.setMenus('1', kanban.project)
          break
        default:
          this.setMenus('2', kanban.project)
      }
      this.handleToggle(true)
    } else {
      this.setMenus('10')
    }
  }

  handlePopOverSettingVisibleChange (popOverSettingVisible) {
    this.setState({ popOverSettingVisible })
  }

  handleChangePage (e) {
    const { history } = this.props
    const item = this.MENUS.find(data => data.key === e.key)
    history.push(item.redirect)
  }

  handleToggle (value) {
    let { collapsed } = this.state
    collapsed = value || !collapsed
    const sidebarWidth = collapsed ? this.state.collapsedWidth : 260
    this.setState({ collapsed, sidebarWidth })
  }

  handleSettingKanban (value) {
    this.setState({
      drawerContent: value ? value.key : null,
      popOverSettingVisible: false
    })
  }

  handleViewModeMobile (broken) {
    const { collapsedWidth } = this.state
    this.setState({
      collapsedWidth: broken ? 0 : 80,
      sidebarWidth: broken ? collapsedWidth : 260,
      breakpoint: broken
    })
  }

  handleOnSelectMenuItem (value) {
    const { history, kanban } = this.props
    const { breakpoint } = this.state
    switch (value.key) {
      case 'logout':
        storeAccessible.dispatch(clearAll())
        setTimeout(() => {
          window.location.href = '/'
        }, 200)
        break
      case 'project':
      case 'dashboard':
      case `profile/${kanban.user.id}`:
        if (kanban) {
          storeAccessible.dispatch(setKanbanInfo({}))
          storeAccessible.dispatch(setUserRole({}))
          storeAccessible.dispatch(setProjectInfo({}))
        }
        history.push(`/${value.key}`)
        break
      default:
        history.push(`/${value.key}`)
        break
    }
    console.log('=========> TuLinh Debug: >: MenuPage -> handleOnSelectMenuItem -> breakpoint', breakpoint)
    if (breakpoint === true) {
      this.setState({
        collapsed: true
      })
    }
  }

  render () {
    const { collapsed, sidebarWidth, collapsedWidth, breakpoint, drawerContent } = this.state
    const { children, history: { location }, user, kanban } = this.props
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
          breakpoint='lg'
          onBreakpoint={broken => {
            this.setState({
              collapsedWidth: broken ? 0 : 80,
              sidebarWidth: broken ? collapsedWidth : 260,
              breakpoint: broken
            })
          }}
          collapsedWidth={collapsedWidth}
          className='side-bar'
          theme='light'
          width={sidebarWidth}
          collapsible
          collapsed={collapsed}
          onCollapse={this.handleToggle}
          style={{
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
            {this.MENUS.map(items => {
              return (
                <Menu.ItemGroup
                  key={items.key}
                  title={
                    <span style={collapsed ? { display: 'none' } : { display: 'block' }}>{items.title}</span>
                  }
                >
                  {items.children.map(item => {
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
              )
            })}
            <Menu.ItemGroup
              title={
                <span style={collapsed ? { display: 'none' } : { display: 'block' }}>PROJECTS</span>
              }
            >
              <Menu.Item key='dashboard'>
                <Icon type='bar-chart' />
                <span>Dashboard</span>
              </Menu.Item>
              <Menu.Item key='project'>
                <Icon type='project' />
                <span>My projects</span>
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup
              title={
                <span style={collapsed ? { display: 'none' } : { display: 'block' }}>ACCOUNT</span>
              }
            >
              <Menu.Item key={`profile/${user.id}`}>
                <Icon type='user' />
                <span>Profile</span>
              </Menu.Item>
              <Menu.Item key='logout'>
                <Icon type='logout' />
                <span>Sign out</span>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: breakpoint ? 0 : sidebarWidth, transition: 'all 0.2s' }}>
          <Header className='menuBar' style={{ width: breakpoint ? '100%' : 'calc(100% - ' + sidebarWidth + 'px)', padding: 0, position: 'fixed', zIndex: 10, transition: 'all 0.2s', boxShadow: '0 3px 8px -6px rgba(0,0,0,0.44)' }}>
            <Row type='flex' justify='center' align='middle'>
              <Col xs={{ span: 0 }} lg={{ span: 12, offset: 1 }} xl={{ span: 12, offset: 1 }} xxl={{ span: 8, offset: 1 }}>
                {this.setHeader(kanban.project, kanban.user)}
              </Col>
              <Col xs={{ span: 2 }} lg={{ span: 1, offset: 5 }} xl={{ span: 1, offset: 6 }} xxl={{ span: 1, offset: 9 }} className='right-menu-item'>
                <Popover
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
                      <Menu.Item key={`profile/${user.id}`}>
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
            {/* ================ SETTING KANBAN ON MAINLAYOUT =============== */}
            {
              location.pathname === `/project-kanban/${kanban.project.id}`
                ? <DrawerLayout content={drawerContent} onClose={this.handleSettingKanban} /> : null
            }
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default connect((state) => {
  return {
    kanban: state.kanban,
    user: state.user.user
  }
})(withRouter(MenuPage))
