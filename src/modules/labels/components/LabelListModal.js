import React, { Component } from 'react'
import LabelsModal from './LabelModal'
import LabelsModalInTask from './LabelModalInTask'
import AddLabelModal from './AddLabelModal'

class LabelListModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      labels: []
    }
    this.getLabelListInTask = this.getLabelListInTask.bind(this)
    this.getLabelList = this.getLabelList.bind(this)
    this.addLabel = this.addLabel.bind(this)
  }

  async getLabelList () {
    const { getLabelList, project: { id } } = this.props
    const result = await getLabelList(id)
    this.setState({
      labels: result.data
    })
  }

  async getLabelListInTask () {
    const { getLabelListInTask, taskId } = this.props
    const result = await getLabelListInTask(taskId)
    this.setState({
      labels: result
    })
  }

  async addLabel (color, title) {
    const { inTask, addLabel, project: { id } } = this.props
    const result = await addLabel(id, color, title)
    if (result.id) {
      inTask ? this.getLabelListInTask() : this.getLabelList()
    }
  }

  async deleteLabel () {}

  componentDidMount () {
    const { inTask } = this.props
    inTask ? this.getLabelListInTask() : this.getLabelList()
  }

  componentWillReceiveProps (nextProps) {
    const { inTask, updateLabel } = nextProps
    if (inTask && updateLabel) {
      this.getLabelListInTask()
    }
  }

  render () {
    const { labels } = this.state
    const { updateLabel, getLabel, inTask, updateLabelInTask, taskId } = this.props
    return (
      <>
        <div className='list-label' style={{ maxHeight: '100%', height: 'auto', overflowY: 'auto' }}>
          {
            labels && labels.map((label) => (
              inTask
                ? (<LabelsModalInTask taskId={taskId} key={label.id} content={label} updateLabel={updateLabel} updateLabelInTask={updateLabelInTask} getLabel={getLabel} />)
                : (<LabelsModal taskId={taskId} key={label.id} content={label} updateLabel={updateLabel} getLabel={getLabel} />)
            ))
          }
        </div>
        <AddLabelModal addLabel={this.addLabel} />
      </>
    )
  }
}

export default LabelListModal
