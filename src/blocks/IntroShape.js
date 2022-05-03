import Blockly, { FieldDropdown, FieldColour, FieldNumber } from 'blockly'
import { DISPLAY_STYLE } from './constants'

export const IntroShapeDefinition = {
  init() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('Draw Shape:')

    // number of sides
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('number of sides:')
      .appendField(new FieldNumber(3, 3, 10), 'sides_num')

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
      .appendField('size:')
      .appendField(new FieldNumber(42, 10, 80), 'size')

    // color
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('color:')
      .appendField(new FieldColour('#ff5722'), 'color')

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
    this.setColour('#8262D9')
    this.setTooltip('Shape')
    this.setHelpUrl('')
  }
}

export const IntroShapeFunction = (block) => {
  var sides_num = block.getFieldValue('sides_num')
  var x = block.getFieldValue('x')
  var y = block.getFieldValue('y')
  var size = block.getFieldValue('size')
  var color = block.getFieldValue('color')
  var display_style = block.getFieldValue('display_style')

  let code = `laser.stroke("${color}");\nlaser.displayShape(${
    sides_num || 0
  }, ${x}, ${y}, ${size || 42}, "${display_style}");\n`
  return code
}
