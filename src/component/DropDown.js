import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

export default function DropDown(props) {
  const mode = props.primary
    ? 'bg-indigo-500 text-indigo-50'
    : 'bg-indigo-100 text-indigo-500'
  return (
    <Popover className="relative">
      <Popover.Button className="focus:outline-none">
        {props.button}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 w-auto transform right-0">
          <div
            className={`overflow-hidden rounded-lg shadow-xl ring-0 flex flex-col ${mode} ${props.className}`}
          >
            {props.title && (
              <div className="text-md font-black mb-2">{props.title}</div>
            )}
            {props.children}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
