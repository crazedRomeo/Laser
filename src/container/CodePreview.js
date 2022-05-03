import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import tomorrow from 'react-syntax-highlighter/dist/esm/styles/hljs/tomorrow'
import { parseVariableCode } from '../utils/codeParser'

SyntaxHighlighter.registerLanguage('javascript', js)

/**
 * CodePreview.
 *
 * @param {code}
 */
export default function CodePreview({ code }) {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)
  const [variableCodes, normalCodes] = parseVariableCode(code)
  let vStr = variableCodes.replaceAll('\n', '\n    ')
  let nStr = normalCodes.replaceAll('\n', '\n        ')

  const str = `
    const main = (laser) => {
      let store = {};
      let sprites = {};
      let animations = {};
      ${vStr}

      laser.draw = function() {
        ${nStr}
      }
    }

    new p5(main, 'canvas');`
  return (
    <>
      <div className="text-red-600 pl-[40px]">
        {error ? error.toString() : null}
      </div>
      <SyntaxHighlighter
        wrapLines={true}
        lineProps={{ className: 'code-lineprop' }}
        language="javascript"
        style={tomorrow}
        showLineNumbers={true}
      >
        {str}
      </SyntaxHighlighter>
    </>
  )
}
