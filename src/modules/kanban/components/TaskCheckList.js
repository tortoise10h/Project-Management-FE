import React, { Component } from 'react'
import { Popover, Checkbox, Progress, Icon, Button, Input } from 'antd'
import checkError from '../../../libraries/CheckError'

class TaskCheckList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditAdd: false,
      checkProgress: 0,
      checkBoxEdit: null,
      checkboxs: [],
      valueTodos: [],
      todoTitle: '',

      visibleTodoOption: false
    }
    this.handleOnCheck = this.handleOnCheck.bind(this)
    this.handleEditAddOn = this.handleEditAddOn.bind(this)
    this.handleEditAddClose = this.handleEditAddClose.bind(this)

    this.handleSetNewTodo = this.handleSetNewTodo.bind(this)
    this.handleAddTodo = this.handleAddTodo.bind(this)
    this.handleSetTodo = this.handleSetTodo.bind(this)
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
    this.handleEditCheckBoxOff = this.handleEditCheckBoxOff.bind(this)
    this.handleEditCheckBoxOn = this.handleEditCheckBoxOn.bind(this)
  }

  handleSetNewTodo (e) {
    this.setState({
      todoTitle: e.target.value
    })
  }

  async handleSetTodo (e, todoId) {
    const { onSetTodo, getTaskInfo } = this.props
    const { checkboxs } = this.state
    const newCheckboxs = checkboxs
    const changeIndex = newCheckboxs.findIndex(checkbox => checkbox.id === todoId)
    newCheckboxs[changeIndex].title = e.target.value
    const result = await onSetTodo(todoId, { title: e.target.value })
    if (result.error) {
      checkError(result.error.error)
    } else {
      this.setState({
        checkboxs: newCheckboxs
      })
      this.handleEditCheckBoxOff()
      getTaskInfo()
    }
  }

  async handleOnCheck (e) {
    const { onCheckTodos, taskId, getTaskInfo } = this.props
    const result = await onCheckTodos(taskId, e)
    const { checkboxs } = this.state
    if (result.success) {
      this.setState({
        checkProgress: Math.floor((e.length / checkboxs.length) * 100),
        valueTodos: e
      })
      getTaskInfo()
    }
  }

  handleEditAddOn () {
    this.setState({
      isEditAdd: true
    })
  }

  handleEditAddClose () {
    this.setState({
      isEditAdd: false,
      todoTitle: ''
    })
  }

  componentDidMount () {
    const { checkboxs } = this.props
    const value = []
    checkboxs && checkboxs.map((checkbox) => (
      checkbox.status ? value.push(checkbox.id) : null
    ))
    this.setState({
      checkProgress: checkboxs ? Math.floor((value.length / checkboxs.length) * 100) : 0,
      checkboxs: checkboxs,
      valueTodos: value
    })
  }

  componentWillReceiveProps (nextProps) {
    const { checkboxs } = nextProps
    const value = []
    checkboxs && checkboxs.map((checkbox) => (
      checkbox.status ? value.push(checkbox.id) : null
    ))
    this.setState({
      checkProgress: checkboxs ? Math.floor((value.length / checkboxs.length) * 100) : 0,
      checkboxs: checkboxs,
      valueTodos: value
    })
  }

  async handleAddTodo () {
    const { onAddTodo, taskId, getTaskInfo } = this.props
    const { todoTitle, checkboxs } = this.state
    const result = await onAddTodo(taskId, todoTitle)
    if (result.id) {
      const checkbox = {
        id: result.id,
        title: result.title
      }
      const newCheckboxs = checkboxs.concat(checkbox)
      this.setState({
        todoTitle: '',
        checkboxs: newCheckboxs,
        checkProgress: Math.floor((this.state.valueTodos.length / newCheckboxs.length) * 100)
      })
    }
    this.setState({
      todoTitle: ''
    })
    getTaskInfo()
  }

  handleEditCheckBoxOn (todoId) {
    this.setState({
      checkBoxEdit: todoId
    })
  }

  handleEditCheckBoxOff () {
    this.setState({
      checkBoxEdit: null
    })
  }

  async handleDeleteTodo (todoId) {
    const { onDeleteTodo, getTaskInfo } = this.props
    const { checkboxs, valueTodos } = this.state
    const result = await onDeleteTodo(todoId)
    if (result.id) {
      const newCheckboxs = checkboxs.filter(checkbox => checkbox.id !== result.id)
      const newValueTodos = valueTodos.filter(value => value !== result.id)
      if (newCheckboxs.length === 0 ) {
        getTaskInfo()
      }
      this.setState({
        checkboxs: newCheckboxs,
        valueTodos: newValueTodos,
        checkProgress: newCheckboxs.length > 0 ? Math.floor((newValueTodos.length / newCheckboxs.length) * 100) : 0
      })
      getTaskInfo()
    } else {
      checkError(result.error.error)
    }
  }

  render () {
    const { checkProgress, checkboxs, isEditAdd, todoTitle, valueTodos, checkBoxEdit } = this.state
    return (
      <div>
        <Progress percent={checkProgress} style={{ marginBottom: 10 }} />
        <Checkbox.Group value={valueTodos} style={{ width: '100%', marginBottom: 15 }} onChange={this.handleOnCheck}>
          {
            checkboxs && checkboxs.map((checkbox) => (
              <div key={checkbox.id} className='checklist-content'>
                <Checkbox
                  value={checkbox.id}
                  style={{ marginLeft: 10, width: 'calc(100% - 38px)' }}
                >
                  {
                    checkBoxEdit === checkbox.id
                      ? (
                        <Input
                          autoFocus
                          defaultValue={checkbox.title}
                          onBlur={this.handleEditCheckBoxOff}
                          onPressEnter={(e) => this.handleSetTodo(e, checkbox.id)}
                          style={{ width: '85%' }}
                        />
                      ) : (checkbox.title)
                  }
                </Checkbox>
                {
                  checkBoxEdit !== checkbox.id
                    ? (
                      <Popover
                        placement='right'
                        trigger='click'
                        title='Item Actions'
                        content={
                          <>
                            <div className='button-remove--member' onClick={() => this.handleEditCheckBoxOn(checkbox.id)} close>
                              Edit
                            </div>
                            <div className='button-remove--member' onClick={() => this.handleDeleteTodo(checkbox.id)}>
                              Delete
                            </div>
                          </>
                        }
                      >
                        <span className='button-edit-checklist' onClick={() => console.count()}><Icon type='ellipsis' /></span>
                      </Popover>
                    ) : null
                }
              </div>
            ))
          }
        </Checkbox.Group>
        {
          isEditAdd
            ? (
              <>
                <Input
                  value={todoTitle}
                  autoFocus
                  placeholder='Add another todo...'
                  style={{ marginBottom: 7 }}
                  onChange={this.handleSetNewTodo}
                  onPressEnter={this.handleAddTodo}
                />
                <div>
                  <Button type='primary' style={{ marginRight: 13 }} onClick={this.handleAddTodo}>Add</Button>
                  <Icon type='close' onClick={this.handleEditAddClose} />
                </div>
              </>
            ) : (
              <Button onClick={this.handleEditAddOn}>Add an item</Button>
            )
        }
      </div>
    )
  }
}

export default TaskCheckList
