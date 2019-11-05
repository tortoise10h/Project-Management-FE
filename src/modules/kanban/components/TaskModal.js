import React, { Component } from 'react'
import LabelsInTask from './LabelsInTask'
import LabelListModal from '../../labels/containers/LabelListModal'
import { Button, DatePicker, Popover, Row, Col, Typography, Icon, Checkbox, Progress, Tooltip, Input } from 'antd'
import SpentTimeModal from './SpentTimeModal'
import moment from 'moment'
import TaskDescription from './TaskDescription'
import ContentPopover from '../../MembersTask/containers/MembersTask'
import TaskCheckList from './TaskCheckList'
import { thisExpression } from '@babel/types'

const { Text } = Typography

export default class TaskModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      newTodoTitle: '',

      updateLabel: true,
      isInTask: false
    }
    this.listLabelInTask = <LabelListModal inTask taskId={props.taskId} onUpdateLabelInTask={props.onUpdateLabels} labels={props.labels} />
    this.AddToCards = {}
    this.setAddToCard()
    this.handleUpdateLabel = this.handleUpdateLabel.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleChangeNewTodoTitle = this.handleChangeNewTodoTitle.bind(this)
    this.listMembersInTask =
      <ContentPopover
        taskId={props.taskId}
        getMembersInTask={props.getMembersInTask}
        MembersInTask={props.MembersInTask}
      />
  }

  handleChangeNewTodoTitle (e) {
    this.setState({
      newTodoTitle: e.target.value
    })
  }

  setAddToCard () {
    this.AddToCards = [
      {
        key: 'members',
        icon: 'user',
        title: 'Members',
        popoverContent: this.listMembersInTask
      },
      {
        key: 'labels',
        icon: 'tag',
        title: 'Labels',
        popoverContent: this.listLabelInTask
      },
      {
        key: 'checkbox',
        icon: 'check-square',
        title: 'Checklist',
        popoverContent: (
          <>
            <Input
              autoFocus
              placeholder='Add another todo...'
              style={{ marginBottom: 7 }}
              onChange={this.handleChangeNewTodoTitle}
              onPressEnter={() => this.props.onAddTodoInModal(this.state.newTodoTitle)}
            />
            <Button onClick={() => this.props.onAddTodoInModal(this.state.newTodoTitle)}>Add</Button>
          </>
        )
      },
      {
        key: 'due date',
        icon: 'clock-circle',
        title: 'Due Date',
        popoverContent: (
          <DatePicker
            allowClear={false}
            format='YYYY-MM-DD HH:mm:ss'
            defaultValue={this.props.data.due_date ? moment(this.props.data.due_date) : moment()}
            showTime
            onOk={(e) => (
              this.props.onUpdateDuaDate(e)
            )}
          />
        )
      },
      {
        key: 'attachment',
        icon: 'paper-clip',
        title: 'Attachment',
        popoverContent: ''
      }
    ]
  }

  handleUpdateLabel (value) {
    const content = value || this.props
    this.listLabelInTask = <LabelListModal projectId={this.props.projectId} inTask taskId={content.taskId} onUpdateLabelInTask={content.onUpdateLabels} labels={content.labels} />
    this.setAddToCard()
  }

  handleShowModal () {
    this.setState({
      visible: true
    })
  }

  handleCloseModal () {
    this.setState({
      visible: false
    })
  }

  componentDidMount () {
    const { data } = this.props
    this.setState({
      dueDate: data.due_date
    })
  }

  componentWillReceiveProps (nextProps) {
    this.handleUpdateLabel(nextProps)
    this.setAddToCard()
  }

  setDueDateStatus (day, minutes) {
    let color = ''
    let title = ''
    if (day === 0) {
      if (minutes > 0) {
        if (minutes > 60) {
          color = '#61bd50'
          title = `In ${Math.floor(minutes / 60)} hours`
        } else {
          color = '#61bd50'
          title = `In ${minutes} min`
        }
      } else {
        if (minutes > 60) {
          color = '#61bd50'
          title = `${Math.floor(minutes / 60)} hours ago`
        } else {
          color = '#61bd50'
          title = `${minutes} min ago`
        }
      }
    } else if (day > 0) {
      color = '#61bd50'
      title = `In ${day} day`
    } else {
      color = '#e8968b'
      title = `${-day} day ago`
    }
    return (
      <span className='detail-box' style={{ background: color, textTransform: 'uppercase' }}>
        {title}
      </span>
    )
  }

  render () {
    const {
      taskId,
      labels,
      getMembersInTask,
      onUpdateLabels,
      onUpdateDescription,
      onAddTodo,
      onCheckTodos,
      onDeleteTodo,
      onSetTodo,
      onChange,
      data,
      MembersInTask,
      onRemoveMemberInTask,
      getTaskInfo
    } = this.props
    return (
      <div className='task-modal'>
        <Row>
          {/* ============================ TASK CONTENT  ============================ */}
          <Col md={{ span: 24 }} lg={{ span: 15 }} xl={{ span: 18 }}>
            <Row style={{ color: '#5e6c84' }}>
              {/* ============================ TASK MEMBER  ============================ */}
              <Col lg={{ span: 24 }} xl={{ span: 12 }}>
                <Text strong>MEMBERS</Text>
                <div className='task-content'>
                  <Row>
                    {
                      MembersInTask.map(member => (
                        member.is_in_task === true ? (
                          <Col md={{ span: 2 }} lg={{ span: 4 }}>
                            <Popover
                              trigger='click'
                              placement='bottom'
                              title={
                                <Row>
                                  <Col span={7}>
                                    <div
                                      style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(9,30,66,.04)'
                                      }}
                                    >
                                      <img
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          textAlign: 'center',
                                          objectFit: 'cover'
                                        }}
                                        src={require('./../../../assets/images/landingpage/user/avatar1.png')}
                                      />
                                    </div>
                                  </Col>
                                  <Col span={17}>
                                    <h3>{member.name}</h3>
                                    <Text>{member.email}</Text>
                                  </Col>
                                </Row>
                              }
                              content={
                                <div onClick={() => onRemoveMemberInTask(member.id)} className='button-remove--member'>
                                  Remove from task
                                </div>
                              }
                            >
                              <div className='trello-card--member'>
                                <img src={require('./../../../assets/images/landingpage/user/avatar1.png')} />
                              </div>
                            </Popover>
                          </Col>
                        ) : null
                      ))
                    }
                    <Col md={{ span: 2 }} lg={{ span: 4 }}>
                      <div className='trello-card--member' style={{ textAlign: 'center', lineHeight: '32px', color: '#ffff' }}>
                        <Popover
                          placement='right'
                          title='Add Members'
                          content={
                            <ContentPopover
                              taskId={taskId}
                              getMembersInTask={getMembersInTask}
                              MembersInTask={MembersInTask}
                            />
                          }
                          trigger='click'
                        >
                          <Tooltip placement='bottom' title='Add member'>
                            <Icon
                              type='plus'
                            />
                          </Tooltip>
                        </Popover>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              {/* ============================ TASK LABELS  ============================ */}
              <Col lg={{ span: 24 }} xl={{ span: 12 }}>
                <Text strong>LABELS</Text>
                <div className='task-content trello-card--labels'>
                  <LabelsInTask
                    taskId={taskId}
                    labels={labels}
                    listLabelInTask={this.listLabelInTask}
                    onUpdateLabels={onUpdateLabels}
                    onChange={onChange}
                  />
                </div>
              </Col>
            </Row>
            {/* ============================ TASK DUE DATE ============================ */}
            {
              data.due_date
                ? (
                  <Row>
                    <Text strong>DUE DATE</Text>
                    <div className='task-content due-date' style={{ marginLeft: 20 }}>
                      <Checkbox style={{ width: 30, height: 30 }} />
                      <DatePicker
                        format='YYYY-MM-DD HH:mm:ss'
                        defaultValue={data.due_date ? moment(data.due_date) : moment()}
                        showTime
                        onOk={(e) => this.props.onUpdateDuaDate(e)}
                        allowClear={false}
                      />
                      {this.setDueDateStatus(moment(data.due_date).diff(moment(), 'days'), moment(data.due_date).diff(moment(), 'minutes'))}
                    </div>
                  </Row>
                ) : null
            }
            {/* ============================ TASK SPENT TIME ============================ */}
            <Row>
              <Text strong>SPENT TIME</Text>
              <div className='task-content due-date' style={{ marginLeft: 20 }}>
                <span>
                  <SpentTimeModal />
                </span>
              </div>
            </Row>
            {/* ============================ TASK DESCRIPTION ============================ */}
            <Row>
              <div>
                <Icon type='menu' style={{ marginRight: 5 }} />
                <span style={{ fontWeight: 600 }}>Description</span>
              </div>
              <div className='task-content' style={{ marginLeft: 20 }}>
                <TaskDescription description={data.description} onUpdateDescription={onUpdateDescription} />
              </div>
            </Row>
            {/* ============================ TASK CHECK BOX ============================ */}
            {
              data.Todos && data.Todos[0]
                ? (
                  <Row>
                    <div>
                      <Icon type='check-square' style={{ marginRight: 5 }} />
                      <span style={{ fontWeight: 600 }}>Checklist</span>
                    </div>
                    <div className='task-content' style={{ marginLeft: 20 }}>
                      <TaskCheckList
                        taskId={taskId}
                        checkboxs={data.Todos}
                        onAddTodo={onAddTodo}
                        onCheckTodos={onCheckTodos}
                        onSetTodo={onSetTodo}
                        onDeleteTodo={onDeleteTodo}
                        getTaskInfo={getTaskInfo}
                      />
                    </div>
                  </Row>
                ) : null
            }
          </Col>
          {/* ============================ TASK OPTION  ============================ */}
          <Col md={{ span: 24 }} lg={{ span: 8, offset: 1 }} xl={{ span: 5, offset: 1 }}>
            <Text strong>ADD TO CARD</Text>
            {
              this.AddToCards.map((AddToCard) => (
                <div key={AddToCard.key}>
                  <Popover
                    onVisibleChange={AddToCard.handle || onUpdateLabels}
                    overlayStyle={{
                      width: 350
                    }}
                    placement='leftTop'
                    trigger='click'
                    title={
                      <>
                        <span>{AddToCard.title}</span>
                      </>
                    }
                    content={AddToCard.popoverContent || 'Content'}
                  >
                    <div className='button-add-to-card'>
                      <span style={{ marginRight: 10 }}>
                        <Icon type={AddToCard.icon} />
                      </span>
                      <span>
                        {AddToCard.title}
                      </span>
                    </div>
                  </Popover>
                </div>
              ))
            }
          </Col>
        </Row>
      </div>
    )
  }
}
