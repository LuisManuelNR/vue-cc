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
      default: 40
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
    zoomableX: {
      type: Boolean,
      default: false
    },
    zoomableY: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    origin: [0, 0],
    baseX: [0, 0],
    baseY: [0, 0],
    panEnabled: false,
    zoom: 1,
    width: 1000
  }),
  mounted () {
    this.setWidth()
    window.addEventListener('resize', this.setWidth)
    this.$set(this.baseX, 1, this.containerWidth)
    this.$set(this.baseY, 0, this.containerHeight)
    if (this.paneableX || this.paneableY) {
      this.$el.addEventListener('mousedown', this.enablePan)
      this.$el.addEventListener('mouseup', this.dissablePan)
      this.$el.addEventListener('mousemove', this.pan)
    }
    if (this.zoomableX || this.zoomableY) {
      this.$el.addEventListener('wheel', this.onZoom)
    }
  },
  beforeDestroy: function () {
    this.$el.removeEventListener('mousedown', this.enablePan)
    this.$el.removeEventListener('mouseup', this.dissablePan)
    this.$el.removeEventListener('mousemove', this.pan)
    this.$el.removeEventListener('wheel', this.onZoom)
    window.removeEventListener('resize', this.setWidth)
  },
  methods: {
    setWidth () {
      this.width = this.$el.clientWidth
    },
    pan(e) {
      if (this.panEnabled) {
        if (this.paneableX) {
          this.baseX = this.baseX.map(v => v += e.movementX)
          this.$set(this.origin, 0, e.offsetX - this.marginLeft)
        }
        if (this.paneableY) this.baseY = this.baseY.map(v => v += e.movementY)
      }
    },
    enablePan () {
      this.panEnabled = true
    },
    dissablePan () {
      this.panEnabled = false
    },
    onZoom (e) {
      this.$set(this.origin, 0, e.offsetX - this.marginLeft)
      this.$set(this.origin, 1, e.offsetY - this.marginTop)
      if (this.zoomableX) {
        this.baseX = this.baseX.map(v => this.$cc.zoom(v, -e.deltaY, this.origin[0]))
      }
      if (this.zoomableY) {
        this.baseY = this.baseY.map(v => this.$cc.zoom(v, -e.deltaY, this.origin[1]))
      }
    }
  },
  computed: {
    containerWidth () {
      return this.width - this.marginLeft - this.marginRight
    },
    containerHeight () {
      return this.height - this.marginTop - this.marginBottom
    }
  }
}
</script>
