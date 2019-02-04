<template>
  <g
  text-anchor="end"
  :fill="strokeColor"
  :stroke="strokeColor"
  stroke-width="1">
    <line :y1="height"></line>
    <g v-for="(tick, i) in ticksList" :key="'tick' + i"
    :transform="`translate(0, ${tick.pos})`">
      <line x2="-6"></line>
      <text stroke-width="0.1" x="-9" dy="0.32em">{{tick.val}}</text>
    </g>
    <text transform="rotate(-90)" y="6" dy="0.71em" stroke-width="0.1">{{label}}</text>
  </g>
</template>

<script>
export default {
  name: 'cAxisY',
  props: {
    yPoints: {
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
    }
  },
  computed: {
    ticksList () {
      if (this.yPoints && this.yPoints.length > 0) {
        let list = []
        const min = this.$cChart.getMin(this.yPoints)
        const max = this.$cChart.getMax(this.yPoints)
        const d = (max - min) / (this.ticks)
        let o = min
        list.push({
          val: this.precision ? o.toPrecision(this.precision) : o,
          pos: this.ticks * (this.height / this.ticks)
        })
        for (let i = 1; i <= this.ticks; i++) {
          list.push({
            val: this.precision ? (o += d).toPrecision(this.precision) : (o += d),
            pos: (this.ticks - i) * (this.height / this.ticks)
          })
        }
        return list
      }
    },
    requiredProps () {
      return this.yPoints && this.yPoints.length > 0 && this.height
    },
    height () {
      return this.$parent.containerHeight
    }
  }
}
</script>
