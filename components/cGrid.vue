<template>
  <g>
    <!-- horizontal lines -->
    <line v-for="h in hLines" :key="'h-' + h"
      x1="0" :y1="h" :x2="width" :y2="h" stroke="#80808080" />
      <!-- vertical lines -->
      <line v-for="v in vLines.points" :key="'v-' + v"
      :x1="v" y1="0" :x2="v" :y2="height" stroke="#80808080" />
  </g>
</template>

<script>
export default {
  name: 'cGrid',
  props: {
    hTicks: {
      type: [Number, String],
      default: 10
    },
    vTicks: {
      type: [Number, String],
      default: 10
    }
  },
  data: () => ({
    vLines: {
      min: null,
      max: null,
      points: []
    },
    hLines: [],
    step: null
  }),
  watch: {
    vTicks: {
      handler: function (t) {
        this.vLines.min = this.vLines.min || 0
        this.vLines.max = this.vLines.max || this.width
        this.step = this.width / +t
        this.vLines.points = this.buildLines(this.vLines.min, this.vLines.max, this.step)
      },
      immediate: true
    },
    // hTicks: {
    //   handler: function (t) {
    //     const step = this.height / +t
    //     for (let i = 0; i < this.height; i += step) {
    //       this.hLines.push(i)
    //     }
    //   },
    //   immediate: true
    // },
    z: function (z1, z2) {
      const min = this.$cc.zoom(this.vLines.min, z2 - z1, this.center[0])
      const max = this.$cc.zoom(this.vLines.max, z2 - z1, this.center[0])
      this.step = (max - min) / +this.vTicks
      // console.log('antes de trans', this.step)
      // if (this.vLines.points.length > +this.vTicks + 5) this.step *= 2
      // if (this.vLines.points.length < +this.vTicks - 5) this.step /= 2
      // console.log('depues de trans', this.step)
      this.vLines.points = this.buildLines(min, max, this.step)
      // this.vLines = this.$cc.zoom(this.vLines, z2 - z1, this.center[0])
    },
    xOffset: function (x) {
      // this.vLines = this.vLines.map(v => v + x)
    },
    yOffset: function (y) {
      // this.hLines = this.hLines.map(v => v + y)
    }
  },
  methods: {
    buildLines (min, max, step) {
      const list = []
      const mid = (max + min) / 2
      // const mid = (this.vLines.max + this.vLines.min) / 2
      // const mid = this.center[0] === 0 ? (max + min) / 2 : this.center[0]
      let floop = true
      let fi = mid
      while (floop) {
        if (fi < 0) floop = false
        else {
          list.push(fi)
          fi -= step
        }
      }
      let sloop = true
      let si = mid + step
      while (sloop) {
        if (si > this.width) sloop = false
        else {
          list.push(si)
          si += step
        }
      }
      return list
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
