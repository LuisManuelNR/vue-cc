<template>
  <g
  text-anchor="middle"
  :fill="strokeColor"
  :stroke="strokeColor"
  stroke-width="1"
  :transform="`translate(0, ${height})`">
    <line v-if="ticksList && ticksList.length > 0" :x1="ticksList[0].position" :x2="ticksList[ticksList.length - 1].position"></line>
    <g v-for="(tick, i) in ticksList" :key="'tick' + i"
    :transform="`translate(${tick.position}, 0)`">
      <line y2="6"></line>
      <text stroke-width="0.1" y="9" dy="0.71em">{{tick.value}}</text>
    </g>
    <text :x="ticksList[0].position" y="-25" dx="-0.71em" dy="0.71em" stroke-width="0.1">{{label}}</text>
  </g>
</template>

<script>
export default {
  name: 'cAxisX',
  props: {
    dataset: {
      type: Array,
      required: true
    },
    range: {
      type: Array
    },
    x: {
      type: String
    },
    ticks: {
      type: Number
    },
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    label: {
      type: String
    },
    strokeColor: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    ticksList () {
      if (this.dataset && this.dataset.length > 0) {
        const minX = this.range ? this.range[0] : this.$utils.getMin(this.dataset, this.x)
        const maxX = this.range ? this.range[1] : this.$utils.getMax(this.dataset, this.x)
        let list = []
        for (let i = 0; i < this.dataset.length; i += Math.round(this.dataset.length / this.ticks)) {
          list.push({
            position: this.$utils.scale(this.dataset[i][this.x], minX, maxX, this.width),
            value: this.dataset[i][this.x]
          })
        }
        return list.reverse()
      }
    }
  }
}
</script>
