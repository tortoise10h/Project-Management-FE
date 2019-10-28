import React, { Component } from 'react'
import { Button, DatePicker, Popover, Row, Col, Typography, Icon, Checkbox, Progress, Input, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import moment from 'moment'
import SpentTimeModal from './SpentTimeModal'

const { Text } = Typography
const { Option } = Select

const checkboxs = ['Create modal', 'Style modal', 'Animation', 'Fetch API', 'ABC', 'Lol Khoa']

export default class TaskModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      checkProgress: 0
    }
    this.AddToCards = {}
    this.setAddToCard()
    this.handleOnCheck = this.handleOnCheck.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  setAddToCard () {
    this.AddToCards = [
      {
        key: 'members',
        icon: 'user',
        title: 'Members'
      },
      {
        key: 'labels',
        icon: 'tag',
        title: 'Labels'
      },
      {
        key: 'description',
        icon: 'check-square',
        title: 'Description'
      },
      {
        key: 'checkbox',
        icon: 'check-square',
        title: 'Checklist'
      },
      {
        key: 'due date',
        icon: 'clock-circle',
        title: 'Due Date'
      },
      {
        key: 'attachment',
        icon: 'paper-clip',
        title: 'Attachment'
      }
    ]
  }

  handleOnCheck (e) {
    this.setState({
      checkProgress: Math.floor((e.length / checkboxs.length) * 100)
    })
  }

  handleShowModal () {
    this.setState({
      visible: true
    })
  };

  handleCloseModal () {
    this.setState({
      visible: false
    })
  };

  render () {
    const { checkProgress } = this.state
    return (
      <div className='task-modal'>
        <Row>
          {/* ============================ TASK CONTENT  ============================ */}
          <Col md={{ span: 24 }} lg={{ span: 15 }} xl={{ span: 18 }}>
            <Row style={{ color: '#5e6c84' }}>
              {/* ============================ TASK MEMBER  ============================ */}
              <Col lg={{ span: 24 }} xl={{ span: 12 }}>
                <Text strong>MEMBERS</Text>
                <div className='task-content'>
                  <Row>
                    <Col md={{ span: 2 }} lg={{ span: 4 }}>
                      <Popover
                        trigger='click'
                        placement='bottomLeft'
                        title={
                          <Row>
                            <Col span={10}>
                              <div
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: '50%',
                                  backgroundColor: 'rgba(9,30,66,.04)'
                                }}
                              >
                                <img
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    textAlign: 'center',
                                    objectFit: 'cover'
                                  }}
                                  src={require('./../../../assets/images/landingpage/user/avatar1.png')}
                                />
                              </div>
                            </Col>
                            <Col span={14}>
                              <h3>User name</h3>
                              <Text>user email</Text>
                            </Col>
                          </Row>
                        }
                        content={
                          <div className='button-remove--member'>
                            Remove from task
                          </div>
                        }
                      >
                        <div className='trello-card--member'>
                          <img src={require('./../../../assets/images/landingpage/user/avatar1.png')} />
                        </div>
                      </Popover>
                    </Col>
                    <Col md={{ span: 2 }} lg={{ span: 4 }}>
                      <Popover
                        trigger='click'
                        placement='bottomLeft'
                        title={
                          <Row>
                            <Col span={10}>
                              <div
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: '50%',
                                  backgroundColor: 'rgba(9,30,66,.04)'
                                }}
                              >
                                <img
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    textAlign: 'center',
                                    objectFit: 'cover'
                                  }}
                                  src={require('./../../../assets/images/landingpage/user/avatar1.png')}
                                />
                              </div>
                            </Col>
                            <Col span={14}>
                              <h3>User name</h3>
                              <Text>user email</Text>
                            </Col>
                          </Row>
                        }
                        content={
                          <div className='button-remove--member'>
                            Remove from task
                          </div>
                        }
                      >
                        <div className='trello-card--member'>
                          <img src={require('./../../../assets/images/landingpage/user/avatar2.png')} />>
                        </div>
                      </Popover>
                    </Col>
                    <Col md={{ span: 2 }} lg={{ span: 4 }}>
                      <div className='trello-card--member' style={{ textAlign: 'center', lineHeight: '32px', color: '#ffff' }}>
                        <Icon type='plus' />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              {/* ============================ TASK LABELS  ============================ */}
              <Col lg={{ span: 24 }} xl={{ span: 12 }}>
                <Text strong>LABELS</Text>
                <div className='task-content trello-card--labels'>
                  <span className='trello-card--labels-text modal' style={{ backgroundColor: '#f17014' }}>
                    test
                  </span>
                  <span className='trello-card--labels-text modal' style={{ backgroundColor: '#f17014' }}>
                    test
                  </span>
                  <span className='trello-card--labels-text modal' style={{ backgroundColor: '#f17014' }}>
                    test
                  </span>
                  <span className='trello-card--labels modal add'>
                    <Icon type='plus' />
                  </span>
                </div>
              </Col>
            </Row>
            {/* ============================ TASK DUE DATE ============================ */}
            <Row>
              <Text strong>DUE DATE</Text>
              <div className='task-content due-date' style={{ marginLeft: 20 }}>
                <Checkbox style={{ width: 30, height: 30 }} />
                <DatePicker
                  format='YYYY-MM-DD HH:mm:ss'
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                />
                <span className='detail-box' style={{ background: '#e8968b' }}>
                    OVER DUE
                </span>
              </div>
            </Row>
            {/* ============================ TASK SPENT TIME ============================ */}
            <Row>
              <Text strong>SPENT TIME</Text>
              <div className='task-content due-date' style={{ marginLeft: 20 }}>
                <span>
                  <SpentTimeModal />
                </span>
              </div>
            </Row>
            {/* ============================ TASK DESCRIPTION ============================ */}
            <Row>
              <div>
                <Icon type='menu' style={{ marginRight: 5 }} />
                <span style={{ fontWeight: 600 }}>Description</span>
              </div>
              <div className='task-content' style={{ marginLeft: 20 }}>
                <TextArea rows={5} />
              </div>
            </Row>
            {/* ============================ TASK CHECK BOX ============================ */}
            <Row>
              <div>
                <Icon type='check-square' style={{ marginRight: 5 }} />
                <span style={{ fontWeight: 600 }}>Checklist</span>
              </div>
              <div className='task-content' style={{ marginLeft: 20 }}>
                <Progress percent={checkProgress} style={{ marginBottom: 10 }} />
                <Checkbox.Group style={{ width: '100%', marginBottom: 15 }} onChange={this.handleOnCheck}>
                  {
                    checkboxs && checkboxs.map((checkbox) => (
                      <div key={checkbox} className='checklist-content'>
                        <Checkbox
                          value={checkbox}
                          style={{ marginLeft: 10, width: 'calc(100% - 38px)' }}
                        >
                          {checkbox}
                        </Checkbox>
                        <Popover
                          placement='right'
                          trigger='click'
                          title='Item Actions'
                          content={
                            <>
                              <div className='button-remove--member'>
                                Edit
                              </div>
                              <div className='button-remove--member'>
                                Delete
                              </div>
                            </>
                          }
                        >
                          <span className='button-edit-checklist' onClick={() => console.count()}><Icon type='ellipsis' /></span>
                        </Popover>
                      </div>
                    ))
                  }
                </Checkbox.Group>
                <Button>Add an item</Button>
              </div>
            </Row>
          </Col>
          {/* ============================ TASK OPTION  ============================ */}
          <Col md={{ span: 24 }} lg={{ span: 8, offset: 1 }} xl={{ span: 5, offset: 1 }}>
            <Text strong>ADD TO CARD</Text>
            {
              this.AddToCards.map((AddToCard) => (
                <div key={AddToCard.key} className='button-add-to-card'>
                  <span style={{ marginRight: 10 }}>
                    <Icon type={AddToCard.icon} />
                  </span>
                  <span>
                    {AddToCard.title}
                  </span>
                </div>
              ))
            }
          </Col>
        </Row>
      </div>
    )
  }
}
