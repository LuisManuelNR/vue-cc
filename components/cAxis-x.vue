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
    domain: {
      type: Array,
      default: () => [0, 1]
    },
    ticks: {
      type: [Number, String],
      default: 10
    },
    label: String,
    strokeColor: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    ticksList () {
      const ticksPosition = this.$cc.generateTicks(this.domain[0], this.domain[1], +this.ticks)
      return ticksPosition.map(v => ({
        val: v,
        // pos: this.$cc.scale(v, this.domain[0], this.domain[1], this.base[0], this.base[1])
        pos: this.$cc.scale(v, this.domain[0], this.domain[1], this.base[0], this.base[1])
      }))
    },
    height () {
      return this.$parent.containerHeight
    },
    width () {
      return this.$parent.containerWidth
    },
    base () {
      return this.$parent.baseX
    }
  }
}
</script>