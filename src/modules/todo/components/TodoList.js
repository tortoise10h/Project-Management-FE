import React, { Component } from 'react'
import Loading from '../../../common/components/widgets/Loading'

class TodoList extends Component {
  componentDidMount () {
    const { getTodoList } = this.props
    getTodoList({})
  }

  render () {
    let { todo } = this.props
    todo = todo && Array.isArray(todo) ? todo : []

    return (
      <div>
        <ul>
          {todo && todo.map((item = {}, index) => (
            <li key={item.id || index}>{item.title || 'No Title'}</li>
          ))}
        </ul>
        <Loading />

      </div>
    )
  }
}

export default TodoList
