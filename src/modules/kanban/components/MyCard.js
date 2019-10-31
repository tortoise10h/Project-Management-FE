import React, { Component } from 'react'
import { Row, Col, Icon, Popconfirm, Modal } from 'antd'
import TaskModal from '../containers/TaskModal'
class MyCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleShowModal () {
    this.setState({
      visible: true
    })
  }

  handleCloseModal () {
    this.setState({
      visible: false
    })
  }

  render () {
    const { title, id, onDelete } = this.props
    const { visible } = this.state
    return (
      <>
        <div className='trello-card'>
          <Popconfirm
            title='Are you sure delete this task?'
            onConfirm={onDelete}
            okText='Yes'
            cancelText='No'
          >
            <div className='trello-card--btn'>
              <Icon type='close' />
            </div>
          </Popconfirm>
          <div className='trello-card--content' onClick={this.handleShowModal}>
            <div className='trello-card--labels'>
              <span className='trello-card--labels-text' style={{ backgroundColor: '#f17014' }}>
                test
              </span>
            </div>
            <div className='trello-card--title'>
              {title || 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam (5)[5]'}
            </div>
            <Row className='trello-card--badges'>
              <Col
                className='trello-card--badges-item'
                style={{
                  backgroundColor: '#f5222e'
                }}
              >
                <span>
                  <Icon type='clock-circle' style={{ marginRight: 5, fontSize: 18 }} />
                </span>
                <span>
                  Due Date
                </span>
              </Col>
            </Row>
            <div className='trello-card--members'>
              <ul>
                <li>
                  <div className='trello-card--member'>
                    <img src={require('./../../../assets/images/landingpage/user/avatar1.png')} />
                  </div>
                </li>
                <li>
                  <div className='trello-card--member'>
                    <img src={require('./../../../assets/images/landingpage/user/avatar2.png')} />>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Modal
          maskClosable={false}
          className='task-modal'
          title={title}
          visible={visible}
          footer={null}
          onCancel={this.handleCloseModal}
          width='60%'
        >
          <TaskModal taskId={id} />
        </Modal>
      </>
    )
  }
}

export default MyCard
