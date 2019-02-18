const utils = {
  distance: (p1, p2) => {
    const xd = p1.x - p2.x
    const yd = p1.y - p2.y
    const distance = Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2))
    return distance
  },
  isInside: (point, vs) => {
    const x = point[0]
    const y = point[1]
    let inside = false
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      let xi = vs[i][0]
      let yi = vs[i][1]
      let xj = vs[j][0]
      let yj = vs[j][1]

      let intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      if (intersect) inside = !inside
    }
    return inside
  },
  randomNumber: (min, max) => {
    return Math.random() * (max - min) + min
  },
  getPolyArea: (vertices) => {
    let total = 0
    for (let i = 0, l = vertices.length; i < l; i++) {
      let addX = vertices[i][0]
      let addY = vertices[i === vertices.length - 1 ? 0 : i + 1][1]
      let subX = vertices[i === vertices.length - 1 ? 0 : i + 1][0]
      let subY = vertices[i][1]
      total += (addX * addY * 0.5)
      total -= (subX * subY * 0.5)
    }
    return Math.abs(total)
  },
  getMax: (data, key) => {
    let max = Number.NEGATIVE_INFINITY
    if (key) {
      for (let i = 0; i < data.length; i++) {
        max = data[i][key] > max ? data[i][key] : max
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        max = data[i] > max ? data[i] : max
      }
    }
    return max
  },
  getMin: (data, key) => {
    let min = Number.POSITIVE_INFINITY
    if (key) {
      for (let i = 0; i < data.length; i++) {
        min = data[i][key] < min ? data[i][key] : min
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        min = data[i] < min ? data[i] : min
      }
    }
    return min
  },
  // scale: (point, min, max, lenght, inverted) => {
  //   if (min === max) return point
  //   if (inverted) return lenght - (point - min) / (max - min) * lenght
  //   return (point - min) / (max - min) * lenght
  // },
  scale: (point, minD, maxD, minR, maxR) => {
    if (minD === maxD) return point
    const ratio = (maxR - minR) / (maxD - minD)
    return minR + ratio * (point - minD)
  },
  getRandomColor: () => `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`
}
export default utils
