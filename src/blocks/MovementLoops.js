import Blockly from 'blockly'
import {
  FieldDropdown,
  FieldColour,
  FieldNumber,
  FieldTextInput
} from 'blockly'
import { DROPDOWN_VALUES } from './constants'
import { fakeSign } from '../config'

const {
  DRAWING_OBJECT_SHAPE,
  DRAWING_OBJECT_TEXT,
  MOTION_TYPE_ROTATE,
  MOTION_TYPE_TRANSLATE,
  LOOP_INFINITE,
  LOOP_FINITE
} = DROPDOWN_VALUES
export const MovementLoopsDefinition = {
  init() {
    this.appendDummyInput('loop_select')
      .appendField('Loop:')
      .appendField(
        new FieldDropdown([
          [LOOP_INFINITE.label, LOOP_INFINITE.value],
          [LOOP_FINITE.label, LOOP_FINITE.value]
        ]),
        'loop_type'
      )

    // Drawing type
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('Drawing Object:')
      .appendField(
        new FieldDropdown([
          [DRAWING_OBJECT_SHAPE.label, DRAWING_OBJECT_SHAPE.value],
          [DRAWING_OBJECT_TEXT.label, DRAWING_OBJECT_TEXT.value]
        ]),
        'drawing_object'
      )

    // Number of slides if shape
    this.appendDummyInput('draw_param')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('Number of sides:', 'label')
      .appendField(new FieldNumber(3, 3, 10), 'sides_num')

    // Motion Type
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('Motion Type:')
      .appendField(
        new FieldDropdown([
          [MOTION_TYPE_ROTATE.label, MOTION_TYPE_ROTATE.value],
          [MOTION_TYPE_TRANSLATE.label, MOTION_TYPE_TRANSLATE.value]
        ]),
        'motion_type'
      )

    // color
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('color:')
      .appendField(new FieldColour('#ff5722'), 'color')
    // position
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('x-coordinate:')
      .appendField(new FieldNumber(100, 1, 200), 'x')
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('y-coordinate:')
      .appendField(new FieldNumber(100, 1, 200), 'y')
    // text size
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('size:')
      .appendField(new FieldNumber(30, 10, 100), 'size')
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('speed:')
      .appendField(new FieldNumber(5, 1), 'speed')
    // display style

    this.setInputsInline(false)
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour('#00bcd4')
    this.setTooltip('Hello World Text')
    this.setHelpUrl('')
  },
  // update input field when drawing object has changed
  onchange(event) {
    if (event.blockId != this.id) return
    if (event.type == Blockly.Events.BLOCK_CHANGE) {
      if (event.name === 'drawing_object') {
        const drawParamInput = this.getInput('draw_param')
        drawParamInput.removeField('label')
        if (event.oldValue === DRAWING_OBJECT_SHAPE.value) {
          drawParamInput.removeField('sides_num')
          drawParamInput
            .appendField('Draw text:', 'label')
            .appendField(new FieldTextInput('Hello World'), 'text')
        } else if (event.oldValue === DRAWING_OBJECT_TEXT.value) {
          drawParamInput.removeField('text')
          drawParamInput
            .appendField('Number of sides:', 'label')
            .appendField(new FieldNumber(3, 3, 10), 'sides_num')
        }
      } else if (event.name === 'loop_type') {
        const loopTypeSelect = this.getInput('loop_select')

        if (event.oldValue === LOOP_INFINITE.value) {
          loopTypeSelect
            .appendField('N = ', 'n_label')
            .appendField(new FieldNumber(10, 1), 'n_count')
        } else {
          loopTypeSelect.removeField('n_label')
          loopTypeSelect.removeField('n_count')
        }
      }
    }
  }
}

export const MovementLoopsFunction = (block) => {
  const text = block.getFieldValue('text')
  const sides = block.getFieldValue('sides_num')
  const x = block.getFieldValue('x')
  const y = block.getFieldValue('y')
  const n = block.getFieldValue('n_count')
  const size = block.getFieldValue('size')
  const speed = block.getFieldValue('speed')
  const color = block.getFieldValue('color')
  const drawingObject = block.getFieldValue('drawing_object')
  const motion = block.getFieldValue('motion_type')

  const func = motion + (drawingObject == 'shape' ? 'Shape' : 'Text')
  const value = text ? `'${text}'` : sides

  let code = `laser.stroke("${color}");\n` + `laser.textSize(${size});\n`

  if (n) {
    code +=
      `${fakeSign}for (var count = 0; count < ${n}; count ++) {\n` +
      `  laser.${func}(${value}, ${x}, ${y}, ${size}, ${speed}, ${n});\n` +
      `${fakeSign}}\n`
  } else {
    code +=
      `${fakeSign}while(true){\n` +
      `  laser.${func}(${value}, ${x}, ${y}, ${size}, ${speed});\n` +
      `${fakeSign}}\n`
  }
  return code
}
