// import ticks from '../ticks'
const cc = {
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
  scale (point, minD, maxD, minR, maxR) {
    if (minD === maxD) return point
    const ratio = (maxR - minR) / (maxD - minD)
    return minR + ratio * (point - minD)
  },
  // zoom (point, z, centroid) {
  //   return centroid + z * (point - centroid)
  // },
  zoom (point, z, centroid) {
    const t = point - centroid
    const zoom = z < 0 ? t / 1.1 : t * 1.1
    return zoom + centroid
  },
  getRandomColor: () => `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`,

  generateTicks (min, max, count, domain) {
    let list = []
    const step = (max - min) / count
    for (let i = min; i <= max; i += step) {
      list.push({
        val: this.scale(i, min, max, domain[0], domain[1]).toFixed(1),
        pos: i
      })
    }
    return list
  }
}
export default cc
