<template>
  <g
  text-anchor="end"
  fill="white"
  stroke="white"
  stroke-width="1">
    <line :y1="height"></line>
    <g v-for="(tick, i) in ticksList" :key="'tick' + i"
    :transform="`translate(0, ${i * (height/(ticksList.length - 1))})`">
      <line x2="-6"></line>
      <text stroke-width="0.1" x="-9" dy="0.32em">{{tick}}</text>
    </g>
    <text transform="rotate(-90)" y="6" dy="0.71em" stroke-width="0.1">{{label}}</text>
  </g>
</template>

<script>
export default {
  name: 'cAxisY',
  props: {
    range: {
      type: Array,
      required: true
    },
    ticks: {
      type: Number
    },
    height: {
      type: Number,
      required: true
    },
    label: {
      type: String
    },
    fixed: {
      type: Number
    }
  },
  computed: {
    ticksList () {
      if (this.range && this.range.length > 0) {
        let list = []
        const min = this.range[0]
        const max = this.range[1]
        const d = (max - min) / (this.ticks - 1)
        let o = min
        list.push(this.fixed ? o.toFixed(this.fixed) : o)
        for (let i = 1; i < this.ticks; i++) {
          list.push(this.fixed ? (o += d).toFixed(this.fixed) : (o += d))
        }
        return list.reverse()
      }
    }
  }
}
</script>
