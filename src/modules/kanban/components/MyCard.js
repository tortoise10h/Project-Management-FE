import React, { Component } from 'react'
import { Row, Col, Icon, Popconfirm, Modal, Input, Tooltip, notification } from 'antd'
import TaskModal from './TaskModal'
import moment from 'moment'
import checkError from '../../../libraries/CheckError'
class MyCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      isEdit: false,
      taskTitle: 'Title',
      MembersInTask: [],
      labels: [],
      data: [],
      isChange: false
    }

    this.setDueDate = this.setDueDate.bind(this)
    this.onDelete = this.onDelete.bind(this)

    this.getTaskInfo = this.getTaskInfo.bind(this)

    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.handleEditTaskTitle = this.handleEditTaskTitle.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleGetLabelListInTask = this.handleGetLabelListInTask.bind(this)
    this.handleChangeTask = this.handleChangeTask.bind(this)
    this.handleUpdateTitle = this.handleUpdateTitle.bind(this)
    this.handleUpdateDueDate = this.handleUpdateDueDate.bind(this)
    this.handleUpdateDescription = this.handleUpdateDescription.bind(this)
    this.handleAddTodoInModal = this.handleAddTodoInModal.bind(this)

    this.getMembersInTask = this.getMembersInTask.bind(this)
    this.handleRemoveMemberInTask = this.handleRemoveMemberInTask.bind(this)

    this.handleUpdateEstimateTime = this.handleUpdateEstimateTime.bind(this)
  }

  async getTaskInfo () {
    const { id, getTaskInfo } = this.props
    const result = await getTaskInfo(id)
    this.setState({
      taskTitle: result.title || 'Title',
      data: result
    })
  }

  // When Something change in Task
  handleChangeTask () {
    this.setState({
      isChange: true
    })
  }

  handleShowModal () {
    this.setState({
      visible: true
    })
  }

  // On Close Modal
  handleCloseModal () {
    const { isChange } = this.state
    const { getKanbanInfo, projectId } = this.props
    // Check it is something change ??
    if (isChange) {
      this.setState({
        visible: false,
        isChange: false
      })
      getKanbanInfo(projectId)
    } else {
      this.setState({
        visible: false
      })
    }
  }

  setTitle (e) {
    this.setState({
      taskTitle: e.target.value
    })
  }

  // WHEN CLICK TO EDIT TITLE
  handleEditTaskTitle () {
    this.setState({
      isEdit: true
    })
  }

  handleCancel () {
    const { title } = this.props
    this.setState({
      taskTitle: title,
      isEdit: false
    })
  }

  // GET ALL LABELS IN TASK
  async handleGetLabelListInTask () {
    const { getLabelListInTask, id } = this.props
    const result = await getLabelListInTask(id)
    this.setState({
      labels: result
    })
  }

  // WHEN CHANGE TASK TITLE
  handleUpdateTitle () {
    const { id, updateTask } = this.props
    const { taskTitle: title } = this.state
    updateTask(id, { title })
    this.setState({
      isEdit: false,
      isChange: true
    })
  }

  // CHANGE DUE DATE
  handleUpdateDueDate (value) {
    const { id, updateTask } = this.props
    this.setState({
      data: {
        ...this.state.data,
        due_date: value
      }
    })
    updateTask(id, { due_date: value })
    this.setState({
      isChange: true
    })
  }

  // CHANGE DESCRIPTION
  handleUpdateDescription (desc) {
    const { id, updateTask } = this.props
    this.setState({
      data: {
        ...this.state.data,
        description: desc
      }
    })
    updateTask(id, { description: desc })
    this.setState({
      isChange: true
    })
  }

  // CHANGE EstimateTime
  handleUpdateEstimateTime (values) {
    const { estimated, spent } = values
    const { id, updateTask } = this.props
    this.setState({
      data: {
        ...this.state.data,
        estimated_time: estimated.time,
        estimated_time_unit: estimated.unitsTime,
        spent_time: spent.time,
        spent_time_unit: spent.unitsTime
      }
    })
    updateTask(id, {
      estimated_time: estimated.time,
      estimated_time_unit: estimated.unitsTime,
      spent_time: spent.time,
      spent_time_unit: spent.unitsTime
    })
    this.setState({
      isChange: true
    })
  }

  /* ============================ GET LIST MEMBERS  ============================ */
  async getMembersInTask () {
    const { getMembersInTask, id } = this.props
    const result = await getMembersInTask(id)
    this.setState({
      MembersInTask: result.data
    })
  }

  /* ============================ END GET LIST MEMBERS  ============================ */

  /* ============================ REMOVE MEMBER IN TASK  ============================ */
  async handleRemoveMemberInTask (userId) {
    const { removeMemberInTask, id } = this.props
    const result = await removeMemberInTask(id, userId, false)
    if (result.error) {
      const errors = result.error
      checkError(errors.error)
    } else {
      this.getMembersInTask()
      notification.success({
        message: 'Remove Members Success',
        placement: 'topRight'
      })
    }
  }

  async handleAddTodoInModal (value) {
    console.log('======== Bao Minh: MyCard -> handleAddTodoInModal -> value', value)
    const { addTodo, id } = this.props
    const result = await addTodo(id, value)
    if (result.error) {
      checkError(result.error.error)
    } else {
      this.getTaskInfo()
    }
  }

  componentDidMount () {
    const { id } = this.props
    this.getTaskInfo(id)
    this.getMembersInTask()
    this.handleGetLabelListInTask()
  }

  async onDelete () {
    const { onDelete, deleteTask, id } = this.props
    const result = await deleteTask(id)
    console.log('======== Bao Minh: MyCard -> onDelete -> result', result)
    if (result.error) {
      checkError(result.error.error)
    } else { onDelete() }
  }

  setDueDate (day, minutes) {
    let color = ''
    let title = ''
    if (day === 0) {
      if (minutes > 60) {
        color = '#61bd50'
        title = `In ${Math.floor(minutes / 60)} hours`
      } else {
        color = '#61bd50'
        title = `In ${minutes} min`
      }
    } else if (day > 0) {
      color = '#61bd50'
      title = `In ${day} day`
    } else {
      color = '#f5222e'
      title = `${-day} day ago`
    }
    return (
      <Row className='trello-card--badges'>
        <Col
          className='trello-card--badges-item'
          style={{
            backgroundColor: color
          }}
        >
          <span>
            <Icon type='clock-circle' style={{ marginRight: 5, fontSize: 18 }} />
          </span>
          <span>
            {title}
          </span>
        </Col>
      </Row>
    )
  }

  render () {
    const { id, projectId, addTodo, checkTodos, deleteTodo, setTodo, user } = this.props
    const { visible, isEdit, taskTitle, labels, data, MembersInTask } = this.state
    return (
      <div key='id'>
        <div className='trello-card'>
          <Popconfirm
            title='Are you sure delete this task?'
            onConfirm={this.onDelete}
            okText='Yes'
            cancelText='No'
          >
            <div className='trello-card--btn'>
              <Icon type='close' />
            </div>
          </Popconfirm>
          <div className='trello-card--content' onClick={this.handleShowModal}>
            <div className='trello-card--labels' style={{ width: '90%' }}>
              {
                labels.length > 0 && labels.map((label) => (
                  label.is_in_task ? (
                    <span key={label.id} className='trello-card--labels-text' style={{ backgroundColor: label.color }}>
                      {label.title}
                    </span>
                  ) : null
                ))
              }
            </div>
            <div className='trello-card--title'>
              {taskTitle || 'Title'}
            </div>
            {
              data && data.due_date
                ? (
                  this.setDueDate(moment(data.due_date).diff(moment(), 'days'), moment(data.due_date).diff(moment(), 'minutes'))
                ) : null
            }
            <div className='trello-card--members'>
              <ul>
                {
                  MembersInTask && MembersInTask.length > 0 && MembersInTask.map((member) => (
                    member.is_in_task ? (
                      <li key={member.id}>
                        <div className='trello-card--member'>
                          <img src={require('./../../../assets/images/landingpage/user/avatar1.png')} />
                        </div>
                      </li>
                    ) : null
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <Modal
          className='task-modal'
          visible={visible}
          footer={null}
          onCancel={this.handleCloseModal}
          width='60%'
          title={
            <span style={{ display: 'inline-block', width: '60%', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left', paddingLeft: 6 }} onClick={this.handleEditTaskTitle}>
              {
                isEdit
                  ? (
                    <Input
                      value={taskTitle}
                      autoFocus
                      onBlur={this.handleCancel}
                      onPressEnter={this.handleUpdateTitle}
                      onChange={(e) => this.setTitle(e)}
                    />
                  ) : (taskTitle.length > 21 ? (
                    <Tooltip title={taskTitle} placement='bottom'>
                      {taskTitle}
                    </Tooltip>
                  ) : (<>{taskTitle}</>))
              }
            </span>
          }
        >
          <TaskModal
            data={data}
            taskId={id}
            labels={labels}
            onChange={this.handleChangeTask}
            onUpdateLabels={this.handleGetLabelListInTask}
            // SETTING MEMBER IN TASK
            onRemoveMemberInTask={this.handleRemoveMemberInTask}
            getMembersInTask={this.getMembersInTask}
            MembersInTask={MembersInTask}
            projectId={projectId}
            onUpdateDuaDate={this.handleUpdateDueDate}
            onUpdateDescription={this.handleUpdateDescription}
            // SETTING TODO IN TASK
            onAddTodoInModal={this.handleAddTodoInModal}
            onAddTodo={addTodo}
            onCheckTodos={checkTodos}
            onSetTodo={setTodo}
            onDeleteTodo={deleteTodo}

            getTaskInfo={this.getTaskInfo}
            onUpdateEstimatedTime={this.handleUpdateEstimateTime}
            user={user}
          />
        </Modal>
      </div>
    )
  }
}

export default MyCard
