import * as R from 'ramda'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { eventChannel, END } from 'redux-saga'

const PONG = 'pong'

const EVENTS_LIST = [
  'connectingStart',
  'connectingEnd',
  'ping',
  'pong',
  'reconnect',
  'retryingPing',
]

class WebSocketConnection {
  constructor() {
    this.socket = null
  }

  createWebSocketConnection = ({ address, port, options = {} }, events) => {
    const appliedOptions = R.mergeRight({
      connectionTimeout: 1000,
      maxRetries: 5,
      debug: true,
      heartbeat: { send: "ping", receive: "pong", delay: 5000, timeout: 1000, retry: 3 }
    }, options)
    this.socket = new ReconnectingWebSocket(`ws://${address}:${port}`, [], appliedOptions)

    return new Promise((resolve, reject) => {
      this.socket.onopen = () => {
        console.log("ON OPEN", this.socket)
        resolve(this.socket)
      }

      this.socket.onclose = (event) => {
        reject({ message: "Connection was closed" })
      }
    })
  }

  createSocketChannel = () => eventChannel(emit => {
    this.socket.onmessage = (event) => {
      if (event.data !== PONG) {
        emit({ status: 'ok', message: event.data })
      }
    }

    this.socket.onerror = (event) => {
      emit({ status: 'error', message: event.data })
    }

    this.socket.onclose = () => {
      emit(END)
    }

    return () => {
      this.socket.close()
    }
  })

  closeSocketConnection = () => {
    this.socket.close()
  }

  subscribe = (type, callback) => {
    if (R.includes(type, EVENTS_LIST)) {
      this.socket.subscribe(type, callback)
    }
  }

  unsubscribe = (type, method) => {
    if (R.includes(type, EVENTS_LIST)) {
      this.socket.unsubscribe(type, method)
    }
  }
}

export default new WebSocketConnection()
