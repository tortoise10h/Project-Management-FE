import React, { Component } from 'react'
import { Row, Col, Icon, Popover, Typography, Tooltip } from 'antd'
import PropTypes from 'prop-types'

const { Text, Paragraph } = Typography

export default class ProjectItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      favorited: false,
      maxHeight: '0',
      opacity: '0',
      hover: false
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleFavorite = this.handleFavorite.bind(this)
  }

  handleMouseOver (e) {
    this.setState({
      maxHeight: '25px',
      opacity: 1,
      hover: true
    })
    // this.handleHover
  }

  handleMouseLeave (e) {
    this.setState({
      maxHeight: 0,
      opacity: 0,
      hover: false
    })
  }

  handleFavorite () {
    this.setState({ favorited: !this.state.favorited })
  }

  setStatus (mode) {
    let status = ''
    switch (mode) {
      case '1':
        status =
          <div className='category arrow_box status-new' style={{ background: 'linear-gradient(to right, #02aab0, #00cdac)' }}>
            New project
          </div>
        break
      case '2':
        status =
          <div className='category arrow_box status-processing'>
            In processing
          </div>
        break
      case '3':
        status =
          <div className='category arrow_box status-deadline'>
            Deal line
          </div>
        break
      case '4':
        status =
          <div className='category arrow_box status-done'>
            Done
          </div>
        break
      default:
        status =
          <div className='category arrow_box status-new'>
            New project
          </div>
    }
    return status
  }

  render () {
    console.log('render -> this.props,', this.props)
    const { title, Users, id, status } = this.props.project
    const owner = Users[0]
    const { favorited } = this.state
    const span = 6
    return (
      <Col key={id} xxl={{ span: 6 }} xl={{ span: 8 }} lg={{ span: 12 }} style={cardStyle}>
        {/* <!-- Normal Demo--> */}
        <div className='column'>
          {/* <!-- Post--> */}
          <div className={['post-module', this.state.hover ? '' : ''].join(' ')} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
            {/* <!-- Thumbnail--> */}
            <div className='thumbnail'>
              <div className='date'>
                {/* <Icon type='heart' theme={favorited ? 'filled' : ''} style={{ fontSize: 25, lineHeight: 1.55, transition: 'all 0.5s ease-in-out' }} /> */}
              </div>
              <div
                className='more more-btn more-btn-white'
                style={{
                  backgroundColor: '#ffff',
                  height: 100,
                  width: 100,
                  position: 'absolute',
                  top: '16%',
                  left: '38%',
                  zIndex: 1,
                  textAlign: 'center',
                  fontSize: '34px',
                  lineHeight: '3',
                  borderRadius: '50%'
                }}
                  onClick={() => this.props.history.push(`/project-kanban/${id}`)}
              >
                <Icon type='arrow-right' />
              </div>
              <img src={require('./../../../assets/images/project_img.jpg')} alt='' />
            </div>
            {/* <!-- Post Content--> */}
            <div className='post-content'>
              {/* <div className='category arrow_box' style={{ background: 'linear-gradient(to right, #02aab0, #00cdac)' }}>
                Created By: {owner.name}
              </div> */}
              {this.setStatus(status)}
              {
                title.length > 22
                  ? <Tooltip
                    style={{ textAlign: 'center' }}
                    placement='top'
                    title={<Text strong style={{ color: '#fff' }}>{title}</Text>}
                  >
                    <Paragraph ellipsis={{ row: 2, expandable: false }} className='title'>
                      {title}
                    </Paragraph>
                  </Tooltip>
                  : <Paragraph ellipsis={{ row: 2, expandable: false }} className='title'>
                    {title}
                  </Paragraph>
              }
              <Row className='sub_title' align='middle' type='flex' gutter={10}>
                {
                  Users && Users.slice(0, 3).map((user) => (
                    <Col span={span} key={user.id}>
                      <Popover style={{ textAlign: 'center' }} placement='bottom' title={<Text strong>{user.name}</Text>} content='Programing Developer'>
                        <img
                          alt=''
                          src={user.photo_location || require('./../../../assets/images/landingpage/user/avatar1.png')}
                          className='user-project'
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: '#64CCBD',
                            borderRadius: '50%'
                          }}
                        />
                      </Popover>
                    </Col>
                  ))
                }
                {
                  Users && Users.length > 3
                    ? <Col span={span}>
                      <div
                        className='user-project-more'
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: '#444444',
                          borderRadius: '50%',
                          color: '#ffff',
                          display: 'table-cell',
                          textAlign: 'center',
                          verticalAlign: 'middle'
                        }}
                      >
                        + {Users.length - 3}
                      </div>
                    </Col>
                    : null
                }
              </Row>
              <div className='more-info' style={{ opacity: this.state.opacity, maxHeight: this.state.maxHeight, display: this.state.display, ...styles }}>
                <div className='owner' style={{ textAlign: 'center' }}>
                  Created by : <Text strong>{owner.name}</Text>
                </div>
              </div>
              <Row className='post-meta'>
                <Col className='timestamp' lg={{ span: 11 }}>
                  <Icon type='clock-circle' /> 6 mins ago
                </Col>
                <Col className='comments' lg={{ span: 11 }}>
                  <Icon type='message' />
                  <a href='#'> 39 comments</a>
                </Col>
                <Col className='favorite' lg={{ span: 2 }}>
                  <Icon
                    onClick={this.handleFavorite}
                    type='heart'
                    className={favorited ? 'filled' : ''}
                    theme={favorited ? 'filled' : ''}
                    style={{ fontSize: 20, paddingLeft: '10px', transition: 'all 0.3s ease-in' }}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Col>
    )
  }
}

const styles = {
  // paddingBottom:'20px',
  transition: 'all 0.2s ease-in'
}

const cardStyle = {
  marginBottom: 30,
  borderRadius: '10%'
}

ProjectItem.propTypes = {
  content: PropTypes.object.isRequired
}
