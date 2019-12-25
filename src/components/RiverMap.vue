<template>
  <div class="map-container">
    <div class="map">
      <div id="MAP"></div> 
    </div>
    <div class="flex-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BMap from 'BMap'
import BMAP_NORMAL_MAP from 'BMAP_NORMAL_MAP'
import BMAP_HYBRID_MAP from 'BMAP_HYBRID_MAP'
let myMap = null;
export default {
  name: 'RiverMap',
  data () {
    return {
      
    }
  },
  methods: {
    initMap () {
      myMap = new BMap.Map("MAP")
      const point = new BMap.Point(105, 34)
      myMap.centerAndZoom(point, 6)
      myMap.enableScrollWheelZoom(true)
      myMap.addControl(new BMap.MapTypeControl({
        mapTypes: [BMAP_HYBRID_MAP, BMAP_NORMAL_MAP]
      }))
      myMap.setMapType(BMAP_HYBRID_MAP)
    },
    draw () {
      const self = this
      const canvasLayer = new BMap.CanvasLayer({
        update: function () {
          self.drawLiner(this.canvas)
        }
      })
      myMap.addOverlay(canvasLayer)
    },
    drawLiner (canvas) {
      var ctx = canvas.getContext("2d");

        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        var temp = {};
        ctx.fillStyle = "rgba(50, 50, 255, 0.7)";
        ctx.beginPath();
        var data = [
        new BMap.Point(116.297047,39.979542),
        new BMap.Point(116.321768,39.88748),
        new BMap.Point(116.494243,39.956539)
        ];

        for (var i = 0, len = data.length; i < len; i++) {

            // 绘制时需要对经纬度进行转换
            var pixel = myMap.pointToPixel(data[i]);

            ctx.fillRect(pixel.x, pixel.y, 30, 30);
        }
    },
    getLineData () {
      this.$http.get('earth-engine/data/2011').then(res => {
        console.log(JSON.parse(res.message))
      })
    }
  },
  mounted () {
    this.initMap()
    this.draw()
    this.getLineData()
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