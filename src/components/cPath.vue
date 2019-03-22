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
    x: Array, // TODO
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
    lvlDetail: [Number, String], // TODO
    pinY: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    d () {
      const midPos = this.origin === 0 ? this.width / 2 : this.origin
      const scalePosToIndex = Math.floor(this.$cc.scale(midPos, this.baseX[0], this.baseX[1], 0, this.y.length))
      const midIndex = scalePosToIndex < 0 ? 0 : scalePosToIndex > this.y.length ? this.y.length : scalePosToIndex
      const xs = []
      // x
      let i1 = midIndex
      let loop1 = true
      while (loop1 && i1 < this.y.length) {
        const x = this.$cc.scale(i1, 0, this.y.length, this.baseX[0], this.baseX[1])
        if (x > this.width) {
          loop1 = false
        } else {
          xs.push([
            x,
            this.y[i1]
          ])
          i1++
        }
      }
      xs.reverse()
      let i2 = midIndex - 1
      let loop2 = true
      while (loop2 && i2 >= 0) {
        const x = this.$cc.scale(i2, 0, this.y.length, this.baseX[0], this.baseX[1])
        if (x < 0) {
          loop2 = false
        } else {
          xs.push([
            x,
            this.y[i2]
          ])
          i2--
        }
      }
      // y
      const minY = this.pinY ? this.$cc.getMin(xs, 1) : this.$cc.getMin(this.y)
      const maxY = this.pinY ? this.$cc.getMax(xs, 1) : this.$cc.getMax(this.y)
      const p = xs.map(v => ([
        v[0],
        this.$cc.scale(v[1], minY, maxY, this.baseY[0], this.baseY[1])
      ]))
      let list = `M${p[0][0]} ${p[0][1]}`
      for (let i = 1; i < p.length; i++) {
        list += ` L${p[i][0]} ${p[i][1]} `
      }
      this.$emit('domainY', [minY, maxY])
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
    },
    origin () {
      return this.$parent.origin[0]
    }
  }
}
</script>