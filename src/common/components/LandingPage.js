import React, { Component } from 'react'
import { Row, Col, Layout, Modal, Button } from 'antd'
import './css/landingpage.css'
import './css/kapan.css'
import LogoBanana from './../../assets/images/landingpage/logo-banana.png'
import Banner from './../../assets/images/landingpage/banner1.png'

const { Header, Content, Footer } = Layout

export default class LandingPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      registerVisible: false
    }

    this.handleShowRegisterModal = this.handleShowRegisterModal.bind(this)
  }

  handleShowRegisterModal (e) {
    this.setState({ registerVisible: true })
  }

  render () {
    return (
      <Layout style={{ background: '#ffff' }} className='bg-shape'>
        <Header className='header_area' style={{ background: 'none', padding: 10, height: 'auto' }}>
          <div className='main_menu'>
            <nav className='navbar navbar-light'>
              <Row className='container-nav'>
                <Col lg={{ span: 6 }} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                  <a className='navbar-brand logo_h' href='index.html'>
                    <img src={LogoBanana} alt='' />
                  </a>
                </Col>
                <Col className='text-right' lg={{ span: 12, offset: 6 }} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                  <Button onClick={this.handleShowRegisterModal}>Login</Button>
                  <a className='button button-signup' href='#'>Sign up</a>
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
              <Row className='text-md-left' style={{ alignItems: 'center' }}>
                <Col className='mb-5 mb-md-0' md={{ span: 12 }} lg={{ span: 10 }}>
                  <h1>Transform Ideas Into Action</h1>
                  <p>Visualize product roadmaps, project plans, and reports for effective team collaboration and putting into action that impact </p>
                  <div className='get-start'>
                    <input type='text' placeholder='Enter your email' />
                    <a className='button button-hero' href='#' style={{ marginTop: '1.5rem' }}>Get Started</a>
                  </div>
                </Col>
                <Col md={{ span: 12 }} lg={{ span: 14 }} xl={{ span: 12, offset: 2 }}>
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
                <img className='section-intro-img' src='img/home/logo.svg' alt='' />
                <h2>Our Popular Services</h2>
                <p>Fowl have fruit moveth male they are that place you will lesser</p>
              </div>
              <Row>
                <Col className='mb-4 mb-lg-0' md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className='service-card' style={{ textAlign: 'center' }}>
                    <div className='service-card-img'>
                      <img className='img-fluid' src='img/home/service1.png' alt='' />
                    </div>
                    <div className='service-card-body'>
                      <h3>Hotel Booking</h3>
                      <p>Great so dominion two seed give dry rule be fowl him female you will gathered creeping and created air</p>
                    </div>
                  </div>
                </Col>
                <Col className='mb-4 mb-lg-0' md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className='service-card text-center'>
                    <div className='service-card-img'>
                      <img className='img-fluid' src='img/home/service2.png' alt='' />
                    </div>
                    <div className='service-card-body'>
                      <h3>Flight Booking</h3>
                      <p>Great so dominion two seed give dry rule be fowl him female you will gathered creeping and created air</p>
                    </div>
                  </div>
                </Col>
                <Col className='mb-4 mb-lg-0' md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className='service-card' style={{ textAlign: 'center' }}>
                    <div className='service-card-img'>
                      <img className='img-fluid' src='img/home/service3.png' alt='' />
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
              <Row>
                <Col className='mb-4 mb-md-0' md={{ span: 10 }} lg={{ span: 12 }}>
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
                                    <img src='./asset/image/landing/user/avatar1.png' />
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
                                    <img src='./asset/image/landing/user/avatar4.png' />
                                  </div>
                                  <div className='user'>
                                    <img src='./asset/image/landing/user/avatar3.png' />
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
                                    <img src='./asset/image/landing/user/avatar2.png' />
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
                                    <img src='./asset/image/landing/user/avatar1.png' />
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
                                    <img src='./asset/image/landing/user/avatar1.png' />
                                  </div>
                                  <div className='user'>
                                    <img src='./asset/image/landing/user/avatar3.png' />
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
                <Col className='about-content' md={{ span: 14 }} lg={{ span: 12 }} style={{ position: 'relative', alignSelf: 'center' }}>
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
              <Row className='row'>
                <Col className='col-md-6' md={{ span: 12 }}>
                  <div className='tour-card'>
                    <img className='card-img rounded-0' src='img/home/tour1.png' alt='' />
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
                <Col className='col-md-6' md={{ span: 12 }}>
                  <Row className='row'>
                    <Col className='col-lg-10 offset-lg-1' lg={{ span: 20 }}>
                      <div className='tour-content'>
                        <h2>We offer worldwise tour plan recently</h2>
                        <p>Make she'd moved divided air. Whose tree that hath own upon them it multiply was blessed </p>
                      </div>
                    </Col>
                  </Row>
                  <div className='tour-card'>
                    <img className='card-img rounded-0' src='img/home/tour2.png' alt='' />
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
              <Row className='row'>
                <Col className='col-md-6 col-lg-7' md={{ span: 12 }}>
                  <div className='tour-card'>
                    <img className='card-img rounded-0' src='img/home/tour3.png' alt='' />
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
                <Col className='col-md-6 col-lg-5' md={{ span: 12 }}>
                  <div className='tour-card'>
                    <img className='card-img rounded-0' src='img/home/tour4.png' alt='' />
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
              <div className='section-intro text-center pb-90px'>
                <img className='section-intro-img' src='img/home/logo.svg' alt='' />
                <h2>Our client says</h2>
                <p>Fowl have fruit moveth male they are that place you will lesser</p>
              </div>
              <div className='owl-carousel owl-theme testimonial pb-xl-5'>
                <div className='testimonial__item'>
                  <Row className='row'>
                    <Col className='col-md-3 col-lg-2 align-self-center' md={{ span: 6 }} lg={{ span: 4 }}>
                      <div className='testimonial__img'>
                        <img className='card-img rounded-0' src='img/testimonial/t-slider1.png' alt='' />
                      </div>
                    </Col>
                    <Col className='col-md-9 col-lg-10' md={{ span: 18 }} lg={{ span: 20 }}>
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
                  <Row className='row'>
                    <Col className='col-md-3 col-lg-2 align-self-center' md={{ span: 6 }} lg={{ span: 4 }}>
                      <div className='testimonial__img'>
                        <img className='card-img rounded-0' src='img/testimonial/t-slider1.png' alt='' />
                      </div>
                    </Col>
                    <Col className='col-md-9 col-lg-10' md={{ span: 18 }} lg={{ span: 20 }}>
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
                  <Row className='row'>
                    <Col className='col-md-3 col-lg-2 align-self-center' md={{ span: 6 }} lg={{ span: 4 }}>
                      <div className='testimonial__img'>
                        <img className='card-img rounded-0' src='img/testimonial/t-slider1.png' alt='' />
                      </div>
                    </Col>
                    <Col className='col-md-9 col-lg-10' md={{ span: 18 }} lg={{ span: 20 }}>
                      <div className='testimonial__content mt-3 mt-sm-0'>
                        <h3>Daniel heart</h3>
                        <p>Project manager, Nestle</p>
                        <p className='testimonial__i'>Also made from. Give may saying meat there from heaven it lights face had is gathered god earth light for life may itself shall whales made they're blessed whales also made from give may saying meat. There from heaven it lights face had</p>
                        <span className='testimonial__icon'><i className='ti-quote-right' /></span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </section>
          {/* ================Testimonial section End ================= */}
        </Content>
        {/* ================ start footer Area ================= */}
        <Footer className='footer-area'>
          <div className='container'>
            <div className='footer-bottom'>
              <Row className='row align-items-center'>
                <p className='col-lg-8 col-sm-12 footer-text m-0 text-center text-lg-left'>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved | This template is made with <i className='fa fa-heart' aria-hidden='true' /> by <a href='https://colorlib.com'>Colorlib</a>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </p>
                <Col className='col-lg-4 col-sm-12 footer-social text-center text-lg-right' lg={{ span: 8 }} sm={{ span: 24 }}>
                  <a href='#'><i className='fab fa-facebook-f' /></a>
                  <a href='#'><i className='fab fa-twitter' /></a>
                  <a href='#'><i className='fab fa-dribbble' /></a>
                  <a href='#'><i className='fab fa-behance' /></a>
                </Col>
              </Row>
            </div>
          </div>
        </Footer>
        {/* ================ End footer Area ================= */}
      </Layout>
    )
  }
}
