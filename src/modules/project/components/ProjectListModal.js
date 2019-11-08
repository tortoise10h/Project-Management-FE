import React, { Component } from 'react'
import './css/project.css'
import './css/transition.css'
import ProjectList from './ProjectList'
import AddProject from './AddProject'
import { Button, Pagination, Row, Col, Typography, Form, Select, Input, Icon } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'
import TableMode from './TableMode'

const { Option } = Select
const { Title } = Typography

class ProjectListModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: true,
      sortTitle: '',
      sort: null,
      direction: null,
      isFavorite: null,
      projects: [],
      currentPage: 1,
      totalRecord: 0,
      offset: 9
    }
    this.handlePaging = this.handlePaging.bind(this)
    this.handleView = this.handleView.bind(this)
    this.handleGetProjectList = this.handleGetProjectList.bind(this)
    this.handleToggleFavorite = this.handleToggleFavorite.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

  async handleGetProjectList (page, params) {
    const { getProjects } = this.props
    const { offset, sort, direction, isFavorite, sortTitle } = this.state
    const result = await getProjects(page, offset, params || { title: sortTitle || null, sort, direction, is_favorite: isFavorite })
    this.setState({
      projects: result.data.data,
      totalRecord: result.data.totalRecord,
      currentPage: result.data.page
    })
  }

  async handleToggleFavorite (projectId, favorite) {
    const { toggleFavorite, user } = this.props
    await toggleFavorite(user.id, projectId, favorite)
  }

  async componentDidMount () {
    const { currentPage } = this.state
    this.handleGetProjectList(currentPage)
  }

  handlePaging (page) {
    this.setState({
      currentPage: page
    })
    this.handleGetProjectList(page)
  }

  handleView () {
    const { currentPage } = this.state
    this.setState({
      view: !this.state.view
    })
    this.handleGetProjectList(currentPage)
  }

  handleFilter (e) {
    e.preventDefault()
    const { form } = this.props
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setFilter(values.search, values.option)
      }
    })
  }

  setFilter (title, option) {
    this.setState({
      sortTitle: title || null
    })
    switch (option) {
      case 'favorite':
        this.setState({
          sort: null,
          isFavorite: true,
          direction: null
        })
        this.handleGetProjectList(1, { title: title || null, sort: null, is_favorite: true })
        break
      case 'status':
        this.setState({
          sort: 'status',
          isFavorite: null,
          direction: null
        })
        this.handleGetProjectList(1, { title: title || null, sort: 'status', is_favorite: null })
        break
      case 'recent':
        this.setState({
          sort: 'id',
          isFavorite: null,
          direction: 'DESC'
        })
        this.handleGetProjectList(1, { title: title || null, sort: 'id', is_favorite: null, direction: 'DESC' })
        break
      default:
        this.setState({
          sort: null,
          isFavorite: null,
          direction: null
        })
        this.handleGetProjectList(1, { title: title || null, sort: null, is_favorite: null })
        break
    }
  }

  render () {
    const { createProject, history, form: { getFieldDecorator } } = this.props
    const { currentPage, totalRecord, offset, view } = this.state
    const data = this.state.projects
    return (
      <div>
        <Row style={{ borderBottom: '1px #9999 solid', marginBottom: 10 }}>
          <Col lg={{ span: 24 }} xl={{ span: 4 }} xxl={{ span: 5 }}>
            <Title level={2}>My Projects</Title>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 20 }} xl={{ span: 17, offset: 1 }} xxl={{ span: 12, offset: 5 }}>
            <Form layout='inline' onSubmit={(e) => this.handleFilter(e)}>
              <Form.Item>
                {getFieldDecorator('search', {
                })(
                  <Input
                    size='large'
                    prefix={<Icon type='search' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    style={{ width: 'auto', border: '1px solid #d9d9d9', marginRight: 10, borderRadius: 4 }}
                    placeholder='Search ...'
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('option', {
                  initialValue: 'all'
                })(
                  <Select style={{ width: '100px', borderRadius: 'none' }} size='large'>
                    <Option value='all'>All</Option>
                    <Option value='favorite'>Favorite</Option>
                    <Option value='status'>Status</Option>
                    <Option value='recent'>Recent</Option>
                  </Select>
                )}
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
            <ButtonGroup className='change-view' style={{ float: 'right' }}>
              <Button icon='table' size='large' disabled={this.state.view} onClick={this.handleView} />
              <Button icon='unordered-list' size='large' disabled={!this.state.view} onClick={this.handleView} />
            </ButtonGroup>
          </Col>
        </Row>
        {view
          ? (
            <>
              <Row gutter={50}>
                <ProjectList
                  history={history}
                  onFavorite={this.handleToggleFavorite}
                  projects={data}
                  min={this.state.minValue}
                  max={this.state.maxValue}
                />
              </Row>
              <Pagination
                current={currentPage}
                pageSize={offset}
                onChange={this.handlePaging}
                total={totalRecord}
              />
            </>
          ) : (
            <TableMode
              projects={data}
              pagination={{
                pageSize: offset,
                total: totalRecord,
                current: currentPage
              }}
              onFavorite={this.handleToggleFavorite}
              onPaging={this.handlePaging}
            />
          )}
      </div>
    )
  }
}

export default Form.create({ name: 'Filter_Project' })(ProjectListModal)
