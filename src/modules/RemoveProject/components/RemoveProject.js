import React from 'react'
import { notification, Button, Icon, Modal } from 'antd'
import checkError from '../../../libraries/CheckError'
import './css/removeproject.css'

const { confirm } = Modal

class RemoveProject extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleMemberOutProject = this.handleMemberOutProject.bind(this)
  }

  handleMemberOutProject () {
    const { kanban, memberOutProject } = this.props
    const userId = kanban.user.user_id
    const projectId = kanban.project.id
    confirm({
      title: 'Are you sure with your decision?',
      content: 'When clicking the OK button, you will exit the project',
      onOk: async () => {
        try {
          const result = await memberOutProject(userId, projectId)
          if (result.error) {
            const errors = result.error
            checkError(errors.error)
          } else {
            notification.success({
              message: 'You are out of the project',
              placement: 'topRight'
            })
          }
        } catch (error) {
        }
      },
      onCancel () {}
    })
  }

  render () {
    return (
      <Button
        onClick={this.handleMemberOutProject}
        className='category arrow_box status-deadline'
        style={{ color: '#ffff' }}
      ><Icon type='logout' />Out Project
      </Button>
    )
  }
}
export default RemoveProject
