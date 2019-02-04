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
  data: () => ({
    localOffset: 3
  }),
  computed: {
    testPoints () {
      let start = this.xRange ? this.xRange[0] : 0
      let end = this.xRange ? this.xRange[1] : this.yPoints.length
      const midPoint = Math.round((start + end) / 2)
      const firstHalf = []
      const secondHalf = []
      for (let i = midPoint; i >= start; i--) {
        firstHalf.push(this.yPoints[i])
      }
      firstHalf.reverse()
      for (let i = midPoint + 1; i <= end; i++) {
        secondHalf.push(this.yPoints[i])
      }
      return firstHalf.concat(secondHalf)
    },
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
          const pX = this.$cChart.scale(x + this.xOffset, minX, maxX, this.width)
          const pY = this.$cChart.scale(this.yPoints[i] - this.yOffset, minY, maxY, this.height, true)
          if (pX >= -250) {
            xPoints.push(pX)
            yPoints.push(pY)
          }
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
    },
    xOffset () {
      return this.$parent.xOffset
    },
    yOffset () {
      return this.$parent.yOffset
    }
  }
}
</script>