<template>
  <g
  :fill="strokeColor"
  :stroke="strokeColor"
  stroke-width="1"
  :transform="`translate(0, ${height})`">
    <line v-if="ticksList && ticksList.length > 0" :x1="ticksList[0].position" :x2="ticksList[ticksList.length - 1].position"></line>
    <g v-for="(tick, i) in ticksList" :key="'tick' + i"
    :transform="`translate(${tick.position}, 0)`">
      <line y2="6"></line>
      <text text-anchor="middle" stroke-width="0.1" y="9" dy="0.71em">{{tick.value}}</text>
    </g>
    <text text-anchor="left" :x="ticksList[0].position" y="-25" dx="-0.71em" dy="0.71em" stroke-width="0.1">{{label}}</text>
  </g>
</template>

<script>
export default {
  name: 'cAxisX',
  props: {
    xPoints: {
      type: Array,
      required: true
    },
    xRange: {
      type: Array
    },
    byValue: {
      type: Boolean,
      default: false
    },
    ticks: {
      type: Number,
      default: 6
    },
    label: {
      type: String
    },
    strokeColor: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    ticksList () {
      if (this.requiredProps) {
        const minX = this.xRange ? this.xRange[0] : this.byValue ? this.$cChart.getMin(this.xPoints) : 0
        const maxX = this.xRange ? this.xRange[1] : this.byValue ? this.$cChart.getMax(this.xPoints) : this.xPoints.length
        let list = []
        for (let i = 0; i < this.xPoints.length; i += Math.round(this.xPoints.length / this.ticks) ) {
          list.push({
            position: this.$cChart.scale(i, minX, maxX, this.width),
            value: this.xPoints[i].toPrecision(4)
          })
        }
        return list
      }
    },
    requiredProps () {
      return this.xPoints && this.xPoints.length > 0 && this.width && this.height
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
