import React, { Component } from 'react'
import { ToastContainer, Zoom } from 'react-toastify'

class Toast extends Component {
  render () {
    return (
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        transition={Zoom}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    )
  }
}
export default Toast
