import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import {
  IoArrowForwardCircle,
  IoColorFill,
  IoDownload,
  IoPauseCircle,
  IoPlayCircle,
  IoRefreshCircle
} from 'react-icons/io5'
import { CgSpinnerAlt } from 'react-icons/cg'
import './index.css'

const CanvasControls = ({
  color,
  setColor,
  play: playAnimation,
  pause: pauseAnimation,
  reset,
  generatePCode,
  ...props
}) => {
  const [play, setPlay] = useState(true)
  const [refresh, setRefresh] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  return (
    <div
      className="w-10 flex flex-col justify-between ml-2"
      style={{ height: props.size }}
    >
      <div className="flex flex-col">
        <div
          className="btn btn-group-top border-b-2 border-indigo-200 px-2"
          onClick={() => {
            if (play) playAnimation()
            else pauseAnimation()
            setPlay(!play)
          }}
        >
          {play ? (
            <IoPauseCircle className="text-2xl" />
          ) : (
            <IoPlayCircle className="text-2xl" />
          )}
        </div>
        <div className="btn btn-group-bottom px-2 mb-2">
          <IoRefreshCircle
            className={`${refresh && 'animate-spin-once'} text-2xl`}
            onClick={() => {
              setRefresh(true)
              reset()
            }}
            onAnimationEnd={() => setRefresh(false)}
          />
        </div>
        <div
          className="btn px-2 mb-2"
          onClick={() => setShowPicker(!showPicker)}
        >
          <IoColorFill className="text-2xl" />
        </div>
        {showPicker && <HexColorPicker color={color} onChange={setColor} />}
      </div>
      <div
        className={
          props.loadingPCode ? 'btn-primary-disabled px-2' : 'btn-primary px-2'
        }
        onClick={() => (props.loadingPCode ? '' : generatePCode())}
      >
        {props.loadingPCode ? (
          <CgSpinnerAlt className="text-2xl animate-spin" />
        ) : props.downloadMode ? (
          <IoDownload class="text-2xl" />
        ) : (
          <IoArrowForwardCircle className="text-2xl" />
        )}
      </div>
    </div>
  )
}

export default CanvasControls
