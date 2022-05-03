/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { SOCKET_URL } from '../config'
import axios from 'axios'

export const DevOptionsContext = React.createContext({})

export default function DevOptionsWrapper(props) {
  // almost certainly a better way to handle sockets
  // but at least with context all the wrong decisions are in one place.
  // TODO: Rxjs refactor?

  const [state, setState] = useState({
    laserProIp: SOCKET_URL,
    socketStatus: 3,
    pcodeDownload: false,
    fps: 5
  })
  const [socket, setSocket] = useState(null)
  const [waiting, setWaiting] = useState(false)

  const connect = (ipArg) => {
    console.log('laserproip state: ', state.laserProIp)
    let ip = ipArg ? ipArg : state.laserProIp
    let ws

    setState({ ...state, socketStatus: 0, laserProIp: ip })
    if (socket) socket.close()

    try {
      // eslint-disable-next-line no-undef
      ws = new WebSocket(`ws://${ip}:80/ws`)
    } catch (e) {
      console.error('Error trying to connect socket', e)
    } finally {
      ws.onopen = function () {
        setState({ ...state, socketStatus: 1, laserProIp: ip })
        setSocket(ws)
        console.log('onopen')
      }
      ws.onmessage = function (e) {
        let res = JSON.parse(e.data)
        console.log('onmessage:', res)
        if (
          res.command_sent === 'start_laser' &&
          res.response_status === 'success'
        ) {
          setWaiting(false)
        }
      }
      // eslint-disable-next-line no-unused-vars
      ws.onclose = function (e) {
        console.log('socket closed')
        setState({ ...state, socketStatus: 3 })
      }
      // eslint-disable-next-line no-unused-vars
      ws.onerror = function (e) {
        console.log('socket error')
        setState({ ...state, socketStatus: 3 })
      }
    }
  }

  const uploadPCODE = (file, pcode) => {
    console.log(file, pcode)
    let ip = state.laserProIp
    console.log(ip)
    console.log(pcode)
    console.log('sending')

    sendMessage(`{"command": "stop_laser"}`)

    axios
      .post(`http://${ip}/delete/${file}`)
      .then((res) => {
        //we don't care about the data, it doesn't even return anything
        console.log(res)

        axios.post(`http://${ip}/upload/${file}`, pcode).then((res2) => {
          console.log(res2)
          //hmm
          sendMessage(`{"command": "start_laser"}`)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // eslint-disable-next-line no-unused-vars
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'text/plain'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return response
  }

  const sendMessage = (payload) => {
    if (socket) {
      socket.send(payload)
    }
  }

  useEffect(() => {
    fetch('https://laserpro-discovery.herokuapp.com/')
      .then((response) => response.json())
      .then((data) => {
        const ip = data[0] ? data[0].priv_ip : undefined
        connect(ip)
      })
  }, [])

  return (
    <DevOptionsContext.Provider
      value={{
        state,
        setState,
        connect,
        sendMessage,
        waiting,
        setWaiting,
        uploadPCODE
      }}
    >
      {props.children}
    </DevOptionsContext.Provider>
  )
}
