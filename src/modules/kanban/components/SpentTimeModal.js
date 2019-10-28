import React, { Component } from 'react'
import { Input, Select, Form } from 'antd'

const { Option } = Select

class SpentTimeModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      estimated: {
        time: 0,
        unitsTime: 'hour'
      },
      spent: {
        time: 0,
        unitsTime: 'hour'
      }
    }
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleUnitsTimeChange = this.handleUnitsTimeChange.bind(this)
  }

  handleTimeChange (value, e) {
    const time = parseInt(e.target.value || 0, 10)
    if (isNaN(time)) {
      return
    }
    this.setState({
      [value]: {
        time,
        ...[value]
      }
    })
  }

  handleUnitsTimeChange (value, unitsTime) {
    this.setState({
      [value]: {
        ...[value],
        unitsTime
      }
    })
  }

  render () {
    const { size, form: { getFieldDecorator } } = this.props
    const { estimated, spent } = this.state
    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSubmit}>
          <Form.Item label='Estimated time'>
            {getFieldDecorator('Estimated', {
              initialValue: { time: 0, unitsTime: 'hour' },
              rules: [{ validator: this.checkTime }]
            })(
              <>
                <Input
                  type='text'
                  size={size}
                  value={estimated.time}
                  onChange={(e) => this.handleTimeChange('estimated', e)}
                  style={{ width: '20%', marginRight: '3%' }}
                />
                <Select
                  value={estimated.unitsTime}
                  size={size}
                  style={{ width: '32%' }}
                  onChange={(e) => this.handleUnitsTimeChange('estimated', e)}
                >
                  <Option value='hour'>Hour</Option>
                  <Option value='day'>Day</Option>
                  <Option value='week'>Week</Option>
                  <Option value='month'>Month</Option>
                </Select>
              </>
            )}
          </Form.Item>
          <Form.Item label='Spent time'>
            {getFieldDecorator('spent', {
              initialValue: { spentTime: 0, spentUnitsTime: 'hour' },
              rules: [{ validator: this.checkTime }]
            })(
              <>
                <Input
                  type='text'
                  size={size}
                  value={spent.time}
                  onChange={(e) => this.handleTimeChange('spent', e)}
                  style={{ width: '20%', marginRight: '3%' }}
                />
                <Select
                  value={spent.unitsTime}
                  size={size}
                  style={{ width: '32%' }}
                  onChange={(e) => this.handleUnitsTimeChange('spent', e)}
                >
                  <Option value='hour'>Hour</Option>
                  <Option value='day'>Day</Option>
                  <Option value='week'>Week</Option>
                  <Option value='month'>Month</Option>
                </Select>
              </>
            )}
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'customized_form_controls' })(SpentTimeModal)
