import React from 'react'
import { notification, Typography, Button, DatePicker, Select, Input } from 'antd'
import checkError from '../../../libraries/CheckError'
import './css/SettingProject.css'
import * as moment from 'moment'

const { Text, Paragraph, Title } = Typography
const { Option } = Select
const { TextArea } = Input

class Members extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isChange: false,
      project: [],
      titleProject: '',
      statusProject: '',
      descriptionProject: '',
      startDatePoj: '',
      endDatePoj: '',
      editProject: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChangeDateStart = this.handleChangeDateStart.bind(this)
    this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this)
    this.handleChangeStatusProject = this.handleChangeStatusProject.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
  }

  /* ============================ COMPARE 2 values WILL CHANGE  ============================ */
  handleChange (e) {
    const titleProject = this.state
    const { project: { title } } = this.props
    if (e !== titleProject) {
      this.setState({
        isChange: true,
        titleProject: e,
        editProject: {
          ...this.state.editProject,
          title: e
        }
      })
    }
    if (e === title) {
      this.setState({
        isChange: false
      })
    }
  }
  /* ============================ END COMPARE 2 values WILL CHANGE  ============================ */

  /* ============================ CLEAN OBJECT  ============================ */
  cleanObj (obj) {
    var propNames = Object.getOwnPropertyNames(obj)
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i]
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName]
      }
    }
    return obj
  }
  /* ============================ END CLEAN OBJECT  ============================ */

  /* ============================ FUNCTION UPDATE INFO PROJECT ============================ */
  async handleSave () {
    const {
      project: { id },
      getProjectInfo,
      updateProject
    } = this.props
    const { editProject } = this.state
    const projectId = id

    const result = await updateProject(projectId, this.cleanObj(editProject))
    if (result.error) {
      const errors = result.error
      checkError(errors.error)
    } else {
      await getProjectInfo(projectId)
      notification.success({
        message: 'Save success',
        placement: 'bottomLeft'
      })
      this.setState({
        isChange: false
      })
    }
  }
  /* ============================ END FUNCTION UPDATE INFO PROJECT ============================ */

  /* ============================ FUNCTION CANCEL UPDATE INFO PROJECT ============================ */
  handleCancel () {
    const { project: { title, description, status, start_date: startDate, end_date: endDate } } = this.props
    this.setState({
      titleProject: title,
      statusProject: status,
      descriptionProject: description,
      startDatePoj: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDatePoj: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      isChange: false
    })
  }
  /* ============================ END FUNCTION CANCEL UPDATE INFO PROJECT ============================ */

  /* ============================ GET AND COMPARE START_DATE FROM DatePicker ============================ */
  async handleChangeDateStart (e, dateString) {
    const startDatePoj = this.state
    if (dateString !== startDatePoj && dateString !== '') {
      this.setState({
        isChange: true,
        editProject: {
          ...this.state.editProject,
          start_date: dateString
        },
        startDatePoj: dateString
      })
    }
  }
  /* ============================ END GET AND COMPARE START_DATE FROM DatePicker ============================ */

  /* ============================ GET AND COMPARE END_DATE FROM DatePicker ============================ */
  async handleChangeDateEnd (e, dateString) {
    const endDatePoj = this.state
    if (dateString !== endDatePoj && dateString !== '') {
      this.setState({
        isChange: true,
        editProject: {
          ...this.state.editProject,
          end_date: dateString
        },
        endDatePoj: dateString
      })
    }
  }
  /* ============================ END GET AND COMPARE END_DATE FROM DatePicker ============================ */

  handleChangeStatusProject (e) {
    this.setState({
      isChange: true,
      editProject: {
        ...this.state.editProject,
        status: e
      },
      statusProject: e
    })
  }

  handleChangeDescription ({ target: { value } }) {
    const descriptionProject = this.state
    const { project: { description } } = this.props
    if (value !== descriptionProject) {
      this.setState({
        isChange: true,
        editProject: {
          ...this.state.editProject,
          description: value
        },
        descriptionProject: value
      })
    }
    if (value === description) {
      this.setState({
        isChange: false
      })
    }
  }

  /* ============================ GET INFO PROJECT WILL CHANGE FROM STORE ============================ */
  componentDidMount () {
    const { project: { title, description, status, start_date: startDate, end_date: endDate } } = this.props
    this.setState({
      titleProject: title,
      statusProject: status,
      descriptionProject: description,
      startDatePoj: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDatePoj: endDate ? moment(endDate).format('YYYY-MM-DD') : null
    })
  }
  /* ============================ END GET INFO PROJECT WILL CHANGE FROM STORE ============================ */

  render () {
    const {
      isChange,
      project,
      titleProject,
      statusProject,
      descriptionProject,
      startDatePoj,
      endDatePoj
    } = this.state
    const { project: { owner }, user: { id } } = this.props
    return (
      <div className='projectName' style={{ float: 'left' }}>
        <span>
          <img
            alt=''
            src={project.photo_location || require('../../../assets/images/project_img.jpg')}
            className='user-project'
            style={{
              float: 'left',
              width: 50,
              height: 50,
              backgroundColor: '#64CCBD',
              borderRadius: '50%',
              marginRight: 10
            }}
          />
        </span>
        {
          owner === id ? (
            <Paragraph
              className='project-title'
              style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold', marginLeft: 75 }}
              editable={{
                onChange: this.handleChange
              }}
            >
              {titleProject}
            </Paragraph>
          ) : (
            <Paragraph
              className='project-title'
              style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold', marginLeft: 75 }}
            >
              {titleProject}
            </Paragraph>
          )
        }
        <br />
        <div style={{ float: 'left' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Description:</Text>
          {
            owner === id ? (
              <TextArea
                style={{ width: 400, marginTop: 5 }}
                value={descriptionProject}
                onChange={this.handleChangeDescription}
                placeholder='Add a more detailed description for project...'
                rows={4}
              />
            ) : (
              descriptionProject ? (
                <Paragraph
                  className='project-title'
                  style={{ fontStyle: 'oblique', marginLeft: 75, fontSize: 15 }}
                >
                  {descriptionProject}
                </Paragraph>
              ) : (
                <Paragraph
                  className='project-title'
                  style={{ fontStyle: 'oblique', marginLeft: 75, fontSize: 15 }}
                >
                  The project has no detailed description yet
                </Paragraph>
              )
            )
          }
        </div>
        <br />
        <div style={{ float: 'left' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Status:</Text>
          {
            owner === id ? (
              <Select
                value={statusProject}
                style={{ width: 176, marginLeft: 43, marginTop: 20 }}
                onChange={(e) => this.handleChangeStatusProject(e)}
              >
                <Option value='New'>New</Option>
                <Option value='Processing'>Processing</Option>
                <Option value='Done'>Done</Option>
                <Option value='Cancel'>Cancel</Option>
              </Select>
            ) : (
              <Paragraph
                className='project-title'
                style={{ fontWeight: 'bold', marginLeft: 75, backgroundColor: '#64CCBD' }}
              >
                {statusProject}
              </Paragraph>
            )
          }
        </div>
        <br />
        <div style={{ float: 'left' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Start Date:</Text>
          {
            owner === id ? (
              <DatePicker
                style={{ marginLeft: 18, marginTop: 20 }}
                value={startDatePoj ? moment(startDatePoj, 'YYYY-MM-DD') : ''}
                onChange={this.handleChangeDateStart}
              />
            ) : (
              startDatePoj ? (
                <Paragraph
                  className='project-title'
                  style={{ marginLeft: 75, width: 350 }}
                >
                  {startDatePoj}
                </Paragraph>
              ) : (
                <Paragraph
                  className='project-title'
                  style={{ marginLeft: 75 }}
                >
                  The project has no start date
                </Paragraph>
              )
            )
          }
        </div>
        <br />
        <div style={{ float: 'left', width: '100%' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>End Date:</Text>
          {
            owner === id ? (
              <DatePicker
                style={{ marginLeft: 25, marginTop: 20 }}
                value={endDatePoj ? moment(endDatePoj, 'YYYY-MM-DD') : ''}
                onChange={this.handleChangeDateEnd}
              />
            ) : (
              endDatePoj ? (
                <Paragraph
                  className='project-title'
                  style={{ marginLeft: 75, width: 350 }}
                >
                  {endDatePoj}
                </Paragraph>
              ) : (
                <Paragraph
                  className='project-title'
                  style={{ marginLeft: 75 }}
                >
                  The project has no end date
                </Paragraph>
              )
            )
          }
        </div>
        <br />
        {
          owner === this.props.user.id ? (
            isChange
              ? (
                <div style={{ float: 'left', marginTop: 20 }}>
                  <Title style={{ textAlign: 'left', marginTop: 10 }} level={4}>
                    Change{' '}
                  </Title>
                  <Button type='primary' style={{ marginLeft: 3 }} onClick={this.handleSave}>
                    Save
                  </Button>
                  <Button type='danger' style={{ marginLeft: 10, marginTop: 3 }} onClick={this.handleCancel}>
                  Cancel
                  </Button>
                </div>
              ) : null
          ) : null
        }
      </div>
    )
  }
}
export default Members
