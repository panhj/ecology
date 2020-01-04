<template>
  <div class="container">
    <div class="map">
      <div id="SINGLE_MAP"></div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BMap from 'BMap'
import BMAP_NORMAL_MAP from 'BMAP_NORMAL_MAP'
import BMAP_HYBRID_MAP from 'BMAP_HYBRID_MAP'
import GPSDATA from './gps.js'
let SingleMap = null;
export default {
  name: 'SingleAreaMap',
  props: {
    gpsData: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      zomm2edge: {
        "5": 1,
        "6": 1,
        "7": 1,
        "8": 2,
        "9": 3,
        "10": 3,
        "11": 3,
        "12": 4,
        "13": 6,
      }
    }
  },
  watch: {
    "gpsData": function (newVal, oldVal) {
      if (!newVal || newVal.length === 0) return false
      this.initMap()
      // resize-scale-start
      const m_len = (newVal.length / 2)>>0
      console.log(m_len)
      const point = new BMap.Point(newVal[m_len].longitude, newVal[m_len].latitude)
      SingleMap.setCenter(point)
      SingleMap.setZoom(12)
      // resize-scale-end
      this.draw(newVal)
    }
  },
  methods: {
    initMap () {
      SingleMap = new BMap.Map("SINGLE_MAP", {
        minZoom: 5,
        maxZoom: 13
      })
      const point = new BMap.Point(105, 34)
      SingleMap.centerAndZoom(point, 6)
      SingleMap.enableScrollWheelZoom(true)
      SingleMap.addControl(new BMap.MapTypeControl({
        mapTypes: [BMAP_HYBRID_MAP, BMAP_NORMAL_MAP]
      }))
      SingleMap.setMapType(BMAP_HYBRID_MAP)
    },
    draw (GPSDATA) {
      const self = this
      const canvasLayer = new BMap.CanvasLayer({
        update: function () {
          // this.canvas.style.opacity = 0.5
          self.drawLiner(this.canvas, GPSDATA)
        }
      })
      SingleMap.addOverlay(canvasLayer)
    },
    drawLiner (canvas, GPSDATA) {
      const EDGE = this.getEdgeFromZoom()
      const ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.beginPath()
      ctx.fillStyle = "#ffff00"
      for (let i=1, len=GPSDATA.length; i<len; i++) {
        const gps = GPSDATA[i]
        const p = new BMap.Point(gps.longitude, gps.latitude)
        const pixel = SingleMap.pointToPixel(p)
        if (gps.simulateTag === 0) {
          ctx.fillStyle = "#ffffffa8"
        } else if (gps.simulateTag === 1) {
          ctx.fillStyle = "#fab0aaa8"
        } else if (gps.simulateTag > 2) {
          ctx.fillStyle = "#fd5455a8"
        }
        ctx.fillRect(pixel.x, pixel.y, EDGE, EDGE);
      }
    },
    getEdgeFromZoom () {
      const zoom = SingleMap.getZoom()
      return this.zomm2edge[zoom+''] || 1
    }
  },
  mounted () {
    
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 500px;
  .map {
    width: 100%;
    height: 100%;
    &>#SINGLE_MAP {
      width: 100%;
      height: 100%;
    }
  }
}
</style>