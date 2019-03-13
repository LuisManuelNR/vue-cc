<template>
  <path 
    fill="none"
    :stroke="color"
    stroke-linejoin="round"
    stroke-linecap="round"
    :stroke-width="strokeWidth"
    :stroke-dasharray="dasharray"
    :d="d"
    ></path>
</template>

<script>
export default {
  name: 'cPath',
  props: {
    y: {
      type: Array,
      required: true
    },
    x: Array,
    color: {
      type: String,
      default: 'steelblue'
    },
    strokeWidth: {
      type: [Number, String],
      default: '1.5'
    },
    dasharray: {
      type: [Number, String],
      default: ''
    },
    lvlDetail: [Number, String]
  },
  computed: {
    d () {
      const p = []
      const minY = this.$cc.getMin(this.y)
      const maxY = this.$cc.getMax(this.y)
      for (let i = 0; i < this.y.length; i++) {
        p.push([
          this.$cc.scale(i, 0, this.y.length, this.baseX[0], this.baseX[1]),
          this.$cc.scale(this.y[i], minY, maxY, this.baseY[0], this.baseY[1])
        ])
      }
      let list = `M${p[0][0]} ${p[0][1]}`
      for (let i = 1; i < p.length; i++) {
        list += ` L${p[i][0]} ${p[i][1]} `
      }
      console.log(p)
      return list
    },
    width () {
      return this.$parent.containerWidth
    },
    height () {
      return this.$parent.containerHeight
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