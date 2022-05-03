import Blockly, {
  FieldTextInput,
  FieldDropdown,
  FieldColour,
  FieldNumber
} from 'blockly'
import { DISPLAY_STYLE } from './constants'

export const HelloWorldDefinition = {
  init() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('Draw text:')
      .appendField(new FieldTextInput('Hello World'), 'text')
    // color
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('color:')
      .appendField(new FieldColour('#ff5722'), 'color')
    // position
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('x-coordinate:')
      .appendField(new FieldNumber(100, 1), 'x')
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('y-coordinate:')
      .appendField(new FieldNumber(100, 1), 'y')
    // text size
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('text size:')
      .appendField(new FieldNumber(42, 10, 80), 'size')
    // display style
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('display style:')
      .appendField(
        new FieldDropdown([
          [
            DISPLAY_STYLE.FLY_IN_FROM_RIGHT.label,
            DISPLAY_STYLE.FLY_IN_FROM_RIGHT.value
          ],
          [
            DISPLAY_STYLE.FLY_IN_FROM_TOP.label,
            DISPLAY_STYLE.FLY_IN_FROM_TOP.value
          ],
          [DISPLAY_STYLE.APPEAR.label, DISPLAY_STYLE.APPEAR.value]
        ]),
        'display_style'
      )
    this.setInputsInline(false)
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#00bcd4')
    this.setTooltip('Hello World Text')
    this.setHelpUrl('')
  }
}

export const HelloWorldFunction = (block) => {
  var text = block.getFieldValue('text')
  var x = block.getFieldValue('x')
  var y = block.getFieldValue('y')
  var size = block.getFieldValue('size')
  var color = block.getFieldValue('color')
  var display_style = block.getFieldValue('display_style')

  var code = `laser.stroke("${color}");\nlaser.textSize(${
    size || 42
  });\nlaser.displayText("${text || ''}", ${x}, ${y}, "${display_style}");\n`
  return code
}
