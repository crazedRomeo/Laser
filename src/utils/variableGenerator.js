let currentIndex = 0

const variableGenerator = {
  getNewVariable: () => `laserVar_${currentIndex++}`
}

Object.freeze(variableGenerator)
export default variableGenerator
