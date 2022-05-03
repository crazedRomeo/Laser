import React, { useState, useEffect } from 'react'
import Sketch from 'react-p5'
import CanvasControls from '../component/CanvasControls'
import { DevOptionsContext } from '../context/DevOptionsContext'
import { toP5Code } from '../utils/codeParser'
import LaserLibrary from '../libs/laserLib'

export const SIZE = [200, 200]

// eslint-disable-next-line no-unused-vars
let store = {}
// eslint-disable-next-line no-unused-vars
const lib = LaserLibrary

const Canvas = ({ code }) => {
  const [color, setColor] = useState('#EEF2FF')
  const [p5Code, setP5Code] = useState('')
  const { state, waiting } = React.useContext(DevOptionsContext)
  const setup = (p5, canvasParentRef) => {
    p5.frameRate(state.fps)
    p5.createCanvas(SIZE[0], SIZE[1]).parent(canvasParentRef)
    p5.textSize(42)
    p5.noFill()
    p5.rectMode(p5.CENTER)
    p5.angleMode(p5.DEGREES)
    p5.stroke('#ff0000')
  }
  const draw = (p5) => {
    p5.stroke('#ff0000') //reset default laser color
    p5.background(color)
    eval(p5Code)
  }
  const reset = () => {
    store = {}
  }

  useEffect(() => {
    reset()
    const [variableCode, drawingCode] = toP5Code(code)
    eval(variableCode)
    setP5Code(drawingCode)
  }, [code])

  return (
    <div className="flex items-center justify-items-center">
      <Sketch setup={setup} draw={draw} />
      <CanvasControls
        size={SIZE[1]}
        color={color}
        setColor={setColor}
        loadingPCode={waiting}
      />
    </div>
  )
}

export default Canvas
