import React from 'react'
import './css/profile.css'
import Profile from '../containers/ProfileUser'

class ProfileModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='App'>
        <Profile
          id={this.props.match.params.id}
        />
      </div>
    )
  }
}

export default ProfileModal
