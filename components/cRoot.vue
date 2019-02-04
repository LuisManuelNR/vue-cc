<template>
  <svg width="100%" :height="height" :style="{'background-color': bgColor, 'user-select': 'none'}">
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
      type: [Number, String],
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
    },
    paneableX: {
      type: Boolean,
      default: false
    },
    paneableY: {
      type: Boolean,
      default: false
    },
    zoomable : {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    xOffset: 0,
    yOffset: 0,
    panEnabled: false,
    zoomMin: 0,
    zoomMax: 0
  }),
  mounted () {
    if (this.paneableX || this.paneableY) {
      this.$el.addEventListener('mousedown', this.enablePan)
      this.$el.addEventListener('mouseup', this.dissablePan)
      this.$el.addEventListener('mousemove', this.pan)
    }
    if (this.zoomable) {
      this.$el.addEventListener('wheel', this.zoom)
    }
  },
  beforeDestroy: function () {
    this.$el.removeEventListener('mousedown', this.enablePan)
    this.$el.removeEventListener('mouseup', this.dissablePan)
    this.$el.removeEventListener('mousemove', this.pan)
    this.$el.removeEventListener('wheel', this.zoom)
  },
  methods: {
    pan(e) {
      if (this.panEnabled) {
        if (this.paneableX) this.xOffset += e.movementX
        if (this.paneableY) this.yOffset += e.movementY
      }
    },
    enablePan () {
      this.panEnabled = true
    },
    dissablePan () {
      this.panEnabled = false
    },
    zoom (e) {
      const delta = e.wheelDelta ? e.wheelDelta * 0.02 : -e.deltaY
      this.zoomMin += delta
      this.zoomMax += -delta
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
