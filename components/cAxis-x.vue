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
    range: {
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
      let list = []
      const min = this.range[0]
      const max = this.range[1]
      const step = (max - min) / this.ticks
      const minPx = -this.zoom.k + this.xOffset
      const maxPx = this.width + this.zoom.k + this.xOffset
      const mid = this.$cChart.scale((this.width / 2) + this.xOffset, minPx, maxPx, min, max)
      // first half
      let iFH = mid
      let loopFH = true
      while (loopFH) {
        let pos = this.$cChart.scale(iFH, min, max, minPx, maxPx)
        if (pos <= -2) {
          loopFH = false
        } else {
          list.push({
            val: +iFH.toFixed(1),
            pos: pos
          })
          iFH -= step
        }
      }
      // second half
      let iSH = mid + step
      let loopSH = true
      while (loopSH) {
        let pos = this.$cChart.scale(iSH, min, max, minPx, maxPx)
        if (pos >= this.width + 2) {
          loopSH = false
        } else {
          list.push({
            val: +iSH.toFixed(1),
            pos: pos
          })
          iSH += step
        }
      }
      this.$emit('midpoint', this.$cChart.scale(mid, min, max, minPx, maxPx))
      // this.$emit('newDomain', [newMin, newMax])
      return list
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
    zoom () {
      return this.$parent.zoom
    }
  }
}
</script>
