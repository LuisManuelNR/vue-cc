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
    points: {
      type: Array,
      required: true
    },
    range: Array,
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
      if (this.requiredProps) {
        let list = []
        const min = this.$cChart.getMin(this.points)
        const max = this.$cChart.getMax(this.points)
        const currentMin = this.range[0] || this.$cChart.getMin(this.points)
        const currentMax = this.range[1] || this.$cChart.getMax(this.points)
        const d = (currentMax - currentMin) / this.ticks
        for (let i = currentMin; i <= currentMax; i += d) {
          const pos = this.$cChart.scale(i, currentMin, currentMax, this.height, true)
          list.push({
            val: i.toFixed(2),
            pos: pos
          })
        }
        // let i = min
        // while (list.length <= this.ticks) {
        //   list.push({
        //     val: i.toFixed(5),
        //     pos: this.$cChart.scale(i, min, max, this.height)
        //   })
        //   i += d
        // }
        return list
      }
    },
    requiredProps () {
      return this.points && this.points.length > 0 && this.height
    },
    height () {
      return this.$parent.containerHeight
    }
  }
}
</script>
