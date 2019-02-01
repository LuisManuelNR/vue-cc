<template>
  <svg width="100%" :height="height" :style="{'background-color': bgColor}">
    <g :transform="`translate(${marginLeft}, ${marginTop})`">
      <slot></slot>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'cRoot',
  props: {
    height: {
      type: [Number, String],
      default: 500
    },
    marginLeft: {
      type: Number,
      default: 40
    },
    marginTop: {
      type: [Number, String],
      default: 40
    },
    marginRight: {
      type: [Number, String],
      default: 20
    },
    marginBottom: {
      type: [Number, String],
      default: 30
    },
    bgColor: {
      type: String,
      default: '#292929'
    }
  },
  computed: {
    containerWidth () {
      return this.width - this.marginLeft - this.marginRight
    },
    containerHeight () {
      return this.height - this.marginTop - this.marginBottom
    },
    width () {
      return document.documentElement.clientWidth
    }
  }
}
</script>