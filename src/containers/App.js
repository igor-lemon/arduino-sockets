import React from 'react'
import NotificationsSystem from 'reapop'
import theme from 'reapop-theme-wybo'

class App extends React.Component {
  render() {
    const {children} = this.props
    return (
      <>
        {children}
        <NotificationsSystem theme={theme} />
      </>
    )
  }
}

export default App
