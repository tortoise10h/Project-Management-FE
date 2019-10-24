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
    console.log('======== Bao Minh: LabelListModal -> getLabelList -> result', result)
    this.setState({
      labels: result
    })
  }

  async addLabel (color, title) {
    console.log('======== Bao Minh: LabelListModal -> addLabel -> this.props', this.props)
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
    const { updateLabel } = this.props
    return (
      <>
        <div className='list-label' style={{ maxHeight: '100%', height: 'auto', overflowY: 'auto' }}>
          {
            labels && labels.map((label) => (
              <LabelsModal key={label.id} content={label} updateLabel={updateLabel} />
            ))
          }
        </div>
        <AddLabelModal addLabel={this.addLabel} />
      </>
    )
  }
}

export default LabelListModal
