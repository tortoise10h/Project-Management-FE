import React, { Component } from 'react'
import { Table, Divider, Tag, Icon } from 'antd'
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
const { Column } = Table
class TableMode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: []
    }
    this.handlePaging = this.handlePaging.bind(this)
    this.handleFavorite = this.handleFavorite.bind(this)
  }

  handlePaging (pagination) {
    const { onPaging } = this.props
    onPaging(pagination.current)
  }

  handleFavorite (id, record) {
    const { onFavorite } = this.props
    const { projects } = this.state
    projects[record].is_favorite = !projects[record].is_favorite
    onFavorite(id, projects[record].is_favorite)
    this.setState({
      projects
    })
  }

  componentDidMount () {
    this.setState({
      projects: this.props.projects
    })
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      projects: newProps.projects
    })
  }

  render () {
    const { pagination } = this.props
    const { projects } = this.state
    return (
      <ReactCSSTransitionGroup
        transitionName='project-list-table'
        transitionAppear={!false}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Table
          rowKey='id'
          expandedRowRender={projects => <p style={{ margin: 0 }}>{projects.description}</p>}
          dataSource={projects}
          pagination={pagination}
          onChange={this.handlePaging}
        >
          <Column title='Title' dataIndex='title' key='title' />
          <Column title='Status' dataIndex='status' key='status' />
          <Column title='User Role' dataIndex='user_role' key='user_role' />
          <Column
            title='Created By'
            dataIndex='Users'
            key='created_by'
            render={(Users, rowKey) => (
              <span>
                {
                  <Tag color='blue' key={Users[0].id + '-' + rowKey.id}>
                    {Users[0].name}
                  </Tag>
                }
              </span>
            )}
          />
          <Column
            title='Member'
            dataIndex='Users'
            key='member'
            render={(Users, rowKey) => (
              <span>
                {Users.slice(1, 3).map(User => (
                  <Tag key={Users.id + '-' + rowKey.id}>
                    {User.name}
                  </Tag>
                ))}
                {
                  Users && Users.length > 4
                    ? (
                      <Tag>
                          More
                      </Tag>
                    ) : null
                }
              </span>
            )}
          />
          <Column
            title='Action'
            dataIndex='is_favorite'
            key='is_favorite'
            render={(favorited, rowkey, e) => (
              <span className='favorite'>
                <Icon
                  onClick={() => this.handleFavorite(rowkey.id, e)}
                  type='heart'
                  className={favorited ? 'filled' : ''}
                  theme={favorited ? 'filled' : ''}
                  style={{ fontSize: 20, paddingLeft: '10px', transition: 'all 0.3s ease-in' }}
                />
                <Divider type='vertical' />
                <Link to={'/project-kanban/' + rowkey.id}>
                  <span>More</span>
                </Link>
              </span>
            )}
          />
        </Table>
      </ReactCSSTransitionGroup>
    )
  }
}

export default TableMode
