import React from 'react'
import logo from '../assets/images/logo.png'

const withSplashScreen = () => {
  return (
    <div className="SplashScreen-root">
      <img className="SplashScreen-img" src={logo} alt="" />
      Please wait while we load your app.
    </div>
  )
}

export default withSplashScreen