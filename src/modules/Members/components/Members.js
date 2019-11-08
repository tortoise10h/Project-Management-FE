import React from 'react'
import { Select, Input, Button, notification } from 'antd'
import checkError from '../../../libraries/CheckError'

const { Option } = Select
const { TextArea } = Input

class Members extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Members: [],
      totalRecord: 0,
      totalPage: 0,
      userIds: [],
      invitationMessage: 'I\'m working on this project in Banana Boys and wanted to share it with you!',
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.getMembersNotInProject = this.getMembersNotInProject.bind(this)
    this.handleInvite = this.handleInvite.bind(this)
    this.handleOnChangeMessage = this.handleOnChangeMessage.bind(this)
    this.handleLoading = this.handleLoading.bind(this)
  }

  /* Add member for project */
  async handleInvite () {
    this.setState({
      loading: true
    })
    const { addMembers, project: { id }, getProjectInfo } = this.props
    const { userIds, invitationMessage } = this.state
    const result = await addMembers(id, userIds, invitationMessage)
    if (result.error) {
      this.setState({
        loading: false
      })
      const errors = result.error
      checkError(errors.error)
    } else {
      notification.success({
        message: 'Add Members Success',
        placement: 'topRight'
      })
      await getProjectInfo(id)
    }
  }
  /* end Add member for project */

  /* get value of messeage */
  handleOnChangeMessage (e) {
    console.log(e.target.value)
    this.setState({
      invitationMessage: e.target.value
    })
  }
  /* end get value of messeage */

  /* get userIds of members when select change */
  handleChange (value) {
    this.setState({
      userIds: value
    })
  }
  /* end get userIds of members when select change */

  /* get list members not in project */
  async getMembersNotInProject () {
    const { getMembersNotInProject, project: { id } } = this.props
    const result = await getMembersNotInProject(id)
    this.setState({
      Members: result.data.data,
      totalRecord: result.data.totalRecord,
      totalPage: result.data.totalPage
    })
  }
  /* end get list members not in project */

  handleLoading () {
    this.setState({
      loading: true
    })
  }

  componentDidMount () {
    this.getMembersNotInProject()
  }

  render () {
    const { Members, invitationMessage } = this.state
    const children = Members.map(member => (
      <Option key={member.id} value={member.id} title={member.name}>{member.name}</Option>
    ))
    return (
      <div className='members' style={{ textAlign: 'center' }}>
        <Select
          autoFocus
          mode='multiple'
          style={{ width: '300px' }}
          placeholder='Email address or name'
          onChange={this.handleChange}
          optionFilterProp='title'
        >
          {children}
        </Select>
        <br />
        <TextArea
          onChange={this.handleOnChangeMessage}
          value={invitationMessage}
          rows={8}
          style={{ width: '300px', marginTop: 15 }}
        />
        <br />
        <Button
          loading={this.state.loading}
          onClick={this.handleInvite}
          type='primary'
          style={{ marginTop: 10 }}
        > Invite Members
        </Button>
      </div>
    )
  }
}
export default Members
