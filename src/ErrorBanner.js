import React from 'react'

export default function(props) {
  return (
    <div className="error">
      <span>
        Error: {props.error}
      </span>
    </div>
  )
}