import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as connectionActions from "../../actions/connectionActions"
import logo from '../../assets/logo.svg'
import './App.scss';
import {
  connectionInProgressStatusSelector,
  connectionIsConnectedStatusSelector
} from "../../selectors/connectionSelector";

const AppScreen = ({ setConnection, closeConnection, isConnected, isConnecting }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <Button
        type="primary"
        onClick={
          isConnected ?
            () => closeConnection() :
            () => setConnection({ address: '10.0.1.7', port: 81 })
        }
        danger={isConnected}
        loading={isConnecting}
      >
        {
          isConnected ? 'Disconnect' : 'Connect'
        }
      </Button>
    </header>
  </div>
)

const mapStateToProps = (state) => ({
  isConnected: connectionIsConnectedStatusSelector(state),
  isConnecting: connectionInProgressStatusSelector(state),
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...connectionActions,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppScreen);
