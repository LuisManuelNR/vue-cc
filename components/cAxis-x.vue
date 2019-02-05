<template>
  <g
  :fill="strokeColor"
  :stroke="strokeColor"
  stroke-width="1"
  :transform="`translate(0, ${height})`">
    <line x1="0" :x2="width"></line>
    <g v-for="(tick, i) in ticksList" :key="'tick' + i"
    :transform="`translate(${tick.pos}, 0)`">
      <line y2="6"></line>
      <text text-anchor="middle" stroke-width="0.1" y="9" dy="0.71em">{{tick.val}}</text>
    </g>
    <text text-anchor="left" x="0" y="-25" dx="1em" dy="0.71em" stroke-width="0.1">{{label}}</text>
  </g>
</template>

<script>
export default {
  name: 'cAxisX',
  props: {
    points: {
      type: Array,
      required: true
    },
    ticks: {
      type: [Number, String],
      default: 6
    },
    label: String,
    precision: [Number, String],
    strokeColor: {
      type: String,
      default: 'white'
    },
    byValue: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ticksList () {
      if (this.requiredProps) {
        let list = []
        const rawMin = this.byValue ? this.$cChart.getMin(this.points) : 0
        const rawMax = this.byValue ? this.$cChart.getMax(this.points) : this.points.length
        const amplify = 0.3
        const min = rawMin + this.zoomMin - (this.xOffset * amplify)
        const max = rawMax + this.zoomMax - (this.xOffset * amplify)
        let i = 0
        while (list.length <= this.ticks) {
          list.push({
            val: i,
            pos: this.$cChart.scale(i, min, max, this.width)
          })
          i += Math.round(this.points.length / this.ticks)
        }
        return list.reverse()
      }
    },
    requiredProps () {
      return this.points && this.points.length > 0 && this.width && this.height
    },
    height () {
      return this.$parent.containerHeight
    },
    width () {
      return this.$parent.containerWidth
    },
    xOffset () {
      return this.$parent.xOffset
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
