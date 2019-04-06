<template>
  <div>
    <c-root zoomable-x paneable-x margin-left="60">
    <g v-if="points.length > 2">
      <c-path :x="times" :y="points" strokeWidth="2" />
      <c-axis-x :domain="timeDomain" dataType="date" ticks="5" />
      <c-axis-y :domain="pointsDomain" ticks="5" />
      <c-circle v-for="(c, i) in circles" :key="i"
      :domain-x="timeDomain" :domain-y="pointsDomain" :x="c.x" :y="c.y" r="5" />
    </g>
  </c-root>
  <button @click="addCircle" >add circle</button>
  </div>
</template>

<script>
import c from '../'
import Vue from 'vue'
Vue.use(c)
export default {
  name: 'test',
  data: () => ({
    points: [],
    times: [],
    circles: []
  }),
  mounted () {
    let counter = 0
    setInterval(() => {
      this.points.push(Math.sin(counter * 0.2))
      this.times.push(new Date().getTime())
      counter++
    }, 1000)
  },
  methods: {
    addCircle () {
      this.circles.push({
        x: this.times[this.times.length - 1],
        y: this.points[this.points.length - 1]
      })
    }
  },
  computed: {
    pointsDomain () {
      return [this.$cc.getMin(this.points), this.$cc.getMax(this.points)]
    },
    timeDomain () {
      return [this.$cc.getMin(this.times), this.$cc.getMax(this.times)]
    }
  },
  watch: {
    points (p) {
      if (p.length > 120) {
        this.points.shift()
        this.times.shift()
      }
    }
  }
}
</script>