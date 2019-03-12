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
      const ticksPosition = this.$cc.generateTicks(this.base[0], this.base[1], +this.ticks)
      return ticksPosition.map(v => ({
        val: this.$cc.scale(v, this.base[0], this.base[1], this.domain[0], this.domain[1]).toFixed(1),
        pos: v
      }))
    },
    height () {
      return this.$parent.containerHeight
    },
    base () {
      return this.$parent.baseY
    }
  }
}
</script>