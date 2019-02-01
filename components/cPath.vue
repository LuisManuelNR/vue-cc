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
    xRange: Array
  },
  computed: {
    pointsResult () {
      if (this.requiredProps) {
        const minY = this.yRange ? this.yRange[0] : this.$cChart.getMin(this.yPoints)
        const maxY = this.yRange ? this.yRange[1] : this.$cChart.getMax(this.yPoints)
        const minX = this.xRange ? this.xRange[0] : this.xPoints ? this.$cChart.getMin(this.xPoints) : 0
        const maxX = this.xRange ? this.xRange[1] : this.xPoints ? this.$cChart.getMax(this.xPoints) : this.yPoints.length
        let xPoints = []
        let yPoints = []
        let loop = true
        let i = 0
        while (loop && i < this.yPoints.length) {
          const x = this.xPoints ? this.xPoints[i] : i
          const pX = this.$cChart.scale(x, minX, maxX, this.width)
          const pY = this.$cChart.scale(this.yPoints[i], minY, maxY, this.height, true)
          xPoints.push(pX)
          yPoints.push(pY)
          i++
          if (pX >= this.width) loop = false
        }
        xPoints.reverse()
        yPoints.reverse()
        let list = `M${xPoints[0]} ${yPoints[0]}`
        for (let i = 1; i < xPoints.length; i++) {
          list += ` L${xPoints[i]} ${yPoints[i]} `
        }
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
    }
  }
}
</script>