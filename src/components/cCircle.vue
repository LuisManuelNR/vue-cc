<template>
  <circle :cx="xPos" :cy="yPos" :r="r" :stroke="strokeColor" :stroke-width="strokeWidth" :fill="color" />
</template>

<script>
export default {
  name: 'cCircle',
  props: {
    x: {
      type: [Number, String],
      required: true
    },
    y: {
      type: [Number, String],
      required: true
    },
    r: {
      type: [Number, String],
      required: true
    },
    strokeColor: {
      type: String,
      default: 'black'
    },
    strokeWidth: {
      type: [Number, String],
      default: 3
    },
    color: {
      type: String,
      default: 'red'
    },
    domainX: Array,
    domainY: Array
  },
  computed: {
    xPos () {
      return !this.domainX
      ? this.x
      : this.$cc.scale(this.x, this.domainX[0], this.domainX[1], this.baseX[0], this.baseX[1])
    },
    yPos () {
      return !this.domainY
      ? this.y
      : this.$cc.scale(this.y, this.domainY[0], this.domainY[1], this.baseY[0], this.baseY[1])
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
