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
    points: Array,
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: 'steelblue'
    },
    strokeWidth: {
      type: String,
      default: '1.5'
    },
    dasharray: {
      type: String,
      default: ''
    },
    rangeY: Array,
    rangeX: Array
  },
  computed: {
    pointsResult () {
      if (this.points && this.points.length > 0) {
        const minY = this.rangeY ? this.rangeY[0] : this.$utils.getMin(this.points)
        const maxY = this.rangeY ? this.rangeY[1] : this.$utils.getMax(this.points)
        const minX = this.rangeX ? this.rangeX[0] : this.$utils.getMin(this.points)
        const maxX = this.rangeX ? this.rangeX[1] : this.$utils.getMax(this.points)
        let xPoints = []
        let yPoints = []
        for (let i = 0; i < this.points.length; i++) {
          const pX = this.$utils.scale(i, minX, maxX, this.width)
          const pY = this.$utils.scale(this.points[i], minY, maxY, this.height, true)
          xPoints.push(pX)
          yPoints.push(pY)
        }
        xPoints.reverse()
        yPoints.reverse()
        let list = `M${xPoints[0]} ${yPoints[0]}`
        for (let i = 1; i < xPoints.length; i++) {
          list += ` L${xPoints[i]} ${yPoints[i]} `
        }
        return list
      }
    }
  }
}
</script>