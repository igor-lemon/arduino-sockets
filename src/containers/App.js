import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.css'

class App extends React.Component {
  render() {
    const {children} = this.props
    return (
      <>
        {children}
        <ToastContainer />
      </>
    )
  }
}

export default App
