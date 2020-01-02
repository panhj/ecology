<template>
  <div class="map-container">
    <div class="map">
      <div id="MAP"></div> 
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
let myMap = null;
export default {
  name: 'RiverMap',
  data () {
    return {
      zomm2edge: {
        "5": 1,
        "6": 1.2,
        "7": 1.8,
        "8": 3,
        "9": 6,
        "10": 8,
        "11": 16,
        "12": 25
      }
    }
  },
  methods: {
    initMap () {
      myMap = new BMap.Map("MAP", {
        minZoom: 5,
        maxZoom: 12
      })
      const point = new BMap.Point(105, 34)
      myMap.centerAndZoom(point, 6)
      myMap.enableScrollWheelZoom(true)
      myMap.addControl(new BMap.MapTypeControl({
        mapTypes: [BMAP_HYBRID_MAP, BMAP_NORMAL_MAP]
      }))
      myMap.setMapType(BMAP_HYBRID_MAP)
    },
    draw (GPSDATA) {
      const self = this
      const canvasLayer = new BMap.CanvasLayer({
        update: function () {
          // this.canvas.style.opacity = 0.5
          self.drawLiner(this.canvas, GPSDATA)
        }
      })
      myMap.addOverlay(canvasLayer)
    },
    drawLiner (canvas, GPSDATA) {
      const EDGE = this.getEdgeFromZoom()

      const ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      // ctx.lineWidth = 10
      // ctx.strokeStyle = "#ff7788"
      ctx.beginPath()

      // const first_gps = GPSDATA[0]
      // const first_p = new BMap.Point(first_gps[0], first_gps[1])
      // const first_pixel = myMap.pointToPixel(first_p)
      // ctx.moveTo(first_pixel.x, first_pixel.y)

      // for (let i=1, len=GPSDATA.length; i<len; i++) {
      //   const gps = GPSDATA[i]
      //   const p = new BMap.Point(gps[0], gps[1])
      //   const pixel = myMap.pointToPixel(p)
      //   ctx.lineTo(pixel.x, pixel.y)
      // }
      // ctx.stroke()

      ctx.fillStyle = "#ffff0030"
      for (let i=1, len=GPSDATA.length; i<len; i++) {
        const gps = GPSDATA[i]
        const p = new BMap.Point(gps[0], gps[1])
        const pixel = myMap.pointToPixel(p)
        ctx.fillRect(pixel.x, pixel.y, EDGE, EDGE);
      }
    },
    getLineData () {
      this.$http.get('earth-engine/data/2011').then(res => {
        const { features } = JSON.parse(res.message)
        const gps_arr = features[0].geometry.coordinates[0][0]
        const gpsData = gps_arr.filter((v, i) => i % 10 === 0)
        const m_len = (gpsData.length / 2)>>0
        const point = new BMap.Point(gpsData[m_len][0], gpsData[m_len][1])
        myMap.setCenter(point)
        myMap.setZoom(9)
        this.draw(gpsData)
      })
    },
    getEdgeFromZoom () {
      const zoom = myMap.getZoom()
      return this.zomm2edge[zoom+''] || 1
    }
  },
  mounted () {
    // this.initMap()
    // this.draw(GPSDATA)
    // this.getLineData()
  }
}
</script>

<style lang="less" scoped>
.map-container {
  position: absolute;
  top: 0; right:0;
  width: calc(100% - @left-pannel-w - 10px);
  height: 100%;
  background-color: #ddd;
  border-radius: 4px;
  border: 1px solid #c8c8c8;
  overflow: auto;
  .map {
    width: 100%;
    height: 100%;
    &>#MAP {
      width: 100%;
      height: 100%;
    }
  }
}
</style>