import codeCache from './codeCache'
import variableGenerator from './variableGenerator'
import { CANVAS_SIZE, STORE } from '../config'

const engine = {
  declareVar(name, value = 0) {
    codeCache.add(`declare var ${name} = ${value};`)
  },
  toVar(name) {
    return `${STORE}.${name}`
  },
  stroke(color) {
    codeCache.add(`p5.stroke("${color}");`)
  },
  textSize(size) {
    codeCache.add(`p5.textSize(${size});`)
  },
  push() {
    codeCache.add(`p5.push();`)
  },
  pop() {
    codeCache.add(`p5.pop();`)
  },
  translate(x, y) {
    codeCache.add(`p5.translate(${x}, ${y});`)
  },
  rotate(angle) {
    codeCache.add(`p5.rotate(${angle})`)
  },
  text(text, x, y, angle = 0) {
    this.push()
    this.translate(x, y)
    this.rotate(angle)
    codeCache.add(`p5.text('${text}', 0, 0);`)
    this.pop()
  },
  displayText(text, x, y, style) {
    const varX = variableGenerator.getNewVariable(),
      varY = variableGenerator.getNewVariable()

    if (style === 'right') {
      this.declareVar(varX, CANVAS_SIZE[0])
      this.declareVar(varY, y)
    } else if (style == 'top') {
      this.declareVar(varX, x)
      this.declareVar(varY, 0)
    } else if (style == 'appear') {
      this.declareVar(varX, x)
      this.declareVar(varY, y)
    }
    this.text(text, this.toVar(varX), this.toVar(varY))
    codeCache.add(
      `[store.${varX}, store.${varY}] = lib.movePoint(store.${varX}, store.${varY}, ${x}, ${y}, "${style}");`
    )
  },
  displayShape(num, x, y, size, style) {
    const varX = variableGenerator.getNewVariable(),
      varY = variableGenerator.getNewVariable()

    if (style === 'right') {
      this.declareVar(varX, CANVAS_SIZE[0])
      this.declareVar(varY, y)
    } else if (style == 'top') {
      this.declareVar(varX, x)
      this.declareVar(varY, 0)
    } else if (style == 'appear') {
      this.declareVar(varX, x)
      this.declareVar(varY, y)
    }
    codeCache.add(
      `lib.drawShape(p5, ${num}, store.${varX}, store.${varY}, ${size});`
    )
    codeCache.add(
      `[store.${varX}, store.${varY}] = lib.movePoint(store.${varX}, store.${varY}, ${x}, ${y}, "${style}");`
    )
  },
  rotateText(text, x, y, size, speed, count = 0) {
    const angle = variableGenerator.getNewVariable()
    this.declareVar(angle)
    this.textSize(size)
    this.text(text, x, y, this.toVar(angle))

    const statement = `${this.toVar(angle)} += ${speed};`
    this.addLoopCheck(count, [statement])
  },
  translateText(text, x, y, size, speed, count = 0) {
    const varX = variableGenerator.getNewVariable(),
      varY = variableGenerator.getNewVariable()
    this.declareVar(varX, x), this.declareVar(varY, y)
    this.textSize(size)
    this.text(text, this.toVar(varX), this.toVar(varY))
    const statement = `[store.${varX}, store.${varY}] = lib.translatePoint(store.${varX}, store.${varY}, ${speed}, ${speed});`
    this.addLoopCheck(count, [statement])
  },
  rotateShape(num, x, y, size, speed, count = 0) {
    const angle = variableGenerator.getNewVariable()
    this.declareVar(angle)
    codeCache.add(
      `lib.drawShape(p5, ${num}, ${x}, ${y}, ${size}, store.${angle});`
    )

    const statement = `${this.toVar(angle)} += ${speed};`
    this.addLoopCheck(count, [statement])
  },
  translateShape(num, x, y, size, speed, count = 0) {
    const varX = variableGenerator.getNewVariable(),
      varY = variableGenerator.getNewVariable()
    this.declareVar(varX, x), this.declareVar(varY, y)
    codeCache.add(
      `lib.drawShape(p5, ${num}, store.${varX}, store.${varY}, ${size});`
    )
    const statement = `[store.${varX}, store.${varY}] = lib.translatePoint(store.${varX}, store.${varY}, ${speed}, ${speed});`
    this.addLoopCheck(count, [statement])
  },
  drawAnimation(name, x, y, speed) {
    const varS = variableGenerator.getNewVariable()
    this.declareVar(varS, 0)
    codeCache.add(
      `lib.drawAnimation(p5, "${name}", ${x}, ${y}, Math.floor(store.${varS} / ${speed}))`
    )
    codeCache.add(`store.${varS} = store.${varS} + 1`)
  },
  addLoopCheck(count, statements) {
    if (count > 0) {
      const varC = variableGenerator.getNewVariable()
      this.declareVar(varC)
      this.if(`store.${varC} < ${count}`, [...statements, `store.${varC} += 1`])
    } else {
      statements.forEach((stmt) => codeCache.add(stmt))
    }
  },
  if(condition, statements) {
    codeCache.add(`if (${condition}) {`)
    statements.forEach((stmt) => codeCache.add(stmt))
    codeCache.add(`}`)
  }
}

export default engine
