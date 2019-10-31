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
    const { getLabelList, projectId, project } = this.props
    /** If project object exists that's mean this component was call by another team made component
     * then get id of project from it
     * else that's mean React-Trello called it than use projectId from generalize component
     */
    const idOfProject = project.id || projectId
    const result = await getLabelList(idOfProject)
    this.setState({
      labels: result.data
    })
  }

  getLabelListInTask () {
    const { labels } = this.props
    this.setState({
      labels: labels
    })
  }

  async addLabel (color, title) {
    const { onUpdateLabelInTask, inTask, addLabel, projectId, project } = this.props
    /** If project object exists that's mean this component was call by another team made component
     * then get id of project from it
     * else that's mean React-Trello called it than use projectId from generalize component
     */
    const idOfProject = project.id || projectId
    const result = await addLabel(idOfProject, color, title)
    if (result.id) {
      inTask ? onUpdateLabelInTask() : this.getLabelList()
    }
  }

  async deleteLabel () {}

  componentDidMount () {
    const { inTask } = this.props
    inTask ? this.getLabelListInTask() : this.getLabelList()
  }

  componentWillReceiveProps (nextProps) {
    const { inTask, labels } = nextProps
    if (inTask && labels) {
      const { labels } = nextProps
      this.setState({
        labels: labels
      })
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
