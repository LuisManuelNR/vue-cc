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
    hTicks: {
      type: [Number, String],
      default: 6
    },
    vTicks: {
      type: [Number, String],
      default: 6
    }
  },
  data: () => ({
    vLines: [],
    hLines: [],
    vStep: null
  }),
  watch: {
    vTicks: {
      handler: function (t) {
        this.vStep = this.width / +t
        for (let i = 0; i < this.width; i += this.vStep) {
          this.vLines.push(i)
        }
      },
      immediate: true
    },
    hTicks: {
      handler: function (t) {
        const step = this.height / +t
        for (let i = 0; i < this.height; i += step) {
          this.hLines.push(i)
        }
      },
      immediate: true
    },
    z: function (z1, z2) {
      this.vLines.map((v, i) => {
        const tx1 = v - this.center[0]
        const tx2 = z1 > z2 ? tx1 * 1.1 : tx1 / 1.1
        const tx3 = tx2 + this.center[0]
        this.$set(this.vLines, i, tx3)
      })
      this.hLines.map((v, i) => {
        const tx1 = v - this.center[1]
        const tx2 = z1 > z2 ? tx1 * 1.1 : tx1 / 1.1
        const tx3 = tx2 + this.center[1]
        this.$set(this.hLines, i, tx3)
      })
    },
    xOffset: function (x) {
      this.vLines = this.vLines.map(v => v + x)
    },
    yOffset: function (y) {
      this.hLines = this.hLines.map(v => v + y)
    },
    vStep: function (s) {
      this.vLines = []
      for (let i = 0; i < this.width; i += this.vStep) {
        this.vLines.push(i)
      }
    }
  },
  computed: {
    height () {
      return this.$parent.containerHeight
    },
    width () {
      return this.$parent.containerWidth
    },
    xOffset () {
      return this.$parent.xOffset
    },
    yOffset () {
      return this.$parent.yOffset
    },
    center () {
      return this.$parent.zoom.center
    },
    z () {
      return this.$parent.zoom.k
    }
  }
}
</script>
