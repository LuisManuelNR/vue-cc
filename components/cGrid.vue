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
      required: true
    },
    vTicks: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    vLines () {
      return this.$cc.generateTicks(this.baseX[0], this.baseX[1], +this.vTicks)
    },
    hLines () {
      return this.$cc.generateTicks(this.baseY[0], this.baseY[1], +this.hTicks)
    },
    height () {
      return this.$parent.containerHeight
    },
    width () {
      return this.$parent.containerWidth
    },
    baseX () {
      return this.$parent.baseX
    },
    baseY () {
      return this.$parent.baseY
    }
  }
}
</script>
