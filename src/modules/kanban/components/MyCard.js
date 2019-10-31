import React, { Component } from 'react'
import { Row, Col, Icon, Popconfirm, Modal, Input, Tooltip } from 'antd'
import TaskModal from './TaskModal'
class MyCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      isEdit: false,
      taskTitle: '',
      labels: [],
      isChange: false
    }

    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.handleEditTaskTitle = this.handleEditTaskTitle.bind(this)
    this.handleUpdateTitle = this.handleUpdateTitle.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleGetLabelListInTask = this.handleGetLabelListInTask.bind(this)
    this.handleChangeTask = this.handleChangeTask.bind(this)
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
    const { getKanbanInfo, kanban: { project } } = this.props
    // Check it is something change ??
    if (isChange) {
      this.setState({
        visible: false,
        isChange: false
      })
      getKanbanInfo(project.id)
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

  async handleGetLabelListInTask () {
    const { getLabelListInTask, id } = this.props
    const result = await getLabelListInTask(id)
    this.setState({
      labels: result
    })
  }

  handleUpdateTitle () {
    const { id, updateTask, getKanbanInfo, kanban: { project } } = this.props
    const { taskTitle: title } = this.state
    updateTask(id, { title })
    getKanbanInfo(project.id)
    this.setState({
      isEdit: false
    })
  }

  componentDidMount () {
    const { title } = this.props
    this.setState({
      taskTitle: title
    })
    this.handleGetLabelListInTask()
  }

  render () {
    const { id, onDelete } = this.props
    // const LaneInfo = kanbanInfo.find(lane => lane.id === laneId)
    // const TaskInfo = LaneInfo.Tasks.find(task => task.id === id)
    const { visible, isEdit, taskTitle, labels } = this.state
    return (
      <>
        <div className='trello-card'>
          <Popconfirm
            title='Are you sure delete this task?'
            onConfirm={onDelete}
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
                    <span className='trello-card--labels-text' style={{ backgroundColor: label.color }}>
                      {label.title}
                    </span>
                  ) : null
                ))
              }
            </div>
            <div className='trello-card--title'>
              {taskTitle || 'Title'}
            </div>
            <Row className='trello-card--badges'>
              <Col
                className='trello-card--badges-item'
                style={{
                  backgroundColor: '#f5222e'
                }}
              >
                <span>
                  <Icon type='clock-circle' style={{ marginRight: 5, fontSize: 18 }} />
                </span>
                <span>
                  Due Date
                </span>
              </Col>
            </Row>
            <div className='trello-card--members'>
              <ul>
                <li>
                  <div className='trello-card--member'>
                    <img src={require('./../../../assets/images/landingpage/user/avatar1.png')} />
                  </div>
                </li>
                <li>
                  <div className='trello-card--member'>
                    <img src={require('./../../../assets/images/landingpage/user/avatar2.png')} />>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Modal
          maskClosable={false}
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
          <TaskModal taskId={id} labels={labels} onChange={this.handleChangeTask} onUpdateLabels={this.handleGetLabelListInTask} />
        </Modal>
      </>
    )
  }
}

export default MyCard
