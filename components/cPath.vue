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
      if (this.requiredProps) {
        let xPoints = []
        let yPoints = []
        const rawMinX = this.xRange ? this.xRange[0] : 0
        const rawMaxX = this.xRange ? this.xRange[1] : this.yPoints.length
        const amplify = 0.3
        const minX = rawMinX + this.zoomMin - (this.xOffset * amplify)
        const maxX = rawMaxX + this.zoomMax - (this.xOffset * amplify)
        /* maybe implement lvl of detail */
        // const lvl = this.lvlDetail || this.yPoints.length
        // x
        let loop = true
        let i = minX < 0 ? 0 : minX >= this.yPoints.length - 1 ? this.yPoints.length - 1 : Math.round(minX)
        while (loop && i < this.yPoints.length) {
          const pX = this.$cChart.scale(i, minX, maxX, this.width)
          if (pX >= this.width) loop = false
          const vY = this.yPoints[i]
          xPoints.push([pX, vY])
          i++
          // i += Math.floor(this.yPoints.length / lvl)
        }
        // y
        const minY = this.yRange ? this.yRange[0] : this.$cChart.getMin(xPoints, 1)
        const maxY = this.yRange ? this.yRange[1] : this.$cChart.getMax(xPoints, 1)
        for (let i = 0; i < xPoints.length; i++) {
          const pY = this.$cChart.scale(xPoints[i][1] - this.yOffset, minY, maxY, this.height, true)
          yPoints.push(pY)
        }
        xPoints.reverse()
        yPoints.reverse()
        let list = `M${xPoints[0][0]} ${yPoints[0]}`
        for (let i = 1; i < xPoints.length; i++) {
          list += ` L${xPoints[i][0]} ${yPoints[i]} `
        }
        this.$emit('change', [minX, maxX, minY, maxY])
        return list
      }
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
    zoomMin () {
      return this.$parent.zoomMin
    },
    zoomMax () {
      return this.$parent.zoomMax
    }
  }
}
</script>