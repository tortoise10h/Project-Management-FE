import React, { Component } from 'react'
import LabelsModal from './LabelModal'
import AddLabelModal from './AddLabelModal'

class LabelListModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      labels: []
    }
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

  async addLabel (color, title) {
    const { addLabel, project: { id } } = this.props
    const result = await addLabel(id, color, title)
    if (result.id) {
      this.getLabelList()
    }
  }

  async deleteLabel () {}

  componentDidMount () {
    this.getLabelList()
  }

  render () {
    const { labels } = this.state
    const { updateLabel, getLabel } = this.props
    return (
      <>
        <div className='list-label' style={{ maxHeight: '100%', height: 'auto', overflowY: 'auto' }}>
          {
            labels && labels.map((label) => (
              <LabelsModal key={label.id} content={label} updateLabel={updateLabel} getLabel={getLabel} />
            ))
          }
        </div>
        <AddLabelModal addLabel={this.addLabel} />
      </>
    )
  }
}

export default LabelListModal
