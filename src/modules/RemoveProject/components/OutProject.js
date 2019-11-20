import React from 'react'
import { notification, Button, Icon, Modal } from 'antd'
import checkError from '../../../libraries/CheckError'
import './css/removeproject.css'
import storeAccessible from '../../../common/utils/storeAccessible'
import {
  setKanbanInfo,
  setUserRole,
  setProjectInfo
} from '../../../modules/kanban/actions'

const { confirm } = Modal

class OutProject extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleDeleteProject = this.handleDeleteProject.bind(this)
  }

  handleDeleteProject () {
    const { kanban, deleteProject } = this.props
    const userId = kanban.user.user_id
    const projectId = kanban.project.id
    confirm({
      title: 'Are you sure with your decision?',
      content: 'When clicking the OK button, you will delete the project',
      onOk: async () => {
        try {
          const result = await deleteProject(userId, projectId)
          if (result.error) {
            const errors = result.error
            checkError(errors.error)
          } else {
            this.props.history.push('/project')
            storeAccessible.dispatch(setKanbanInfo({}))
            storeAccessible.dispatch(setUserRole({}))
            storeAccessible.dispatch(setProjectInfo({}))
            notification.success({
              message: 'You have successfully deleted the project',
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
        onClick={this.handleDeleteProject}
        className='category arrow_box status-deadline'
        style={{ color: '#ffff' }}
      ><Icon type='delete' />Delete Project
      </Button>
    )
  }
}
export default OutProject
