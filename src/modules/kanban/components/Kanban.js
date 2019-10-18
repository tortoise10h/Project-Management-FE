import React from 'react'
import {
  notification
} from 'antd'
import Board from 'react-trello'
import './css/kaban.css'
import MyCard from './MyCard'
import BananaTrelloCardForm from './BananaTrelloCardForm'
import BananaTrelloLaneForm from './BananaTrelloLaneForm'
import BananaTrelloAddCard from './BananaTrelloAddCard'
import BananaTrelloLaneSection from './BananaTrelloLaneSection'
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
    this.addNewTask = this.addNewTask.bind(this)
    this.moveTask = this.moveTask.bind(this)
    this.updateColumn = this.updateColumn.bind(this)
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
    }
    await this.getKanbanData(projectId)
  }

  async updateColumn (columnId, params) {
    const { updateColumn, projectId } = this.props
    const result = await updateColumn(columnId, {
      title: params.title
    })
    if (result) {
      notification.success({
        message: 'Update column successfully'
      })
      await this.getKanbanData(projectId)
    } else {
      notification.error({
        message: 'Server error'
      })
    }
  }

  async moveTask (fromLaneId, toLaneId, taskId, newIndex) {
    /** because min value of card is 0 but sequelize cant't sort 0 value
     * so change min value to 1 by newIndex++
    * */
    newIndex++

    const { updateTask, updateTaskIndex, projectId } = this.props
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
    if (result) {
      await this.getKanbanData(projectId)
    } else {
      notification.error({
        message: 'Move card error'
      })
    }
  }

  async addNewTask (columnId, taskData) {
    const { addTask, projectId } = this.props
    const result = await addTask(columnId, {
      title: taskData.title,
      description: taskData.description
    })
    if (result) {
      notification.success({
        message: 'Add new column successfully'
      })
      await this.getKanbanData(projectId)
    } else {
      notification.error({
        message: 'Server error'
      })
    }
  }

  async getKanbanData () {
    const { getKanbanInfo, getUserRole, getProjectInfo, projectId } = this.props
    const kanbanInfo = await getKanbanInfo(projectId)
    getUserRole(projectId)
    getProjectInfo(projectId)
    /** Define allColumnsInfo as an object because react-trello takes lanes property to use */
    const allColumnsInfo = {}
    allColumnsInfo.lanes = kanbanInfo.map((column) => {
      /** Get column info */
      const columnInfo = {
        id: column.id,
        title: column.title,
        label: column.Tasks.length,
        style: {
          width: 280
        }
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

  componentDidMount () {
    this.getKanbanData()
  }

  render () {
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
              NewLaneForm: BananaTrelloLaneForm,
              NewLaneSection: BananaTrelloLaneSection,
              NewCardForm: BananaTrelloCardForm,
              Card: MyCard,
              AddCardLink: BananaTrelloAddCard
            }}
            tagStyle={{ fontSize: '1em' }}
            onLaneAdd={(params) => this.addNewColumn(params)}
            onCardAdd={(card, laneId) => this.addNewTask(laneId, card)}
            onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId, index) => this.moveTask(fromLaneId, toLaneId, cardId, index)}
            onLaneUpdate={(laneId, data) => this.updateColumn(laneId, data)}
          />
        </div>
      </div>
    )
  }
}

export default Kanban

