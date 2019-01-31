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
    hPoints: {
      type: Array,
      required: true
    },
    vPoints: Array,
    height: {
      type: [Number, String],
      required: true
    },
    width: {
      type: [Number, String],
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
      if (this.hPoints && this.hPoints.length > 0) {
        const minY = this.rangeY ? this.rangeY[0] : this.$utils.getMin(this.hPoints)
        const maxY = this.rangeY ? this.rangeY[1] : this.$utils.getMax(this.hPoints)
        const minX = this.rangeX ? this.rangeX[0] : this.$utils.getMin(this.hPoints)
        const maxX = this.rangeX ? this.rangeX[1] : this.$utils.getMax(this.hPoints)
        let xPoints = []
        let yPoints = []
        for (let i = 0; i < this.hPoints.length; i++) {
          const xToScale = this.vPoints ? this.vPoints[i] : i
          const pX = this.$utils.scale(xToScale, minX, maxX, this.width)
          const pY = this.$utils.scale(this.hPoints[i], minY, maxY, this.height, true)
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