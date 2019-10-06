import React, { Component } from 'react'
import './css/project.css'
import ProjectList from './ProjectList'
import AddProject from './AddProject'
import uuid from 'uuid'
import img1 from './../../../assets/images/landingpage/user/avatar1.png'
import img2 from './../../../assets/images/landingpage/user/avatar2.png'
import img3 from './../../../assets/images/landingpage/user/avatar3.png'
import img4 from './../../../assets/images/landingpage/user/avatar4.png'
import { Button, Pagination, Row, Col, Typography, Form, Select, Input, Icon, Empty } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'

const { Option } = Select
const { Title } = Typography

class ProjectListModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: true,
      projects: [],
      currentPage: 1,
      totalRecord: 0,
      offset: 9
    }
    this.handlePaging = this.handlePaging.bind(this)
    this.handleView = this.handleView.bind(this)
    this.handleGetProjectList = this.handleGetProjectList.bind(this)
  }

  async handleGetProjectList (value) {
    const { getProjects } = this.props
    const { offset } = this.state
    const result = await getProjects(value, offset)
    this.setState({
      projects: result.data.data,
      totalRecord: result.data.totalRecord,
      currentPage: result.data.page
    })
  }

  componentDidMount () {
    const { currentPage } = this.state
    this.handleGetProjectList(currentPage)
  }

  handlePaging (value) {
    this.setState({
      currentPage: value
    })
    this.handleGetProjectList(value)
  }

  handleView () {
    this.setState({
      view: !this.state.view
    })
  }

  render () {
    const searchInput = (
      <span>
        <Input
          size='large'
          prefix={<Icon type='search' style={{ color: 'rgba(0,0,0,.25)' }} />}
          style={{ width: 'auto', border: '1px solid #d9d9d9', marginRight: 10, borderRadius: 4 }}
          placeholder='Search ...'
        />
        <Select defaultValue='all' style={{ width: '100px', borderRadius: 'none' }} size='large'>
          <Option value='all'>All</Option>
          <Option value='favorite'>Favorite</Option>
          <Option value='recent'>Recent</Option>
        </Select>
      </span>
    )
    const { createProject } = this.props
    const { currentPage, totalRecord, offset } = this.state
    const data = this.state.projects
    return (
      <div>
        <Row style={{ borderBottom: '1px #9999 solid', marginBottom: 10 }}>
          <Col lg={{ span: 24 }} xl={{ span: 4 }} xxl={{ span: 5 }}>
            <Title level={2}>My Projects</Title>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 20 }} xl={{ span: 17, offset: 1 }} xxl={{ span: 12, offset: 5 }}>
            <Form layout='inline'>
              <Form.Item>
                {searchInput}
              </Form.Item>
              <Form.Item>
                <Button size='large' type='primary' htmlType='submit' icon='filter'>
                  Filter
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 4 }} xl={{ span: 2, offset: 0 }} xxl={{ span: 2 }}>
            <AddProject onAddProject={createProject} onGetProjectList={this.handleGetProjectList} />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col lg={{ span: 4, offset: 20 }}>
            <ButtonGroup style={{ float: 'right' }}>
              <Button icon='table' size='large' disabled={this.state.view} onClick={this.handleView} />
              <Button icon='unordered-list' size='large' disabled={!this.state.view} onClick={this.handleView} />
            </ButtonGroup>
          </Col>
        </Row>
        <Row gutter={50}>
          <ProjectList projects={data} min={this.state.minValue} max={this.state.maxValue} />
        </Row>
        <Pagination
          current={currentPage}
          pageSize={offset}
          onChange={this.handlePaging}
          total={totalRecord}
        />
      </div>
    )
  }
}

export default ProjectListModal
