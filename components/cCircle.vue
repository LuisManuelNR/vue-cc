<template>
  <circle :cx="x" :cy="y" :r="r" :stroke="strokeColor" :stroke-width="strokeWidth" :fill="color" />
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
    }
  }
}
</script>
