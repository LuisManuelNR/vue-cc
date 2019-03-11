<template>
  <path 
    fill="none"
    :stroke="color"
    stroke-linejoin="round"
    stroke-linecap="round"
    :stroke-width="strokeWidth"
    :stroke-dasharray="dasharray"
    :d="pointsResult"
    ></path>
</template>

<script>
export default {
  name: 'cPath',
  props: {
    yPoints: {
      type: Array,
      required: true
    },
    xPoints: Array,
    color: {
      type: String,
      default: 'steelblue'
    },
    strokeWidth: {
      type: [Number, String],
      default: '1.5'
    },
    dasharray: {
      type: [Number, String],
      default: ''
    },
    yRange: Array,
    xRange: Array,
    lvlDetail: [Number, String]
  },
  computed: {
    pointsResult () {
      let xPoints = []
      let yPoints = []
      const minX = this.xRange ? this.xRange[0] : 0
      const maxX = this.xRange ? this.xRange[1] : this.yPoints.length
      const offset = this.$cc.scale(this.xOffset, 0, this.width + this.zoom.k, minX, maxX) 
      const mid = Math.ceil(((maxX + minX) / 2) - offset)
      const midpoint = mid <= 0 ? 0 : mid >= this.yPoints.length - 1 ? this.yPoints.length - 1 : mid

      // x firstHalf
      let loopFH = true
      let iFH = midpoint
      while (loopFH && iFH >= minX) {
        let pX = this.$cc.scale(iFH, minX, maxX, -this.zoom.k, this.width + this.zoom.k)
        pX += this.xOffset
        if (pX <= 0) loopFH = false
        const vY = this.yPoints[iFH]
        xPoints.push([pX, vY])
        iFH--
      }
      xPoints.reverse()
      // x secondHalf
      let loopSH = true
      let iSH = midpoint + 1
      while (loopSH && iSH <= maxX - 1) {
        let pX = this.$cc.scale(iSH, minX, maxX, -this.zoom.k, this.width + this.zoom.k)
        pX += this.xOffset
        if (pX >= this.width) loopSH = false
        const vY = this.yPoints[iSH]
        xPoints.push([pX, vY])
        iSH++
      }
      // y
      const minY = this.yRange ? this.yRange[0] : this.$cc.getMin(xPoints, 1)
      const maxY = this.yRange ? this.yRange[1] : this.$cc.getMax(xPoints, 1)
      for (let i = 0; i < xPoints.length; i++) {
        const pY = this.$cc.scale(xPoints[i][1] - this.yOffset, minY, maxY, this.height, 0)
        yPoints.push(pY)
      }
      let list = `M${xPoints[0][0]} ${yPoints[0]}`
      for (let i = 1; i < xPoints.length; i++) {
        list += ` L${xPoints[i][0]} ${yPoints[i]} `
      }
      const test = this.$cc.scale(midpoint, minX, maxX, -this.zoom.k, this.width + this.zoom.k) + this.xOffset
      this.$emit('midpoint', test)
      // console.log(test)
      this.$emit('change', {minX: 0, maxX: xPoints.length, minY: minY, maxY: maxY, length: xPoints.length})
      return list
    },
    requiredProps () {
      return this.yPoints && this.yPoints.length > 0 && this.width && this.height
    },
    width () {
      return this.$parent.containerWidth
    },
    height () {
      return this.$parent.containerHeight
    },
    xOffset () {
      return this.$parent.xOffset
    },
    yOffset () {
      return this.$parent.yOffset
    },
    zoom () {
      return this.$parent.zoom
    }
  }
}
</script>