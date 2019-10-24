import React, { Component } from 'react'
import { Row, Col, Icon, Popconfirm } from 'antd'

class MyCard extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { title, onDelete } = this.props
    return (
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
        <div className='trello-card--content'>
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
    )
  }
}

export default MyCard
