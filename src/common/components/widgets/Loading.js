import React from 'react'
import Lottie from '../../../libraries/Lottie'

export default () => (
  <div className='loading-session-body'>
    <div className='loading'>
      <h1
        style={{
          textAlign: 'center'
        }}
      >
        UNDER CONSTRUCT!
      </h1>
      <Lottie
        options={{
          animationData: require('../../../assets/animations/gears-animation.json')
        }}
        width='50%'
      />
    </div>
  </div>
)
