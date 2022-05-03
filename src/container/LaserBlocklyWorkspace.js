import React, { useEffect, useState } from 'react'
import { BlocklyWorkspace } from 'react-blockly'
import Blockly from 'blockly'
import '../blocks'

const toolboxCategories = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Introduction',
      colour: '#00bcd4',
      contents: [
        {
          kind: 'block',
          type: 'hello_world'
        },
        {
          kind: 'block',
          type: 'intro_shape'
        }
      ]
    },
    {
      kind: 'category',
      name: 'Loops',
      colour: '#5ba55b',
      contents: [
        {
          kind: 'category',
          name: 'Movement',
          contents: [
            {
              kind: 'block',
              type: 'move_loops'
            },
            {
              kind: 'block',
              type: 'random_walk'
            }
          ]
        }
      ]
    },
    {
      kind: 'category',
      name: 'Logic',
      colour: '#5B80A5',
      contents: [
        {
          kind: 'block',
          type: 'controls_if'
        },
        {
          kind: 'block',
          type: 'logic_compare'
        },
        {
          kind: 'block',
          type: 'logic_operation'
        }
      ]
    },
    {
      kind: 'category',
      name: 'Loops',
      colour: '#5BA55B',
      contents: [
        {
          kind: 'block',
          type: 'controls_repeat_ext'
        },
        {
          kind: 'block',
          type: 'controls_whileUntil'
        },
        {
          kind: 'block',
          type: 'controls_for'
        },
        {
          kind: 'block',
          type: 'controls_flow_statements'
        }
      ]
    },
    {
      kind: 'category',
      name: 'Lists',
      colour: '#EA7190',
      contents: [
        {
          kind: 'block',
          type: 'lists_create_with'
        },
        {
          kind: 'block',
          type: 'lists_repeat'
        },
        {
          kind: 'block',
          type: 'lists_length'
        },
        {
          kind: 'block',
          type: 'lists_isEmpty'
        },
        {
          kind: 'block',
          type: 'lists_indexOf'
        },
        {
          kind: 'block',
          type: 'lists_getIndex'
        },
        {
          kind: 'block',
          type: 'lists_setIndex'
        },
        {
          kind: 'block',
          type: 'lists_split'
        },
        {
          kind: 'block',
          type: 'lists_sort'
        }
      ]
    },
    {
      kind: 'category',
      name: 'Math',
      colour: '#5B67A5',
      // colour: '#EA7190',
      contents: [
        {
          kind: 'block',
          type: 'math_arithmetic'
        },
        {
          kind: 'block',
          type: 'math_round'
        },
        {
          kind: 'block',
          type: 'math_random_int'
        },
        {
          kind: 'block',
          type: 'math_number'
        }
      ]
    },
    {
      kind: 'category',
      name: 'Text',
      colour: '#DF7C62',
      contents: [
        {
          kind: 'block',
          type: 'text'
        },
        {
          kind: 'block',
          type: 'text_length'
        }
      ]
    }
  ]
}
const LaserBlocklyWorkspace = ({ resized, xml, updateBlocklyCode }) => {
  const [workspaceInstance, setWorkspace] = useState()
  const resize = () => {
    if (workspaceInstance !== undefined) Blockly.svgResize(workspaceInstance)
  }
  const handleWorkspaceChange = (workspace) => {
    Blockly.svgResize(workspace)
    if (workspaceInstance === undefined) setWorkspace(workspace)
    updateBlocklyCode(Blockly.JavaScript.workspaceToCode(workspace), 'code')
    // TODO: find somewhere else to access workspace instance and disable orphans
    workspace.addChangeListener(Blockly.Events.disableOrphans)
  }

  useEffect(() => resize(), [resized])
  return (
    <BlocklyWorkspace
      className="width-100 fill-height"
      toolboxConfiguration={toolboxCategories}
      initialXml={xml.get}
      onXmlChange={xml.set}
      workspaceConfiguration={{
        scrollbarColour: '#000',
        renderer: 'thrasos',
        disable: false,
        grid: {
          spacing: 20,
          length: 3,
          colour: '#A5B4FC',
          snap: true
        }
      }}
      onWorkspaceChange={handleWorkspaceChange}
    />
  )
}

export default LaserBlocklyWorkspace
