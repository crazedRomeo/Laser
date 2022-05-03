import React from 'react'
import LaserButton from '../component/buttons/LaserButton'
import { DevOptionsContext } from '../context/DevOptionsContext'
import { CgSpinnerAlt } from 'react-icons/cg'
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5'

export default function Navbar({ className, ...props }) {
  return (
    <header
      className={`flex justify-between w-full bg-white p-1 px-2 lg:p-4 md:px-4 lg:px-6 box-border ${className}`}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-indigo-300"></div>
        <div className="flex flex-col ml-2">
          <div className="w-20 h-2 mb-2 rounded-full bg-indigo-200"></div>
          <div className="w-16 h-2 rounded-full bg-indigo-100"></div>
        </div>
      </div>
      <div className="flex items-center">
        {props.children}
        <LaserButton />
        <ConnectionStatus />
      </div>
    </header>
  )
}

const ConnectionStatus = () => {
  const { connect } = React.useContext(DevOptionsContext)
  let statusIcon = (socketStatus) => {
    switch (socketStatus) {
      case 0:
        return (
          <CgSpinnerAlt className="text-2xl text-yellow-400 animate-spin bezier-ease" />
        )
      case 1:
        return <IoCheckmarkCircle className="text-2xl text-green-400" />
      case 3:
        return <IoCloseCircle className="text-2xl text-red-400" />
      default:
        return <IoCloseCircle className="text-2xl text-red-400" />
    }
  }
  return (
    <DevOptionsContext.Consumer>
      {(value) => (
        <div
          className="btn ml-4 px-2 ring-0"
          onClick={() => {
            // eslint-disable-next-line no-undef
            fetch('https://laserpro-discovery.herokuapp.com/')
              .then((response) => response.json())
              .then((data) => {
                const ip = data[0] ? data[0].priv_ip : undefined
                ip ? connect(ip) : connect()
              })
          }}
        >
          {statusIcon(value.state.socketStatus)}
        </div>
      )}
    </DevOptionsContext.Consumer>
  )
}
