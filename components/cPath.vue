<template>
  <path 
    fill="none"
    :stroke="color"
    stroke-linejoin="round"
    stroke-linecap="round"
    :stroke-width="strokeWidth"
    :stroke-dasharray="dasharray"
    :d="points"
    ></path>
</template>

<script>
export default {
  name: 'cPath',
  props: {
    dataset: {
      type: Array,
      required: true
    },
    y: {
      type: String,
      required: true
    },
    x: {
      type: String,
      required: true
    },
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
    rangeY: {
      type: Array
    },
    rangeX: {
      type: Array
    }
  },
  computed: {
    points () {
      if (this.dataset && this.dataset.length > 0) {
        const minY = this.rangeY ? this.rangeY[0] : this.$utils.getMin(this.dataset, this.y)
        const maxY = this.rangeY ? this.rangeY[1] : this.$utils.getMax(this.dataset, this.y)
        const minX = this.rangeX ? this.rangeX[0] : this.$utils.getMin(this.dataset, this.x)
        const maxX = this.rangeX ? this.rangeX[1] : this.$utils.getMax(this.dataset, this.x)
        let xPoints = []
        let yPoints = []
        for (let i = 0; i < this.dataset.length; i++) {
          xPoints.push(this.$utils.scale(this.dataset[i][this.x], minX, maxX, this.width))
          yPoints.push(this.$utils.scale(this.dataset[i][this.y], minY, maxY, this.height, true))
        }
        xPoints.reverse()
        yPoints.reverse()
        let list = `M${xPoints[0]} ${yPoints[0]}`
        for (let i = 1; i < this.dataset.length; i++) {
          list += ` L${xPoints[i]} ${yPoints[i]} `
        }
        return list
      }
    }
  }
}
</script>
