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
    pointsResult () {
      if (this.requiredProps) {
        let xPoints = []
        let yPoints = []
        const minX = this.xRange ? this.xRange[0] : 0
        const maxX = this.xRange ? this.xRange[1] : this.yPoints.length
        const midPoint = Math.round(((minX + maxX) / 2) - this.xOffset)
        // x.1
        const firstHalf = []
        let loopFirsHalf = true
        let iFisrtHalf = midPoint
        while (loopFirsHalf && iFisrtHalf >= 0) {
          const pX = this.$cChart.scale(iFisrtHalf + this.xOffset, minX, maxX, this.width)
          if (pX >= 0) {
            const vY = this.yPoints[iFisrtHalf]
            firstHalf.push([pX, vY])
          } else {
            loopFirsHalf = false
          }
          iFisrtHalf--
        }
        firstHalf.reverse()
        // x.2
        const secondHalf = []
        let loopSecondHalf = true
        let iSecondHalf = midPoint + 1
        while (loopSecondHalf && iSecondHalf < this.yPoints.length) {
          const pX = this.$cChart.scale(iSecondHalf + this.xOffset, minX, maxX, this.width)
          if (pX <= this.width) {
            const vY = this.yPoints[iSecondHalf]
            secondHalf.push([pX, vY])
          } else {
            loopSecondHalf = false
          }
          iSecondHalf++
        }
        // y
        const totalX = firstHalf.concat(secondHalf)
        const minY = this.yRange ? this.yRange[0] : this.$cChart.getMin(totalX, 1)
        const maxY = this.yRange ? this.yRange[1] : this.$cChart.getMax(totalX, 1)
        for (let i = 0; i < totalX.length; i++) {
          const pY = this.$cChart.scale(totalX[i][1] - this.yOffset, minY, maxY, this.height, true)
          xPoints.push(totalX[i][0])
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