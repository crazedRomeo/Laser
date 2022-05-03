import React from 'react'

export default function Container({ className, ...props }) {
  return (
    <div className={`bg-white rounded-2xl ${className}`}>{props.children}</div>
  )
}
