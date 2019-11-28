import React from 'react'
import { Row, Col, Button, Icon, Typography, notification, DatePicker, Upload, Form } from 'antd'
import { dummyRequest, beforeUpload } from '../../../common/utils/upload'
import { Link } from 'react-router-dom'
import ChangePassword from './ChangePassword'
import * as moment from 'moment'
import checkError from '../../../libraries/CheckError'
import img from '../../../assets/images/project.png'

const { Paragraph, Title } = Typography
class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isChange: false,
      id: '',
      updateLabel: '',
      user: [],
      projects: [],
      totalRecord: 0,
      labelSummary: 'Add your summary here ...',
      labelProfileTitle: 'Add your profile title',
      labelAddress: 'Add your address here ...',
      // change avatar //
      media: [],
      avatarLoading: false,
      isAdd: false,
      photoLocation: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOnStartUpdate = this.handleOnStartUpdate.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.getProjects = this.getProjects.bind(this)
    this.getUserProfileInformation = this.getUserProfileInformation.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.cleanObj = this.cleanObj.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)

    // change avatar //
    this.normFile = this.normFile.bind(this)
    this.handleOnChangeAvatar = this.handleOnChangeAvatar.bind(this)
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleOnStartUpdate (e) {
    this.setState({
      updateLabel: e
    })
  }

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

  handleChange (e) {
    const { updateLabel: label } = this.state
    const user = this.state.user
    const { labelProfileTitle, labelSummary, labelAddress } = this.state
    if (e !== user[label] && e !== labelProfileTitle && e !== labelSummary && e !== labelAddress) {
      user[label] = e
      this.setState({
        isChange: true,
        user
      })
    }
  }

  async handleCancel () {
    this.setState({
      isChange: false
    })
    this.getUserProfileInformation()
  }

  async handleSave () {
    const { setUserProfileInformation } = this.props
    const { user, id } = this.state

    const result = await setUserProfileInformation(id, this.cleanObj(user))
    if (result) {
      const errors = result.error
      checkError(errors.error)
      this.setState({ updateLabel: null })
      this.props.getUserProfileInformation(id)
    } else {
      notification.success({
        message: 'Save success',
        placement: 'topRight'
      })
      this.setState({
        isChange: false
      })
    }
  }

  async getUserProfileInformation () {
    console.count()
    const { getUserProfileInformation, user: { id } } = this.props
    const userInfo = await getUserProfileInformation(id)
    const user = {
      name: userInfo.name,
      phone: userInfo.phone,
      email: userInfo.email,
      summary: userInfo.summary,
      address: userInfo.address,
      profile_title: userInfo.profile_title,
      birthday: userInfo.birthday ? moment(userInfo.birthday).format('YYYY-MM-DD') : null
      // birthday: userInfo.birthday
    }
    this.setState({
      isChange: false,
      id: userInfo.id,
      photoLocation: userInfo.photo_location,
      user
    })
  }

  async getProjects () {
    const { getProjects } = this.props
    const result = await getProjects(1, 4)
    this.setState({
      projects: result.data.data,
      totalRecord: result.data.totalRecord
    })
  }

  async handleChangeDate (e, dateString) {
    // const { updateLabel: label } = this.state
    const user = this.state.user
    if (dateString !== user.birthday && dateString !== '') {
      user.birthday = dateString
      this.setState({
        isChange: true,
        user
      })
    }
  }

  /* ----------------------CHANGE AVATAR------------------------------ */
  normFile (e) {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  /* -----------STATUS BUTTON UPLOAD--------------- */
  handleChangeAvatar (info) {
    if (info.file.state === 'uploading') {
      this.setState({ avatarLoading: true })
      return this.normFile(info)
    }
    if (info.file.status === 'done') {
      this.setState({ avatarLoading: false })
    }
    return this.normFile(info)
  }
  /* -----------STATUS BUTTON UPLOAD--------------- */

  /* ----------- ON CHANGE AVATAR--------------- */
  handleOnChangeAvatar (e) {
    const { changeAvatar, getProjectInfo, kanban: { project }, getUserProfileInformation } = this.props
    const { id } = this.state
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const result = await changeAvatar(id, values)
        if (result.error) {
          const errors = result.error
          checkError(errors.error)
        } else {
          const user = {
            name: result.name,
            phone: result.phone,
            email: result.email,
            summary: result.summary,
            address: result.address,
            profile_title: result.profile_title,
            birthday: result.birthday ? moment(result.birthday).format('YYYY-MM-DD') : null
            // birthday: result.birthday
          }
          this.setState({
            isChange: false,
            id: result.id,
            photoLocation: result.photo_location,
            user
          })
          const rs = await getProjectInfo(project.id)
          const rsInfo = await getUserProfileInformation(id)
          notification.success({
            message: 'Change Avatar Success',
            placement: 'topRight'
          })
        }
        this.setState({
          media: []
        })
      }
    })
  }
  /* -----------ON CHANGE AVATAR--------------- */

  /* -----------SET MEDIA BEFOR UPLOAD--------------- */
  handleUpload (e) {
    this.setState({
      media: e.fileList
    })
  }
  /* -----------SET MEDIA BEFOR UPLOAD--------------- */
  /* ----------------------CHANGE AVATAR------------------------------ */

  componentDidMount () {
    this.getUserProfileInformation()
    this.getProjects()
  }

  render () {
    const { setPasswordUserProfileInformation, token: { token }, getUserProfileInformation } = this.props
    const { projects, totalRecord, user, isChange, photoLocation } = this.state
    const { form: { getFieldDecorator } } = this.props
    const media = this.state.media
    const uploadProps = {
      multiple: true,
      name: 'avatar',
      listType: 'picture'
    }
    return (
      <div class='container-profile'>
        <Row class='row'>
          <div class='well'>
            <Row class='row'>
              <Col
                className='profile-avatar'
                md={{ span: 24 }}
                sm={{ span: 24 }}
                lg={{ span: 24 }}
                xl={{ span: 8 }}
              >
                <Row type='flex' justify='space-around' align='middle'>
                  <Col
                    md={{ span: 12 }}
                    xl={{ span: 24 }}
                    lg={{ span: 12 }}
                    sm={{ span: 12 }}
                  >
                    <img
                      src={photoLocation === null ? (
                        require('../../../assets/images/logo.svg')
                      ) : (
                        `http://localhost:5000/${photoLocation}`
                      )}
                      alt=''
                      class='img-rounded img-responsive img-size'
                      style={{ height: 230, marginTop: 30 }}
                    />

                    <Form onSubmit={this.handleOnChangeAvatar}>
                      <Form.Item label=''>
                        {getFieldDecorator('avatar', {
                          getValueFromEvent: this.handleChangeAvatar
                        })(
                          <Upload
                            fileList={this.state.media}
                            customRequest={dummyRequest}
                            beforeUpload={beforeUpload}
                            {...uploadProps}
                            onChange={this.handleUpload}
                            style={{ width: '100%' }}
                          >
                            {media.length <= 0
                              ? (
                                <Button className='btn-change'> Change Avatar </Button>
                              ) : null}
                          </Upload>
                        )}
                      </Form.Item>
                      {
                        media.length >= 1 ? (
                          <Form.Item>
                            <Button
                              type='primary'
                              htmlType='submit'
                              className='btn-save'
                            >Save
                            </Button>
                          </Form.Item>
                        ) : null
                      }
                    </Form>
                  </Col>
                  <Col
                    xl={{ span: 24 }}
                    lg={{ span: 12 }}
                    md={{ span: 12 }}
                    sm={{ span: 12 }}
                  >
                    <div style={{ marginTop: 10, fontSize: 20, color: 'rgba(0, 0, 0, 0.65)' }}>
                      {' '}
                      <Paragraph editable={{
                        onStart: (name = 'profile_title') => this.handleOnStartUpdate(name),
                        onChange: this.handleChange
                      }}
                      >
                        {user.profile_title || 'Add your profile title'}
                      </Paragraph>
                    </div>
                    <h4>
                      <Paragraph editable={{
                        onStart: (name = 'summary') => this.handleOnStartUpdate(name),
                        onChange: this.handleChange
                      }}
                      >
                        {user.summary || 'Add your summary here ...'}
                      </Paragraph>
                    </h4>
                  </Col>
                </Row>
              </Col>
              <Col
                class='col-sm-6 col-md-8'
                md={{ span: 24 }}
                sm={{ span: 24 }}
                lg={{ span: 24 }}
                xl={{ span: 16 }}
              >
                <Row style={{ marginTop: '5%' }}>
                  <Col
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 15 }}
                    xl={{ span: 15 }}
                  >
                    <div className='personal-information'>
                      <Title style={{ fontSize: 27 }} level={3}>
                        {' '}
                        <Paragraph editable={{
                          onStart: (name = 'name') => this.handleOnStartUpdate(name),
                          onChange: this.handleChange
                        }}
                        >
                          {user.name}
                        </Paragraph>{' '}
                      </Title>
                      <Icon
                        className='location-icon'
                        type='home'
                        theme='filled'
                      />
                      <Paragraph
                        className='text-edit'
                        editable={{
                          onStart: (name = 'address') => this.handleOnStartUpdate(name),
                          onChange: this.handleChange
                        }}
                      >
                        {user.address || 'Add your address here ...'}
                      </Paragraph>
                      <Icon
                        className='location-icon'
                        type='mail'
                        theme='filled'
                      />
                      <Paragraph
                        className='text-edit'
                        editable={{
                          onStart: (name = 'email') => this.handleOnStartUpdate(name),
                          onChange: this.handleChange
                        }}
                      >{user.email}
                      </Paragraph>
                      <Icon
                        className='location-icon'
                        type='phone'
                        theme='filled'
                      />
                      <Paragraph
                        className='text-edit'
                        editable={{
                          onStart: (name = 'phone') => this.handleOnStartUpdate(name),
                          onChange: this.handleChange
                        }}
                      >
                        {user.phone}
                      </Paragraph>
                      <Icon
                        className='location-icon'
                        type='gift'
                        theme='filled'
                      />
                      <div>
                        <DatePicker
                          value={user.birthday ? moment(user.birthday, 'YYYY-MM-DD') : ''}
                          onChange={this.handleChangeDate}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 9 }}
                    xl={{ span: 9 }}
                  >
                    <div className='list-project'>
                      <Title level={4}>List Project</Title>
                      {
                        totalRecord > 0 ? (
                          projects && projects.slice(0, 3).map((project) => (
                            <div key={project.id} className='location-icon--project'>
                              <Icon
                                key={project.id}
                                type='project'
                                theme='filled'
                                style={{ marginRight: 10 }}
                              />
                              {project.title}
                            </div>
                          ))
                        ) : (
                          <div style={{ marginTop: '15%' }}>
                            <span>You currently have no projects</span>
                            <div>
                              <Link to='/project'>
                                <Icon type='project' theme='filled' />
                                <a style={{ marginLeft: 10 }}>Create a project here</a>
                              </Link>
                            </div>
                          </div>
                        )
                      }
                    </div>
                    {
                      totalRecord > 3 ? (
                        <Link to='/project'>
                          <a>more projects</a>
                        </Link>
                      ) : (
                        null
                      )
                    }
                  </Col>
                </Row>
                <Row style={{ marginTop: '5%' }}>
                  <Col lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }}>
                    <div className='change-pw'>
                      <Title style={{ textAlign: 'left' }} level={4}>
                        Setting Account{' '}
                      </Title>
                      <ChangePassword
                        setPasswordUserProfileInformation={setPasswordUserProfileInformation}
                        email={user.email}
                        token={token}
                        getUserProfileInformation={getUserProfileInformation}
                        userId={this.state.id}
                      />
                      {
                        isChange
                          ? <div>
                            <Title style={{ textAlign: 'left', marginTop: 10 }} level={4}>
                              Change{' '}
                            </Title>
                            <Button type='primary' style={{ marginLeft: 3 }} onClick={this.handleSave}>
                              Save
                            </Button>
                            <Button type='danger' style={{ marginLeft: 3, marginTop: 3 }} onClick={this.handleCancel}>
                            Cancel
                            </Button>
                          </div>
                          : <></>
                      }
                    </div>
                  </Col>
                  <Col lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }}>
                    {/* {
                      totalRecord > 1 ? (
                        null
                      ) : (
                        <img
                          src={img}
                          style={{ width: 320 }}
                        />
                      )
                    } */}
                    <img
                      src={img}
                      style={{ width: 320 }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    )
  }
}

export default Form.create({ name: 'customized_form_controls' })(Profile)
