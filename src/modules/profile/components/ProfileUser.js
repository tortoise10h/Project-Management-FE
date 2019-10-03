import React from 'react'
import { Row, Col, Button, Icon, Typography, notification, DatePicker } from 'antd'
import { Link } from 'react-router-dom'
import ChangePassword from './ChangePassword'
import * as moment from 'moment'
import checkError from '../../../libraries/CheckError'

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
      labelAddress: 'Add your address here ...'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOnStartUpdate = this.handleOnStartUpdate.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.getProjects = this.getProjects.bind(this)
    this.getUserProfileInformation = this.getUserProfileInformation.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.cleanObj = this.cleanObj.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
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
    console.log('=========> TuLinh Debug: >: Profile -> handleChange -> labelProfileTitle', labelProfileTitle)
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
    console.log('=========> TuLinh Debug: >: Profile -> handleSave -> result', result)
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
    const { getUserProfileInformation, id } = this.props
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
      user
    })
    console.log('=========> TuLinh Debug: >: Profile -> getUserProfileInformation -> this.state.user', this.state.user)
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
    if (dateString !== user.birthday) {
      user.birthday = dateString
      this.setState({
        isChange: true,
        user
      })
    }
    console.log('=========> TuLinh Debug: >: Profile -> handleChangeDate -> this.state.user', this.state.user)
  }

  componentDidMount () {
    this.getUserProfileInformation()
    this.getProjects()
  }

  render () {
    const { setPasswordUserProfileInformation } = this.props
    const { projects, totalRecord, user, isChange } = this.state
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
                      src='https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-1/p160x160/52333431_897375050604803_8249361908973436928_n.jpg?_nc_cat=101&_nc_oc=AQnFJe1u2Pcb31sReUSuMcsowAMusrtrcDDKOJjxDheahVnn5LsDmOyys4bDv4L8fyQ&_nc_ht=scontent.fsgn2-1.fna&oh=9b0b236ee927952e48dd07224d94b4fd&oe=5E232EF5'
                      alt=''
                      class='img-rounded img-responsive img-size'
                      style={{ height: 230, marginTop: 30 }}
                    />
                    <Button className='btn-change'> Change Avatar </Button>
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
                      {/* <Paragraph
                        className='text-edit'
                        editable={{
                          onStart: (name = 'birthday') => this.handleOnStartUpdate(name),
                          onChange: this.handleChange
                        }}
                      >
                        {user.birthday}
                      </Paragraph> */}
                      <div>
                        <DatePicker value={moment(user.birthday, 'YYYY-MM-DD')} onChange={this.handleChangeDate} />
                      </div>
                    </div>
                  </Col>
                  <Col
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 9 }}
                    xl={{ span: 9 }}
                  >
                    <div className='info-link'>
                      <Title level={4}>Contact</Title>
                      <Icon
                        className='location-icon'
                        type='facebook'
                        theme='filled'
                      />
                      <Paragraph className='text-edit' editable>Linh Lee</Paragraph>
                      <Icon
                        className='location-icon'
                        type='instagram'
                        theme='filled'
                      />
                      <Paragraph className='text-edit' editable>linh.lee.20</Paragraph>
                      <Icon className='location-icon' type='twitter' />
                      <Paragraph className='text-edit' editable>linhlee.twt</Paragraph>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: '3%' }}>
                  <Col lg={{ span: 15 }} md={{ span: 24 }} sm={{ span: 24 }}>
                    <div className='list-project'>
                      <Title level={4}>List Project</Title>
                      {
                        projects && projects.slice(0, 3).map((project) => (
                          <div key={project.id} className='location-icon--project'>
                            <Icon
                              key={project.id}
                              type='check-square'
                              theme='filled'
                              style={{ marginRight: 10 }}
                            />
                            {project.title}
                          </div>
                        ))
                      }
                    </div>
                    {
                      totalRecord > 3
                        ? <Link to='/project'>
                          <a>more projects</a>
                        </Link>
                        : null
                    }
                  </Col>
                  <Col lg={{ span: 9 }} md={{ span: 24 }} sm={{ span: 24 }}>
                    <div className='change-pw'>
                      <Title style={{ textAlign: 'left' }} level={4}>
                        Setting Account{' '}
                      </Title>
                      <ChangePassword setPasswordUserProfileInformation={setPasswordUserProfileInformation} email={user.email} />
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
                </Row>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    )
  }
}

export default Profile
