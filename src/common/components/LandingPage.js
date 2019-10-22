import React, { Component } from 'react'
import { Row, Col, Layout, Carousel, Icon } from 'antd'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import './css/landingpage.css'
import './css/kapan.css'
import GoTop from './GoToTop'

// Import Image
import LogoBanana from './../../assets/images/landingpage/logo-banana.png'
import Logo from './../../assets/images/landingpage/logo.svg'
import Banner from './../../assets/images/landingpage/banner1.png'
import Service1 from './../../assets/images/landingpage/service1.png'
import Service2 from './../../assets/images/landingpage/service2.png'
import Service3 from './../../assets/images/landingpage/service3.png'
import Banner1 from './../../assets/images/landingpage/banner/tour1.png'
import Banner2 from './../../assets/images/landingpage/banner/tour2.png'
import Banner3 from './../../assets/images/landingpage/banner/tour3.png'
import Banner4 from './../../assets/images/landingpage/banner/tour4.png'

import User1 from './../../assets/images/landingpage/user/avatar1.png'
import User2 from './../../assets/images/landingpage/user/avatar2.png'
import User3 from './../../assets/images/landingpage/user/avatar3.png'
import User4 from './../../assets/images/landingpage/user/avatar4.png'

const { Header, Content, Footer } = Layout

export default class LandingPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prevScrollpos: window.pageYOffset,
      visible: true,
      isTop: true
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  // Adds an event listener when the component is mount.
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  // Hide or show the menu.
  handleScroll () {
    const { prevScrollpos } = this.state
    const currentScrollPos = window.pageYOffset
    const visible = prevScrollpos > currentScrollPos
    const isTop = currentScrollPos === 0

    this.setState({
      prevScrollpos: currentScrollPos,
      visible,
      isTop
    })
  }

  render () {
    return (
      <Layout style={{ background: '#ffff' }} className='bg-shape landing-page'>
        <Header
          className={classnames('header_area', {
            'header_area--hidden': !this.state.visible,
            'header_area--top': !this.state.isTop
          })}
          style={{
            width: '100%',
            padding: 10,
            height: 'auto',
            position: 'fixed'
          }}
        >
          <div className='main_menu'>
            <nav className='navbar navbar-light'>
              <Row className='container-nav'>
                <Col lg={{ span: 6 }} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                  <a className='navbar-brand logo_h' href='index.html'>
                    <img src={LogoBanana} alt='' />
                  </a>
                </Col>
                <Col className='text-right' lg={{ span: 12, offset: 6 }} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                  <Link to='/register-login'>
                    <p className='button button-signup'>Sign up | Login</p>
                  </Link>
                </Col>
              </Row>
            </nav>
          </div>
        </Header>
        {/* ================Header Menu Area ================= */}
        <Content>
          {/* ================Hero Banner Area Start ================= */}
          <section className='hero-banner magic-ball'>
            <div className='container'>
              <Row className='text-md-left' type='flex' justify='space-around' align='middle'>
                <Col className='mb-5' md={{ span: 24 }} lg={{ span: 13 }} xl={{ span: 11 }}>
                  <h1>Transform Ideas Into Action</h1>
                  <p>Visualize product roadmaps, project plans, and reports for effective team collaboration and putting into action that impact </p>
                  <div className='get-start'>
                    <input type='text' placeholder='Email here ...' />
                    <a className='button button-hero' href='#' style={{ marginTop: '1.5rem', textAlign: 'center' }}>Get Started</a>
                  </div>
                </Col>
                <Col md={{ span: 24 }} lg={{ span: 10, offset: 1 }} xl={{ span: 12, offset: 1 }}>
                  <img className='img-fluid' src={Banner} alt='' />
                </Col>
              </Row>
            </div>
          </section>
          {/* ================Hero Banner Area End ================= */}
          {/* ================Service Area Start ================= */}
          <section className='section-margin generic-margin'>
            <div className='container'>
              <div className='section-intro' style={{ textAlign: 'center', paddingBottom: '90px' }}>
                <img className='section-intro-img' src={Logo} alt='' />
                <h2>Our Popular Services</h2>
                <p>Fowl have fruit moveth male they are that place you will lesser</p>
              </div>
              <Row gutter={20}>
                <Col className='mb-4 mb-lg-0' md={{ span: 24 }} lg={{ span: 8 }}>
                  <div className='service-card' style={{ textAlign: 'center' }}>
                    <div className='service-card-img'>
                      <img className='img-fluid' src={Service1} alt='' />
                    </div>
                    <div className='service-card-body'>
                      <h3>Hotel Booking</h3>
                      <p>Great so dominion two seed give dry rule be fowl him female you will gathered creeping and created air</p>
                    </div>
                  </div>
                </Col>
                <Col className='mb-4 mb-lg-0' md={{ span: 24 }} lg={{ span: 8 }}>
                  <div className='service-card text-center'>
                    <div className='service-card-img'>
                      <img className='img-fluid' src={Service2} alt='' />
                    </div>
                    <div className='service-card-body'>
                      <h3>Flight Booking</h3>
                      <p>Great so dominion two seed give dry rule be fowl him female you will gathered creeping and created air</p>
                    </div>
                  </div>
                </Col>
                <Col className='mb-4 mb-lg-0' md={{ span: 24 }} lg={{ span: 8 }}>
                  <div className='service-card' style={{ textAlign: 'center' }}>
                    <div className='service-card-img'>
                      <img className='img-fluid' src={Service3} alt='' />
                    </div>
                    <div className='service-card-body'>
                      <h3>Destination Booking</h3>
                      <p>Great so dominion two seed give dry rule be fowl him female you will gathered creeping and created air</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </section>
          {/* ================Service Area End ================= */}
          {/* ================About Area Start ================= */}
          <section className='bg-gray section-padding magic-ball magic-ball-about'>
            <div className='container'>
              <Row type='flex' justify='space-around' align='middle'>
                <Col className='mb-4 mb-md-0' xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 12 }}>
                  <div className='about-img'>
                    <div className='board'>
                      <div className='header'>
                        <div className='title'>
                          <h3>Team Tasks</h3>
                        </div>
                      </div>
                      <div className='lists'>
                        <div className='list'>
                          <div className='list-content'>
                            <h5>Doing</h5>
                            <div className='card' data-aos='fade-right' data-aos-delay={500}>
                              <div className='card-content'>
                                <div className='labels'>
                                  <div className='label label-blue' />
                                </div> Client meeting
                                <div className='description'>
                                  <svg height={10} viewBox='0 0 16 10' width={16} xmlns='http://www.w3.org/2000/svg'>
                                    <path d='m1 0h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h8c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-8c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z' fill='#30364c' fillRule='evenodd' opacity='.3' />
                                  </svg>
                                </div>
                                <div className='card-users'>
                                  <div className='user'>
                                    <img src={User1} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='card' data-aos='fade-right' data-aos-delay={600}>
                              <div className='card-content'>
                                <div className='labels'>
                                  <div className='label label-red' />
                                </div> Plan webinar
                                <div className='description'>
                                  <svg height={10} viewBox='0 0 16 10' width={16} xmlns='http://www.w3.org/2000/svg'>
                                    <path d='m1 0h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h8c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-8c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z' fill='#30364c' fillRule='evenodd' opacity='.3' />
                                  </svg>
                                </div>
                                <div className='card-users'>
                                  <div className='user'>
                                    <img src={User4} />
                                  </div>
                                  <div className='user'>
                                    <img src={User3} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='card' data-aos='fade-right' data-aos-delay={700}>
                              <div className='card-content'>
                                <div className='labels'>
                                  <div className='label label-purple' />
                                </div> Send mail
                                <div className='description'>
                                  <svg height={10} viewBox='0 0 16 10' width={16} xmlns='http://www.w3.org/2000/svg'>
                                    <path d='m1 0h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h8c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-8c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z' fill='#30364c' fillRule='evenodd' opacity='.3' />
                                  </svg>
                                </div>
                                <div className='card-users'>
                                  <div className='user'>
                                    <img src={User2} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='add-card'> Add Todo..
                            </div>
                          </div>
                        </div>
                        <div className='list'>
                          <div className='list-content'>
                            <h5>Done</h5>
                            <div className='card' data-aos='fade-left' data-aos-delay={500}>
                              <div className='card-content'>
                                <div className='labels'>
                                  <div className='label label-red' />
                                </div> Pulish podcast
                                <div className='description'>
                                  <svg height={10} viewBox='0 0 16 10' width={16} xmlns='http://www.w3.org/2000/svg'>
                                    <path d='m1 0h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h8c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-8c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z' fill='#30364c' fillRule='evenodd' opacity='.3' />
                                  </svg>
                                </div>
                                <div className='card-users'>
                                  <div className='user'>
                                    <img src={User1} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='card' data-aos='fade-left' data-aos-delay={600}>
                              <div className='card-content'>
                                <div className='labels'>
                                  <div className='label label-blue' />
                                </div> Launch webinar
                                <div className='description'>
                                  <svg height={10} viewBox='0 0 16 10' width={16} xmlns='http://www.w3.org/2000/svg'>
                                    <path d='m1 0h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h8c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-8c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z' fill='#30364c' fillRule='evenodd' opacity='.3' />
                                  </svg>
                                </div>
                                <div className='card-users'>
                                  <div className='user'>
                                    <img src={User1} />
                                  </div>
                                  <div className='user'>
                                    <img src={User3} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='add-card'> Add Todo...
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className='about-content' xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 12 }} style={{ position: 'relative', alignSelf: 'center' }}>
                  <h2>Work with any team</h2>
                  <p>Whether it’s for work, a side project or even the next family vacation, Our helps your team stay organized.</p>
                  <a className='button' href='#'>Start Doing   →</a>
                </Col>
              </Row>
            </div>
          </section>
          {/* ================About Area End ================= */}
          {/* ================Tour section Start ================= */}
          <section className='section-margin pb-xl-5'>
            <div className='container'>
              <Row gutter={25}>
                <Col md={{ span: 24 }} lg={{ span: 12 }}>
                  <Row style={{ marginBottom: 16 }}>
                    <Col lg={{ span: 20, offset: 2 }}>
                      <div className='tour-content'>
                        <h2>We offer worldwise tour plan recently</h2>
                        <p>Make she'd moved divided air. Whose tree that hath own upon them it multiply was blessed </p>
                      </div>
                    </Col>
                  </Row>
                  <div className='tour-card'>
                    <img className='card-img rounded-0' src={Banner2} alt='' width='100%' />
                    <div className='tour-card-overlay'>
                      <div className='media'>
                        <div className='media-body'>
                          <h4>Running real time</h4>
                          <small>5 days offer</small>
                          <p>We proper guided our tourist</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={{ span: 24 }} lg={{ span: 12 }}>
                  <div className='tour-card'>
                    <img className='card-img rounded-0' src={Banner1} alt='' width='100%' />
                    <div className='tour-card-overlay'>
                      <div className='media'>
                        <div className='media-body'>
                          <h4>Running real time</h4>
                          <small>5 days offer</small>
                          <p>We proper guided our tourist</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row gutter={25}>
                <Col md={{ span: 24 }} lg={{ span: 14 }}>
                  <div className='tour-card'>
                    <img className='card-img rounded-0' src={Banner3} alt='' width='100%' />
                    <div className='tour-card-overlay'>
                      <div className='media'>
                        <div className='media-body'>
                          <h4>Easy to move tasks</h4>
                          <small>5 days offer</small>
                          <p>We proper guided our tourist</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={{ span: 24 }} lg={{ span: 10 }}>
                  <div className='tour-card'>
                    <img className='card-img rounded-0' src={Banner4} alt='' width='100%' />
                    <div className='tour-card-overlay'>
                      <div className='media'>
                        <div className='media-body'>
                          <h4>Friendly interface</h4>
                          <small>5 days offer</small>
                          <p>We proper guided our tourist</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </section>
          {/* ================Tour section End ================= */}
          {/* ================Testimonial section Start ================= */}
          <section className='bg-gray section-padding magic-ball magic-ball-testimonial pb-xl-5'>
            <div className='container'>
              <div className='section-intro text-center' style={{ paddingBottom: '90px' }}>
                <img className='section-intro-img' src={Logo} alt='' />
                <h2>Our client says</h2>
                <p>Fowl have fruit moveth male they are that place you will lesser</p>
              </div>
              <Carousel className='testimonial pb-xl-5'>
                <div className='testimonial__item'>
                  <Row>
                    <Col className='align-self-center' md={{ span: 6 }} lg={{ span: 4 }}>
                      <div className='testimonial__img'>
                        <img className='card-img rounded-0' src='img/testimonial/t-slider1.png' alt='' />
                      </div>
                    </Col>
                    <Col md={{ span: 18 }} lg={{ span: 20 }}>
                      <div className='testimonial__content mt-3 mt-sm-0'>
                        <h3>Daniel heart</h3>
                        <p>Project manager, Nestle</p>
                        <p className='testimonial__i'>Also made from. Give may saying meat there from heaven it lights face had is gathered god earth light for life may itself shall whales made they're blessed whales also made from give may saying meat. There from heaven it lights face had</p>
                        <span className='testimonial__icon'><i className='ti-quote-right' /></span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className='testimonial__item'>
                  <Row>
                    <Col className='align-self-center' md={{ span: 6 }} lg={{ span: 4 }}>
                      <div className='testimonial__img'>
                        <img className='card-img rounded-0' src='img/testimonial/t-slider1.png' alt='' />
                      </div>
                    </Col>
                    <Col md={{ span: 18 }} lg={{ span: 20 }}>
                      <div className='testimonial__content mt-3 mt-sm-0'>
                        <h3>Daniel heart</h3>
                        <p>Project manager, Nestle</p>
                        <p className='testimonial__i'>Also made from. Give may saying meat there from heaven it lights face had is gathered god earth light for life may itself shall whales made they're blessed whales also made from give may saying meat. There from heaven it lights face had</p>
                        <span className='testimonial__icon'><i className='ti-quote-right' /></span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className='testimonial__item'>
                  <Row>
                    <Col className='align-self-center' md={{ span: 6 }} lg={{ span: 4 }}>
                      <div className='testimonial__img'>
                        <img className='card-img rounded-0' src='img/testimonial/t-slider1.png' alt='' />
                      </div>
                    </Col>
                    <Col md={{ span: 18 }} lg={{ span: 20 }}>
                      <div className='testimonial__content mt-3 mt-sm-0'>
                        <h3>Daniel heart</h3>
                        <p>Project manager, Nestle</p>
                        <p className='testimonial__i'>Also made from. Give may saying meat there from heaven it lights face had is gathered god earth light for life may itself shall whales made they're blessed whales also made from give may saying meat. There from heaven it lights face had</p>
                        <span className='testimonial__icon'><i className='ti-quote-right' /></span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Carousel>
            </div>
          </section>
          {/* ================Testimonial section End ================= */}
        </Content>
        {/* ================ start footer Area ================= */}
        <Footer className='footer-area'>
          <div className='container'>
            <div className='footer-bottom'>
              <Row style={{ alignItems: 'center' }}>
                <Col className='footer-text m-0 text-center text-lg-left' lg={{ span: 16 }} sm={{ span: 24 }} style={{ margin: 0, color: 'white' }}>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved | This template is made with <i className='fa fa-heart' aria-hidden='true' /> by <a href='https://colorlib.com'>Colorlib</a>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </Col>
                <Col className='footer-social text-center text-lg-right' lg={{ span: 8 }} sm={{ span: 24 }}>
                  <a href='#'><Icon type='facebook' /></a>
                  <a href='#'><Icon type='twitter' /></a>
                  <a href='#'><Icon type='dribbble' /></a>
                  <a href='#'><Icon type='behance' /></a>
                </Col>
              </Row>
            </div>
          </div>
        </Footer>
        {/* ================ End footer Area ================= */}
        <GoTop scrollStepInPx='50' delayInMs='30' />
      </Layout>
    )
  }
}
