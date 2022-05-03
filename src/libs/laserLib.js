const stepSize = {
  right: { x: -5, y: 0 },
  top: { x: 0, y: 5 },
  appear: { x: 0, y: 0 }
}

const toRadians = (a) => ((a % 360) / 180) * Math.PI
export default {
  movePoint: (x, y, targetX, targetY, direction) => {
    const step = stepSize[direction]
    let newX = x + step.x,
      newY = y + step.y

    if (direction === 'right' && targetX >= newX) {
      newX = targetX
    } else if (direction === 'top' && targetY <= newY) {
      newY = targetY
    }
    return [newX, newY]
  },
  drawShape: (p5, npoints, x, y, radius, base = 0) => {
    let a = base,
      i = 0,
      angle = 360 / npoints
    p5.beginShape()

    for (i = 0; i < npoints; i++, a += angle) {
      let sx = x + Math.cos(toRadians(a)) * radius
      let sy = y + Math.sin(toRadians(a)) * radius
      p5.vertex(sx, sy)
    }
    p5.endShape(p5.CLOSE)
  },
  translatePoint: (x, y, stepX, stepY, direction = 0) => {
    const newX = x + stepX * (direction ? -1 : 1),
      newY = y + stepY * (direction ? -1 : 1)
    return [newX, newY]
  },
  drawAnimation: (p5, name, x, y, step) => {
    
  }
}
