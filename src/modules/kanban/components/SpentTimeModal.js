import React, { Component } from 'react'
import { Input, Select, Form, Button, Icon, notification } from 'antd'

const { Option } = Select

class SpentTimeModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      estimated: {
        time: 0,
        unitsTime: 'Minute'
      },
      spent: {
        time: 0,
        unitsTime: 'Minute'
      },
      isSave: false
    }
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleUnitsTimeChange = this.handleUnitsTimeChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleUpdateEstimateTime = this.handleUpdateEstimateTime.bind(this)
  }

  handleTimeChange (value, e) {
    const time = parseInt(e.target.value || 0, 10)
    if (isNaN(time)) {
      return
    }
    const myTime = this.state[value]
    myTime.time = time
    this.setState({
      [value]: myTime,
      isSave: true
    })
  }

  handleUnitsTimeChange (value, unitsTime) {
    const myUnitsTime = this.state[value]
    myUnitsTime.unitsTime = unitsTime
    this.setState({
      [value]: myUnitsTime,
      isSave: true
    })
  }

  async handleUpdateEstimateTime (e) {
    const { onUpdateEstimatedTime } = this.props
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onUpdateEstimatedTime(values)
        this.setState({
          isSave: false
        })
        notification.success({
          message: 'Change Spent Time Success',
          placement: 'topRight'
        })
      }
    })
  }

  handleCancel () {
    const { estimated_time, estimated_time_unit, spent_time, spent_time_unit } = this.props
    this.setState({
      estimated: {
        time: estimated_time,
        unitsTime: estimated_time_unit
      },
      spent: {
        time: spent_time,
        unitsTime: spent_time_unit
      },
      isSave: false
    })
  }

  componentDidMount () {
    const { estimated_time, estimated_time_unit, spent_time, spent_time_unit } = this.props
    this.setState({
      estimated: {
        time: estimated_time,
        unitsTime: estimated_time_unit
      },
      spent: {
        time: spent_time,
        unitsTime: spent_time_unit
      }
    })
  }

  render () {
    const { size, form: { getFieldDecorator }, user, created_by: createdby } = this.props
    const { estimated, spent, isSave } = this.state
    return (
      <div>
        {
          user.role === 'Admin' || user.role === 'Leader' || user.user_id === createdby ? (
            <Form layout='inline' onSubmit={this.handleUpdateEstimateTime}>
              <Form.Item label='Estimated time'>
                {getFieldDecorator('estimated', {
                  initialValue: { time: estimated.time ? estimated.time : 0, unitsTime: estimated.unitsTime ? estimated.unitsTime : 'Hour' }
                })(
                  <>
                    <Input
                      type='number'
                      min={0}
                      size={size}
                      value={estimated.time ? estimated.time : 0}
                      onChange={(e) => this.handleTimeChange('estimated', e)}
                      style={{ width: '29%', marginRight: '3%' }}
                    />
                    <Select
                      value={estimated.unitsTime ? estimated.unitsTime : 'Hour'}
                      size={size}
                      style={{ width: 120 }}
                      onChange={(e) => this.handleUnitsTimeChange('estimated', e)}
                    >
                      <Option value='Minute'>Minute</Option>
                      <Option value='Hour'>Hour</Option>
                      <Option value='Day'>Day</Option>
                    </Select>
                  </>
                )}
              </Form.Item>
              <Form.Item label='Spent time'>
                {getFieldDecorator('spent', {
                  initialValue: { time: spent.time ? spent.time : 0, unitsTime: spent.unitsTime ? spent.unitsTime : 'Hour' }
                })(
                  <>
                    <Input
                      type='number'
                      min={0}
                      size={size}
                      value={spent.time ? spent.time : 0}
                      onChange={(e) => this.handleTimeChange('spent', e)}
                      style={{ width: '27%', marginRight: '3%', marginLeft: 25 }}
                    />
                    <Select
                      value={spent.unitsTime ? spent.unitsTime : 'Hour'}
                      size={size}
                      style={{ width: 120 }}
                      onChange={(e) => this.handleUnitsTimeChange('spent', e)}
                    >
                      <Option value='Minute'>Minute</Option>
                      <Option value='Hour'>Hour</Option>
                      <Option value='Day'>Day</Option>
                    </Select>
                  </>
                )}
              </Form.Item>
              <br />
              {
                isSave ? (
                  <Form.Item style={{ textAlign: 'left' }}>
                    <Button type='primary' htmlType='submit' style={{ marginRight: 13 }}>Save</Button>
                    <Icon type='close' onClick={this.handleCancel} />
                  </Form.Item>
                ) : null
              }
            </Form>
          ) : (
            <Form layout='inline' onSubmit={this.handleUpdateEstimateTime}>
              <Form.Item label='Estimated time'>
                {getFieldDecorator('estimated', {
                  initialValue: { time: estimated.time ? estimated.time : 0, unitsTime: estimated.unitsTime ? estimated.unitsTime : 'Hour' }
                })(
                  <>
                    <Input
                      disabled
                      min={0}
                      size={size}
                      style={{ width: '29%', marginRight: '3%' }}
                      value={estimated.time ? estimated.time : 0}
                    />
                    <Input
                      disabled
                      min={0}
                      size={size}
                      value={estimated.unitsTime ? estimated.unitsTime : 'Hour'}
                      onChange={(e) => this.handleTimeChange('spent', e)}
                      style={{ width: 120, marginRight: '3%' }}
                    />
                  </>
                )}
              </Form.Item>
              <br />
              <Form.Item label='Spent time'>
                {getFieldDecorator('spent', {
                  initialValue: { time: spent.time ? spent.time : 0, unitsTime: spent.unitsTime ? spent.unitsTime : 'Hour' }
                })(
                  <>
                    <Input
                      className='spenttime'
                      type='number'
                      min={0}
                      size={size}
                      value={spent.time ? spent.time : ''}
                      onChange={(e) => this.handleTimeChange('spent', e)}
                      style={{ width: '27%', marginRight: '3%', marginLeft: 25 }}
                    />
                    <Select
                      value={spent.unitsTime ? spent.unitsTime : 'Hour'}
                      size={size}
                      style={{ width: 120 }}
                      onChange={(e) => this.handleUnitsTimeChange('spent', e)}
                    >
                      <Option value='Minute'>Minute</Option>
                      <Option value='Hour'>Hour</Option>
                      <Option value='Day'>Day</Option>
                    </Select>
                  </>
                )}
              </Form.Item>
              <br />
              {
                isSave ? (
                  <Form.Item style={{ textAlign: 'left' }}>
                    <Button type='primary' htmlType='submit' style={{ marginRight: 13 }}>Save</Button>
                    <Icon type='close' onClick={this.handleCancel} />
                  </Form.Item>
                ) : null
              }
            </Form>
          )
        }
      </div>
    )
  }
}

export default Form.create({ name: 'customized_form_controls' })(SpentTimeModal)
