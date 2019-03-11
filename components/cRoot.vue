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
    zoomable : {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    origin: [0, 0],
    baseX: [0, 1],
    baseY: [1, 1],
    panEnabled: false,
    zoom: 1
  }),
  created () {
    this.baseX[1] = this.containerWidth
  },
  mounted () {
    if (this.paneableX || this.paneableY) {
      this.$el.addEventListener('mousedown', this.enablePan)
      this.$el.addEventListener('mouseup', this.dissablePan)
      this.$el.addEventListener('mousemove', this.pan)
    }
    if (this.zoomable) {
      this.$el.addEventListener('wheel', this.onZoom)
    }
  },
  beforeDestroy: function () {
    this.$el.removeEventListener('mousedown', this.enablePan)
    this.$el.removeEventListener('mouseup', this.dissablePan)
    this.$el.removeEventListener('mousemove', this.pan)
    this.$el.removeEventListener('wheel', this.onZoom)
  },
  methods: {
    pan(e) {
      if (this.panEnabled) {
        if (this.paneableX) this.baseX = this.baseX.map(v => v += e.movementX)
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
      // this.zoom += -e.deltaY < 0 ? -1 : 1
      // this.zoom += -event.deltaY * (event.deltaMode ? 120 : 1) / this.containerWidth
      const originX = e.offsetX - this.marginLeft
      const originY = e.offsetY - this.marginTop
      this.baseX = this.baseX.map(v => this.$cc.zoom(v, -e.deltaY, originX))
      this.baseY = this.baseY.map(v => this.$cc.zoom(v, -e.deltaY, originY))
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
