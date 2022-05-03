import { parse } from 'svg-parser'
import { range } from 'd3-array'
import * as pathologist from 'pathologist'

export const svgToPoints = (svg) => {
  let pathsOnly = pathologize(svg)

  let parsed = parse(pathsOnly)
  let pathElements = dominize(parsed.children[0].children)

  let shapes = []
  for (let path of pathElements) {
    let flatCoords = pathsToCoords([path])
    //we could optimize and remove duplicate coords, but this is already handled in the engine
    //if passing this around becomes too large, we could apply it here as well
    shapes.push(flatCoords)
  }

  //svgs can be multiple shapes, so we have to return an array of shapes
  return shapes
}

const pathologize = (original) => {
  const reText = /<text[\s\S]*?<\/text>/g
  const reStyle = /<style[\s\S]*?<\/style>/g
  const removedText = original.replace(reText, '')
  const removedStyle = removedText.replace(reStyle, '')

  try {
    const pathologized = pathologist.transform(removedStyle)
    return pathologized
  } catch (e) {
    return original
  }
}

const pathsToCoords = (paths, numPoints = 50) => {
  const totalLengthAllPaths = Array.from(paths).reduce((prev, curr) => {
    return prev + curr.getTotalLength()
  }, 0)

  let runningPointsTotal = 0
  const separatePathsCoordsCollection = Array.from(paths).reduce(
    (prev, item, index) => {
      let pointsForPath
      if (index + 1 === paths.length) {
        //ensures that the total number of points = the actual requested number (because using rounding)
        pointsForPath = numPoints - runningPointsTotal
      } else {
        pointsForPath = Math.round(
          (numPoints * item.getTotalLength()) / totalLengthAllPaths
        )
        runningPointsTotal += pointsForPath
      }
      return [...prev, ...polygonize(item)]
    },
    []
  )
  return separatePathsCoordsCollection
}

const polygonize = (
  path,
  numPoints = 50,
  scale = 0.5,
  translateX = 0,
  translateY = 0
) => {
  const length = path.getTotalLength()

  return range(numPoints).map(function (i) {
    const point = path.getPointAtLength((length * i) / numPoints)
    return [
      Math.round(point.x * scale + translateX),
      Math.round(point.y * scale + translateY)
    ]
  })
}

const dominize = (paths) => {
  let dominizedPaths = []
  for (let path of paths) {
    if (path.tagName !== 'path') continue
    if (path.properties === undefined || path.properties.d === undefined)
      continue

    let pathDOM = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    pathDOM.setAttribute('d', path.properties.d)

    dominizedPaths.push(pathDOM)
  }
  return dominizedPaths
}
