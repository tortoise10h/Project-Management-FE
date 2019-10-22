import React from 'react'
import { Icon } from 'antd'

class GoTop extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      intervalId: 0,
      thePosition: false
    }
    this.onScrollStep = this.onScrollStep.bind(this)
    this.handleScrollToTop = this.handleScrollToTop.bind(this)
    this.renderGoTopIcon = this.renderGoTopIcon.bind(this)
  }

  componentDidMount () {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        this.setState({ thePosition: true })
      } else {
        this.setState({ thePosition: false })
      }
    })
    window.scrollTo(0, 0)
  }

  onScrollStep () {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId)
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
  }

  handleScrollToTop () {
    const intervalId = setInterval(this.onScrollStep, this.props.delayInMs)
    this.setState({ intervalId: intervalId })
  }

  renderGoTopIcon () {
    if (this.state.thePosition) {
      return (
        // <div className='go-top' onClick={this.handleScrollToTop}>
        //   Go Top
        // </div>
        <button
          title='Back to top' className='scroll'
          onClick={this.handleScrollToTop}
        >
          <Icon type='caret-up' style={{ color: '#fff' }} />
        </button>
      )
    }
  }

  render () {
    return <React.Fragment>{this.renderGoTopIcon()}</React.Fragment>
  }
}
export default GoTop
