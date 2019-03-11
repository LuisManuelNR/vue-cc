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
    range: {
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
  data: () => ({
    min: null,
    max: null
  }),
  created () {
    this.min = this.range[0]
    this.max = this.range[1]
  },
  computed: {
    ticksList () {
      let list = []
      const min = this.range[0]
      const max = this.range[1]
      const d = (this.max - this.min) / this.ticks
      for (let i = min; i <= max; i += d) {
        const pos = this.$cc.scale(i, this.min, this.max, this.height, 0)
        list.push({
          val: +i.toFixed(5),
          pos: pos
        })
      }
      return list
    },
    requiredProps () {
      return this.range && this.range.length > 0 && this.height
    },
    height () {
      return this.$parent.containerHeight
    }
  }
}
</script>