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
    domainX: {
      type: Array,
      validator: v => v.length === 2
    },
    domainY: {
      type: Array,
      validator: v => v.length === 2
    }
  },
  created() {
    if (this.x) {
      if (this.x.length !== this.y.length) throw 'x and y length must match'
    }
  },
  data: () => ({
    d: ''
  }),
  methods: {
    drawPath (y, baseX, baseY) {
      const points = ['M']
      for (let i = 0; i < y.length; i++) {
        const px = this.x ? this.x[i] : i
        const py = y[i]
        if (isFinite(px) && isFinite(py)) {
          points.push(
            this.$cc.scale(px, this.xDomain[0], this.xDomain[1], baseX[0], baseX[1]),
            this.$cc.scale(py, this.yDomain[0], this.yDomain[1], baseY[0], baseY[1])
          )
        }
        else points.push('M')
      }
      this.d = points.join(' ')
    }
  },
  watch: {
    y: {
      handler (y) {
        this.drawPath(y, this.baseX, this.baseY)
      },
      immediate: true
    },
    baseX (b) {
      this.drawPath(this.y, b, this.baseY)
    },
    baseY (b) {
      this.drawPath(this.y, this.baseX, b)
    }
  },
  computed: {
    xDomain () {
      if (this.domainX) return this.domainX
      else if (this.x) return [this.$cc.getMin(this.x), this.$cc.getMax(this.x)]
      return [0, this.y.length]
    },
    yDomain () {
      if (this.domainY) return this.domainY
      return [this.$cc.getMin(this.y), this.$cc.getMax(this.y)]
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