import React, { Component } from 'react'
import { Form, Avatar, Tag, Table, Select, Button, DatePicker } from 'antd'
import moment from 'moment-timezone'
import { LIMIT } from '../../models'
import { DEFAULT_URL } from '../../../../configs'

const { Option } = Select

class Log extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: [],
      totalRecord: 0,
      page: 1
    }
    this.logActions = {
      add: 'Add',
      update: 'Update',
      delete: 'Delete',
      moveTask: 'Move Task'
    }
    this.columns = [
      {
        render: values => {
          return (
            <>
              <Avatar
                shape='square'
                src={`${DEFAULT_URL}/${values.User.photo_location}`}
              />
            </>
          )
        }
      },
      {
        title: 'User',
        key: 'user-name',
        render: values => (
          <>
            <div>{values.User.name}</div>
          </>
        )
      },
      {
        title: 'Description',
        key: 'description',
        width: 500,
        render: values => {
          return <div>{values.description}</div>
        }
      },
      {
        title: 'Time',
        key: 'time',
        render: values => {
          return (
            <div>
              {moment(values.time_logged)
                .tz('Asia/Ho_Chi_Minh')
                .format('DD/MM/YYYY HH:mm:ss')}
            </div>
          )
        }
      },
      {
        title: 'Action',
        key: 'action',
        render: values => {
          /** Set color for each action */
          let actionColor
          switch (values.action) {
            case this.logActions.add: {
              actionColor = 'green'
              break
            }
            case this.logActions.update: {
              actionColor = 'purple'
              break
            }
            case this.logActions.delete: {
              actionColor = 'red'
              break
            }
            case this.logActions.moveTask: {
              actionColor = 'cyan'
              break
            }
            default:
              break
          }

          return (
            <div>
              <Tag color={actionColor}>{values.action}</Tag>
            </div>
          )
        }
      }
    ]

    this.handleTableChange = this.handleTableChange.bind(this)
    this.getLogData = this.getLogData.bind(this)
    this.handleSearchLog = this.handleSearchLog.bind(this)
  }

  async handleTableChange (pagination) {
    await this.getLogData(pagination.current)
  }

  async getLogData (nextPage) {
    const { page } = this.state
    const { getLogOfProject, form, kanban } = this.props
    const next = nextPage || page

    const params = {}
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        Object.keys(values).forEach((val) => {
          if (values[val] && values[val] !== 'none') {
            params[val] = values[val]
            if (val === 'from_date' || val === 'to_date') {
              params[val] = new Date(values[val])
            }
          }
        })
      }
    })

    const logData = await getLogOfProject(kanban.project.id, next, params)

    this.setState({
      logs: logData.data,
      totalRecord: logData.totalRecord,
      page: logData.page
    })
  }

  async handleSearchLog () {
    await this.getLogData(1)
  }

  async componentDidMount () {
    this.getLogData(1)
  }

  render () {
    const { logs, page, totalRecord } = this.state
    const { form, kanban } = this.props
    const { project } = kanban
    const { getFieldDecorator } = form

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            marginBottom: 20
          }}
        >
          <Form layout='inline'>
            <Form.Item>
              {getFieldDecorator('action', {
                initialValue: 'none'
              })(
                <Select
                  style={{
                    width: 100
                  }}
                >
                  <Option key='noaction' value='none'>
                    Action
                  </Option>
                  <Option key='add' value='Add'>
                    Add
                  </Option>
                  <Option key='update' value='Update'>
                    Update
                  </Option>
                  <Option key='delete' value='Delete'>
                    Delete
                  </Option>
                  <Option key='movetask' value='Move Task'>
                    Move Task
                  </Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('user_id', {
                initialValue: 'none'
              })(
                <Select
                  style={{
                    width: 200
                  }}
                >
                  <Option key='nouser' value='none'>
                    User
                  </Option>
                  {project.Users.map(user => (
                    <Option
                      key={user.id}
                      value={user.id}
                    >
                      {user.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('from_date', {

              })(
                <DatePicker
                  placeholder='From Date'
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('to_date', {

              })(
                <DatePicker
                  placeholder='To Date'
                  showTime
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                onClick={this.handleSearchLog}
              >
                Search
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Table
          style={{
            cursor: 'pointer'
          }}
          rowKey='id'
          columns={this.columns}
          dataSource={logs}
          scroll={{ x: true }}
          pagination={{
            current: page,
            total: totalRecord,
            pageSize: LIMIT
          }}
          onChange={this.handleTableChange}
        />
      </div>
    )
  }
}

export default Form.create({ name: 'log_list' })(Log)
