<template>
  <g>
    <rect
      v-for="(item, i) in list"
      :key="i"
      :x="i * (width / list.length)"
      :y="item.v"
      :width="30"
      :height="height - item.v"
      fill="green"/>
  </g>
</template>

<script>
export default {
  name: 'bars',
  props: {
    dataset: {
      type: Array,
      required: true
    },
    column: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  computed: {
    list () {
      let list = []
      const max = this.$cc.getMax(this.dataset, this.column)
      const min = this.$cc.getMin(this.dataset, this.column)
      for (let i = 0; i < this.dataset.length; i++) {
        list.push({
          d: this.dataset[i][this.column],
          v: this.$cc.scale(this.dataset[i][this.column], min, max, this.height, true)
        })
      }
      return list
    }
  }
}
</script>
