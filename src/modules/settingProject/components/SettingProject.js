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
      updateLabel: '',
      project: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOnStartUpdate = this.handleOnStartUpdate.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChangeDateStart = this.handleChangeDateStart.bind(this)
    this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this)
    this.handleChangeStatusProject = this.handleChangeStatusProject.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
  }

  /* ============================ GET PROPERTIES OF PROJECT WILL CHANGE  ============================ */
  handleOnStartUpdate (e) {
    this.setState({
      updateLabel: e
    })
  }
  /* ============================ END GET PROPERTIES OF PROJECT WILL CHANGE  ============================ */

  /* ============================ COMPARE 2 values WILL CHANGE  ============================ */
  handleChange (e) {
    const { updateLabel: label, descriptionLabel } = this.state
    const project = this.state.project
    if (e !== project[label] && e !== descriptionLabel) {
      project[label] = e
      this.setState({
        isChange: true,
        project
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
    const { updateProject, project: { id }, getProjectInfo } = this.props
    const { project } = this.state
    const projectId = id
    const result = await updateProject(projectId, this.cleanObj(project))
    if (result.error) {
      const errors = result.error
      checkError(errors.error)
      this.setState({ updateLabel: null })
      // this.props.getUserProfileInformation(id)
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
    const project = {
      title: title,
      description: description,
      status: status,
      start_date: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      end_date: endDate ? moment(endDate).format('YYYY-MM-DD') : null
    }
    this.setState({
      project,
      isChange: false
    })
  }
  /* ============================ END FUNCTION CANCEL UPDATE INFO PROJECT ============================ */

  /* ============================ GET AND COMPARE START_DATE FROM DatePicker ============================ */
  async handleChangeDateStart (e, dateString) {
    const project = this.state.project
    if (dateString !== project.start_date && dateString !== '') {
      project.start_date = dateString
      this.setState({
        isChange: true,
        project
      })
    }
  }
  /* ============================ END GET AND COMPARE START_DATE FROM DatePicker ============================ */

  /* ============================ GET AND COMPARE END_DATE FROM DatePicker ============================ */
  async handleChangeDateEnd (e, dateString) {
    const project = this.state.project
    if (dateString !== project.end_date && dateString !== '') {
      project.end_date = dateString
      this.setState({
        isChange: true,
        project
      })
    }
  }
  /* ============================ END GET AND COMPARE END_DATE FROM DatePicker ============================ */

  handleChangeStatusProject (e) {
    const project = this.state.project
    project.status = e
    this.setState({
      isChange: true,
      project
    })
  }

  handleChangeDescription ({ target: { value } }) {
    const project = this.state.project
    if (value !== project.description) {
      project.description = value
      this.setState({
        isChange: true,
        project
      })
    } else {
      this.setState({
        isChange: false
      })
    }
  }

  /* ============================ GET INFO PROJECT WILL CHANGE FROM STORE ============================ */
  componentDidMount () {
    const { project: { title, description, status, start_date: startDate, end_date: endDate } } = this.props
    const project = {
      title: title,
      description: description,
      status: status,
      start_date: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      end_date: endDate ? moment(endDate).format('YYYY-MM-DD') : null
    }
    this.setState({
      project
    })
  }
  /* ============================ END GET INFO PROJECT WILL CHANGE FROM STORE ============================ */

  render () {
    const { isChange, project } = this.state
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
                onStart: (name = 'title') => this.handleOnStartUpdate(name),
                onChange: this.handleChange
              }}
            >
              {project.title}
            </Paragraph>
          ) : (
            <Paragraph
              className='project-title'
              style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold', marginLeft: 75 }}
            >
              {project.title}
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
                value={project.description}
                onChange={this.handleChangeDescription}
                placeholder='Add a more detailed description for project...'
                rows={4}
              />
            ) : (
              project.description ? (
                <Paragraph
                  className='project-title'
                  style={{ fontStyle: 'oblique', marginLeft: 75, fontSize: 15 }}
                >
                  {project.description}
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
                value={project.status}
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
                {project.status}
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
                value={project.start_date ? moment(project.start_date, 'YYYY-MM-DD') : ''}
                onChange={this.handleChangeDateStart}
              />
            ) : (
              project.start_date ? (
                <Paragraph
                  className='project-title'
                  style={{ marginLeft: 75, width: 350 }}
                >
                  {project.start_date}
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
                value={project.end_date ? moment(project.end_date, 'YYYY-MM-DD') : ''}
                onChange={this.handleChangeDateEnd}
              />
            ) : (
              project.end_date ? (
                <Paragraph
                  className='project-title'
                  style={{ marginLeft: 75, width: 350 }}
                >
                  {project.end_date}
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
