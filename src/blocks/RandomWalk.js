import Blockly from 'blockly'
import {
  FieldDropdown,
  FieldColour,
  FieldNumber,
  FieldTextInput
} from 'blockly'
import { DROPDOWN_VALUES } from './constants'
import { fakeSign } from '../config'

const { DRAWING_OBJECT_SHAPE, DRAWING_OBJECT_TEXT, LOOP_INFINITE } =
  DROPDOWN_VALUES
export const RandomWalkDefinition = {
  init() {
    // Drawing type
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_LEFT)
      .appendField('Walking man:')
    // position
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('x-coordinate:')
      .appendField(new FieldNumber(100, 1, 200), 'x')
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('y-coordinate:')
      .appendField(new FieldNumber(100, 1, 200), 'y')
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('speed:')
      .appendField(new FieldNumber(5, 1, 5), 'speed')
    // display style

    this.setInputsInline(false)
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#00bcd4')
    this.setTooltip('Hello World Text')
    this.setHelpUrl('')
  }
}

export const RandomWalkFunction = (block) => {
  const x = block.getFieldValue('x')
  const y = block.getFieldValue('y')
  const speed = block.getFieldValue('speed')
  const color = block.getFieldValue('color')

  var code = `laser.stroke("${color}");\nlaser.drawAnimation("man1", ${x}, ${y}, ${speed});\n`
  return code
}
