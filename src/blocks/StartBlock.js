import { JavaScript } from 'blockly'

export const StartBlockDefinition = {
  init() {
    this.appendDummyInput().appendField('Variables:')
    this.appendStatementInput('variables').setCheck(['var_init'])
    this.appendDummyInput().appendField('Start')
    this.setNextStatement(true, null)
    this.setColour('#374151')
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

export const StartBlockFunction = (block) => {
  // var variables = JavaScript.statementToCode(block, 'variables')

  return ''
}
