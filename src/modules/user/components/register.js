import React from 'react'
import './css/style.css'
import loginImg from '../../login.svg'

export class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='base-container' ref={this.props.containerRef}>
        <div className='header'>Register</div>
        <div className='content'>
          <div className='image'>
            <img src={loginImg} />
          </div>
          <div className='form'>
            <div className='form-group'>
              <label htmlFor='username'>Fullname</label>
              <input type='text' name='fullname' placeholder='Fullname' />
            </div>

            <div className='combine'>
              <div className='form-group' id='group-inline'>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' placeholder='username' />
              </div>
              <div className='form-group' id='group-inline'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' placeholder='password' />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' placeholder='email' />
            </div>
            <div className='form-group'>
              <label htmlFor='username'>Phone</label>
              <input type='number' name='phone' placeholder='Phone' />
            </div>
          </div>
        </div>
        <a href='#' className='Login'>
          <span />
          <span />
          <span />
          <span />
                    Register
        </a>
      </div>
    )
  }
}
