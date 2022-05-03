import React, { useState } from 'react'
import Split from 'react-split'
import Navbar from './container/Navbar'
import LaserBlocklyWorkspace from './container/LaserBlocklyWorkspace'
import CodePreview from './container/CodePreview'
import Canvas from './container/Canvas'
import Title from './component/Title'
import SectionHolder from './component/SectionHolder'
import { CANVAS_SIZE } from './config'
import './App.css'

const initialXml =
  '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="start_block" disable="false" deletable="false" x="50" y="70"></block></xml>'
const responsive_m = 'xl:m-6 lg:m-4 m-2'
const responsive_p = 'xl:p-6 lg:p-4 p-2'

function App() {
  const [sizes, setSizes] = useState([10, 10])
  const [xml, setXml] = useState(initialXml)
  const [blocklyCode, setBlocklyCode] = useState('')

  return (
    <div className="App flex flex-col h-screen">
      <Navbar className="navbar" />
      <Split
        className="split text-gray-700"
        minSize={300}
        onDragEnd={(v) => setSizes(v)}
      >
        <SectionHolder className="xl:m-6 lg:m-4 m-2">
          <div className="w-full flex items-center justify-between py-4 px-6">
            <Title>Block Workspace</Title>
          </div>
          <LaserBlocklyWorkspace
            resized={sizes[0]}
            xml={{ get: xml, set: setXml }}
            updateBlocklyCode={setBlocklyCode}
          ></LaserBlocklyWorkspace>
        </SectionHolder>
        <Split
          className="h-full"
          direction="vertical"
          minSize={CANVAS_SIZE[0] + 150}
        >
          <div className={`${responsive_p} w-full h-full`}>
            <div className="w-full flex items-center justify-between py-4 px-6">
              <Title>Code</Title>
            </div>
            <div className={`${responsive_m}`}>
              <CodePreview code={blocklyCode} />
            </div>
          </div>
          <div className="xl:p-6 lg:p-4 p-2 box-border h-full">
            <SectionHolder className="h-full flex flex-col items-center">
              <div
                id="hidden-p5"
                className="absolute w-10 h-10 hidden flex-grow-0"
              ></div>
              <div className="w-full flex items-center justify-between pt-2 px-2 md:pt-3 md:px-5 lg:pt-4 lg:px-6 md:mb-4 sm:mb-2">
                <Title>Preview</Title>
              </div>
              <div className="flex items-center lg:flex-grow">
                <Canvas code={blocklyCode} />
              </div>
            </SectionHolder>
          </div>
        </Split>
      </Split>
    </div>
  )
}

export default App
