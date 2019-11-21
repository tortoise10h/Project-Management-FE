import React from 'react'
import { Select, Button, notification } from 'antd'
import Banner from '../../../assets/images/landingpage/banner1.png'
import checkError from '../../../libraries/CheckError'

const { Option } = Select

class MembersTask extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Members: [],
      isInTask: true,
      userIds: [],
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.getMembersNotInTask = this.getMembersNotInTask.bind(this)
    this.handleLoading = this.handleLoading.bind(this)
    this.handleAddMembers = this.handleAddMembers.bind(this)
  }

  /* ============================ GET LIST MEMBERS NOT IN PROJET -> MEMBER: []  ============================ */
  async getMembersNotInTask () {
    const { getMembersNotInTask, taskId } = this.props
    const result = await getMembersNotInTask(taskId)
    this.setState({
      Members: result.data
    })
  }
  /* ============================END GET LIST MEMBERS NOT IN PROJET -> MEMBER: []  ============================ */

  /* ============================ ADD MEMBERS TO TASK ============================ */
  async handleAddMembers () {
    this.setState({
      loading: true
    })
    const { addMembersInTask, taskId, onGetMembersInTask } = this.props
    const { userIds } = this.state
    const result = await addMembersInTask(taskId, userIds)
    if (result.error) {
      this.setState({
        loading: false
      })
      const errors = result.error
      checkError(errors.error)
    } else {
      this.setState({
        loading: false,
        userIds: []
      })
      onGetMembersInTask()
      notification.success({
        message: 'Add Members Success',
        placement: 'topRight'
      })
    }
  }
  /* ============================ END ADD MEMBERS TO TASK ============================ */

  componentDidMount () {
    this.getMembersNotInTask()
  }

  componentWillReceiveProps (nextProps) {
    this.getMembersNotInTask()
  }

  /* ============================ GET ARRAY USERIDS FROM SELECT ============================ */
  handleChange (value) {
    console.log(`select ${value}`)
    this.setState({
      userIds: value
    })
  }
  /* ============================ END GET ARRAY USERIDS FROM SELECT ============================ */

  /* ============================ FUNCTION LOANGDING WHEN SUMMIT ADD  ============================ */
  handleLoading () {
    this.setState({
      loading: true
    })
  }
  /* ============================ END FUNCTION LOANGDING WHEN SUMMIT ADD  ============================ */

  render () {
    const { Members, userIds } = this.state
    const children = Members.map(member => (
      <Option key={member.id} value={member.id} title={member.name}>{member.name}</Option>
    ))
    return (
      <div style={{ textAlign: 'center' }}>
        <Select
          mode='multiple'
          value={userIds}
          style={{ width: '300px' }}
          placeholder='Search Members'
          onChange={this.handleChange}
          optionFilterProp='title'
          // onSelect={(e) => this.setSelectValue(e)}
        >
          {children}
        </Select>
        <br />
        <img
          style={{ height: 300, width: 300 }}
          src={Banner}
          alt=''
        />
        <br />
        <Button
          loading={this.state.loading}
          onClick={this.handleAddMembers}
          type='primary'
        > Add Members
        </Button>
      </div>
    )
  }
}
export default MembersTask
