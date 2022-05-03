// eslint-disable-next-line no-unused-vars
import laserEngine from './laserEngine'
import codeCache from './codeCache'
import { fakeSign } from '../config'

// eslint-disable-next-line no-unused-vars
const laser = laserEngine

const isFakeCode = (str) => str.includes(fakeSign)
const removeFake = (str) => str.replaceAll(fakeSign, '')
export const parseVariableCode = (code, allowFake = true) => {
  const statements = code.split('\n')
  const variableCode = [],
    normalCode = []
  const variableSignatures = [{ signature: 'declare var ', code: 'store.' }]

  statements.forEach((item) => {
    let line = item
    if (isFakeCode(line) && !allowFake) return
    line = removeFake(line)
    const isVariable = variableSignatures.reduce((prev, current) => {
      if (prev) return prev
      return line.includes(current.signature) ? current : undefined
    }, undefined)

    if (isVariable) {
      variableCode.push(line.replaceAll(isVariable.signature, isVariable.code))
    } else {
      normalCode.push(line)
    }
  })

  return [
    variableCode.reduce((prev, current) => prev + current + '\n', ''),
    normalCode.reduce((prev, current) => prev + current + '\n', '')
  ]
}

export const toP5Code = (code) => {
  const statements = code.split('\n')
  const preComiled = [] //This is the code just before adding store variables

  statements.forEach((line) => {
    if (line.includes('laser.')) {
      codeCache.reset()
      eval(line)
      codeCache.get().forEach((item) => preComiled.push(item))
    } else {
      preComiled.push(line)
    }
  })
  return parseVariableCode(
    preComiled.reduce((prev, current) => prev + current + '\n', ''),
    false
  )
}
