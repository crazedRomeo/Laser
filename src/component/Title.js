import React from 'react'

export default function Title({ className, ...props }) {
  return (
    <div
      className={`box-border text-lg text-indigo-600 font-extrabold ${className}`}
    >
      {props.children}
    </div>
  )
}
