import React from 'react'
import {
  notification
} from 'antd'
import Board from 'react-trello'
import './css/kaban.css'
import MyCard from '../containers/MyCard'
import BananaTrelloCardForm from '../containers/BananaTrelloCardForm'
import BananaTrelloLaneForm from '../containers/BananaTrelloLaneForm'
import BananaTrelloAddCard from './BananaTrelloAddCard'
import BananaTrelloLaneSection from './BananaTrelloLaneSection'
import BananaTrelloLaneHeader from '../containers/BananaTrelloLaneHeader'
import CheckError from '../../../libraries/CheckError'

class Kanban extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        lanes: []
      }
    }
    notification.config({
      placement: 'topRight'
    })
    this.getKanbanData = this.getKanbanData.bind(this)
    this.addNewColumn = this.addNewColumn.bind(this)
    // this.addNewTask = this.addNewTask.bind(this)
    this.moveTask = this.moveTask.bind(this)
    this.updateColumn = this.updateColumn.bind(this)
    this.handleLockLane = this.handleLockLane.bind(this)
  }

  async handleLockLane (columnId, isLocked) {
    const { getKanbanInfo, projectId } = this.props
    const kanbanInfo = await getKanbanInfo(projectId)
    this.setData(kanbanInfo)
  }

  setData (newData) {
    const allColumnsInfo = {}
    allColumnsInfo.lanes = newData.map((column) => {
      /** Get column info */
      const columnInfo = {
        id: column.id,
        title: column.title,
        label: column.Tasks.length,
        style: {
          width: 280
        },
        droppable: !column.is_locked
      }
      /** Get tasks of column */
      const tasksInfo = column.Tasks.map(task => (
        {
          id: task.id,
          title: task.title,
          description: task.description,
          index: task.index
        }
      ))
      columnInfo.cards = tasksInfo
      return columnInfo
    })
    this.setState({ data: allColumnsInfo })
  }

  async addNewColumn (params) {
    const { addColumn, projectId } = this.props
    const result = await addColumn(projectId, {
      title: params.title
    })
    if (result.success !== false) {
      notification.success({
        message: 'Add new column successfully'
      })
    } else {
      CheckError(result.error.error)
      await this.getKanbanData(projectId)
    }
  }

  async updateColumn (columnId, params) {
    const { updateColumn, projectId, getKanbanInfo } = this.props
    const result = await updateColumn(columnId, {
      title: params.title
    })
    if (result) {
      notification.success({
        message: 'Update column successfully'
      })
    } else {
      notification.error({
        message: 'Server error'
      })
      await getKanbanInfo(projectId)
    }
  }

  async moveTask (fromLaneId, toLaneId, taskId, newIndex) {
    /** because min value of card is 0 but sequelize cant't sort 0 value
     * so change min value to 1 by newIndex++
    * */
    newIndex++

    const { updateTask, updateTaskIndex, projectId, getKanbanInfo } = this.props
    const { data } = this.state
    const { lanes } = data
    const toColumnObject = lanes[lanes.findIndex(val => val.id === toLaneId)]
    const fromColumnObject = lanes[lanes.findIndex(val => val.id === fromLaneId)]

    let toColumnTasks
    let fromColumnTasks
    if (fromLaneId !== toLaneId) {
      /** If move task between 2 different columns */
      /** Generate new index of toLane column to make new space for new task */
      toColumnTasks = toColumnObject.cards.map((task) => {
        const taskWithNewIndex = {
          id: task.id
        }
        if (task.index >= newIndex) {
          /** If current task index is equal or greater than incoming task index
           * then increase them by one, because when new task come they have to go down 1
           * step in column to have free space for new task
          */
          taskWithNewIndex.index = ++task.index
        } else {
          /** If current task index is lower than incoming task index then just keep its index */
          taskWithNewIndex.index = task.index
        }
        return taskWithNewIndex
      })

      /** Generate new index of fromColumn because one task is gone */
      /** Remove moved task in from column to generate new index */
      fromColumnObject.cards.splice(fromColumnObject.cards.findIndex(val => val.id === taskId), 1)
      fromColumnTasks = fromColumnObject.cards.map((task, index) => {
        /** min index in DB is 1, so increase array index by 1 */
        index++
        const taskWithNewIndex = {
          id: task.id,
          index
        }
        return taskWithNewIndex
      })
    } else {
      /** If move task inside one column */
      /** Remove moved task in column tasks list to generate new index */
      toColumnObject.cards.splice(toColumnObject.cards.findIndex(val => val.id === taskId), 1)

      toColumnTasks = toColumnObject.cards.map((task, index) => {
        /** min index in DB is 1, so increase array index by 1 */
        index++
        const taskWithNewIndex = {
          id: task.id
        }
        /** Generate new index for the entire tasks, if their index is equal or greater than incoming task index
         * then increase them by 1 to have place for incoming task
         */
        if (index >= newIndex) {
          taskWithNewIndex.index = ++index
        } else {
          taskWithNewIndex.index = index
        }
        return taskWithNewIndex
      })
    }
    /* Update new tasks column and index */
    const result = await updateTask(taskId, {
      column_id: toLaneId,
      index: newIndex
    })
    /** If user moved task then update tasks in column index to show correct order */
    if (toColumnTasks.length > 0) {
      let tasksToUpdateIndex = [...toColumnTasks]
      if (fromColumnTasks && fromColumnTasks.length > 0) {
        tasksToUpdateIndex = [...tasksToUpdateIndex, ...fromColumnTasks]
      }
      await updateTaskIndex(tasksToUpdateIndex)
    }
    if (result.error) {
      CheckError(result.error)
      const data = await getKanbanInfo(projectId)
      this.setData(data)
    } else {
    }
  }

  async getKanbanData () {
    const { getKanbanInfo, getUserRole, getProjectInfo, projectId } = this.props
    const kanbanInfo = await getKanbanInfo(projectId)
    getUserRole(projectId)
    getProjectInfo(projectId)
    this.setData(kanbanInfo)
  }

  componentDidMount () {
    this.getKanbanData()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.kanban.kanbanInfo !== this.props.kanban.kanbanInfo) {
      this.setData(newProps.kanban.kanbanInfo)
    }
  }

  render () {
    const { projectId, kanban } = this.props
    return (
      <div>
        <div className='kanban'>
          <Board
            data={this.state.data}
            draggable
            editLaneTitle
            canAddLanes
            editable
            components={{
              LaneHeader: (e) => <BananaTrelloLaneHeader {...e} onLockLane={this.handleLockLane} />,
              NewLaneForm: (e) => <BananaTrelloLaneForm {...e} projectId={projectId} />,
              NewLaneSection: BananaTrelloLaneSection,
              NewCardForm: BananaTrelloCardForm,
              AddCardLink: BananaTrelloAddCard,
              Card: (e) => <MyCard {...e} projectId={projectId} user={kanban.user} />
            }}
            customCardLayout
            tagStyle={{ fontSize: '1em' }}
            // onLaneAdd={(params) => this.addNewColumn(params)}
            onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId, index) => this.moveTask(fromLaneId, toLaneId, cardId, index)}
            onLaneUpdate={(laneId, data) => this.updateColumn(laneId, data)}
          />
        </div>
      </div>
    )
  }
}

export default Kanban
