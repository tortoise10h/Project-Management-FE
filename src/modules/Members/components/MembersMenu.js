import React from 'react'
import { Table, Input, Select, Popconfirm, Typography, notification, Modal } from 'antd'
import checkError from '../../../libraries/CheckError'

const { Search } = Input
const { Option } = Select
const { Text } = Typography
const { confirm } = Modal

notification.config({
  placement: 'topRight'
})
class MembersMenu extends React.Component {
  constructor (porps) {
    super(porps)
    this.state = {
      data: [{
        user_id: '',
        name: '',
        phone: '',
        email: ''
      }
      ],
      role: [{
        role: ''
      }]
    }
    this.getListMemberProject = this.getListMemberProject.bind(this)
    this.getProjectInfo = this.getProjectInfo.bind(this)
    this.handleRemoveMember = this.handleRemoveMember.bind(this)
    this.handleChangeRoleMember = this.handleChangeRoleMember.bind(this)
  }

  /* get thong tin Role member */
  async getListMemberProject () {
    const { getListMemberProject, project: { id } } = this.props
    const result = await getListMemberProject(id)
    this.setState({
      role: result.data.data
    })
  }
  /* End get thong tin Role member */

  /* get thong tin member */
  async getProjectInfo (projectId) {
    const { getProjectInfo, project: { id } } = this.props
    const result = await getProjectInfo(projectId || id)
    this.setState({
      data: result.Users
    })
  }
  /* End get thong tin member */

  /* Remove Member Project */
  async handleRemoveMember (userId) {
    const { removeMemberProject, project: { id } } = this.props
    const result = await removeMemberProject(id, userId)
    if (result.data) {
      this.getListMemberProject()
      this.getProjectInfo()
      notification.success({
        message: result.data,
        placement: 'topRight'
      })
    } else {
      const errors = result.error
      checkError(errors.error)
    }
  }
  /* End Remove Member Project */

  /* Update Role Member Project */
  handleChangeRoleMember (userId, userRole) {
    const { updateRoleMemberProject, project: { id } } = this.props
    confirm({
      title: 'Do you want to change these items?',
      content: 'When clicking the OK button, the member\'s role will change ',
      onOk: async () => {
        console.count()
        try {
          await updateRoleMemberProject(id, userId, userRole)
          this.getListMemberProject()
          notification.success({
            message: 'Change Role Success'
          })
        } catch (error) {
        }
      },
      onCancel () {}
    })
  }
  /* End Update Role Member Project */

  componentDidMount () {
    const { project } = this.props
    this.getListMemberProject()
    this.setState({
      data: project.Users
    })
  }

  componentWillReceiveProps (newProps) {
    const { project } = newProps
    this.getListMemberProject()
    this.setState({
      data: project.Users
    })
  }

  render () {
    const { data, role } = this.state
    const { project: { owner } } = this.props
    const { user: { id } } = this.props
    const result = [data, role].reduce((a, b) => a.map((c, i) => Object.assign({}, c, b[i])))
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Permission',
        key: 'role',
        dataIndex: 'role',
        render: (text, record) => (
          id === owner ? (
            record.role === 'Admin' ? (
              <Text style={{ marginLeft: 20 }}> {text} </Text>
            ) : (
              <Select
                value={text}
                style={{ width: 120, marginLeft: 15 }}
                onChange={(e) => this.handleChangeRoleMember(record.id, e)}
              >
                <Option value='Leader'>Leader</Option>
                <Option value='Member'>Member</Option>
              </Select>
            )
          ) : ((
            <Text style={{ marginLeft: 20 }}>{text}</Text>
          )
          )
        )
      }
    ]
    if (id === owner) {
      const action = {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => (
          this.state.data.length >= 1 ? (
            <Popconfirm title='Sure to delete?' onConfirm={() => this.handleRemoveMember(record.user_id)}>
              <Text style={{ cursor: 'pointer' }} type='danger'>Delete</Text>
            </Popconfirm>
          ) : null
        )
      }
      columns.push(action)
    }
    return (
      <div>
        <Table
          columns={columns}
          dataSource={result}
          bordered
          scroll={{ x: true }}
          title={() =>
            <div>
              <Search
                placeholder='Search by name or email'
                onSearch={value => console.log(value)}
                style={{ width: '35%' }}
              />
              <Select defaultValue='All role' style={{ width: 120, marginLeft: 15 }}>
                <Option value='owner'>Owner</Option>
                <Option value='leader'>Leader</Option>
                <Option value='member'>Member</Option>
              </Select>
            </div>}
        />
      </div>
    )
  }
}
export default MembersMenu
