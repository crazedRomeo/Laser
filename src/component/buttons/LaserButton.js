import React, { Fragment } from 'react'
import { IoFlash, IoFlashlight, IoFlashOff } from 'react-icons/io5'
import { Popover, Transition } from '@headlessui/react'
import { DevOptionsContext } from '../../context/DevOptionsContext'

export default function LaserButton() {
  const sendMessage = React.useContext(DevOptionsContext).sendMessage
  let btnClass = 'flex items-center text-sm p-2 font-semibold cursor-pointer'
  return (
    <Popover>
      <Popover.Button className="focus:outline-none">
        <div className="btn ml-4 px-2 ring-0 relative top-1">
          <IoFlashlight className="text-2xl" />
        </div>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 w-auto transform let-0 p-0">
          <div className="overflow-hidden rounded-md shadow-lg ring-0 flex flex-row">
            <div
              className={`${btnClass} rounded-l-md bg-indigo-500 active:bg-indigo-700 text-indigo-50`}
              onClick={() => {
                sendMessage('{"command": "start_laser"}')
              }}
            >
              <IoFlash className="inline text-md" />
            </div>
            <div
              className={`${btnClass} rounded-r-md text-indigo-500 bg-indigo-100 active:bg-indigo-50 border border-indigo-500`}
              onClick={() => {
                sendMessage('{"command": "stop_laser"}')
              }}
            >
              <IoFlashOff className="inline text-md " />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
