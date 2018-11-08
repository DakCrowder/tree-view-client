import React from 'react'

export default function(props) {
  return (
    <div className={'node'}>
      <div className={'node-x-connector'}>
        <div className={'node-y-connector'}/>
      </div>
      <div className="number">
        {props.node.number}
      </div>
    </div>
  )
}