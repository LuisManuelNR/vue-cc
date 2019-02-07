<template>
  <g>
    <!-- horizontal lines -->
    <line v-for="h in hLines" :key="'h-' + h"
      x1="0" :y1="h" :x2="width" :y2="h" stroke="#80808080" />
      <!-- vertical lines -->
      <line v-for="v in vLines" :key="'v-' + v"
      :x1="v" y1="0" :x2="v" :y2="height" stroke="#80808080" />
  </g>
</template>

<script>
export default {
  name: 'cGrid',
  props: {
    hTicks: [Number, String],
    vTicks: [Number, String]
  },
  computed: {
    hLines () {
      const ticks = []
      const d = this.height / +this.hTicks
      for (let i = 0; i <= +this.hTicks; i++) {
        ticks.push(i * d)
      }
      return ticks
    },
    vLines () {
      {
        let ticks = []
        const min = this.zoomMin
        const max = this.width + this.zoomMax
        const step = this.width / this.vTicks
        let i = 0
        while (ticks.length < +this.vTicks) {
          let pos = this.$cChart.scale(i + this.xOffset, min, max, this.width)
          ticks.push(pos)
          if (pos < 0) ticks.shift()
          i += step
        }
        // const test = this.width / 2
        // const pos = this.$cChart.scale(test + this.xOffset, min, max, this.width)
        // ticks.push(pos)
        return ticks
      }
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
