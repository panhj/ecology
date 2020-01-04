<template>
  <div>
    <CtrlPannel>
      <CtrlItem title="流量时间序列的导入">
        <button class="upload-btn mrg-t" @click="handleUpload('water')"><span>上传数据文件</span></button>
      </CtrlItem>
      <CtrlItem title="水生态预测结果展示">
        <div class="single-btn">
          <el-button type="primary" @click="getTimeFlowAreaLine">适宜面积历时曲线</el-button>
        </div>
      </CtrlItem>
      <CtrlItem title="空间分布图动画展示">
        <div class="form-item flex-center mrg-t">
          <button class="upload-btn"><span>上传视频</span></button>
          <span class="meta">（AVI格式 建议100M以内）</span>
        </div>
        <div class="single-btn">
          <el-button type="primary">指定流量适宜面积</el-button>
        </div>
        <div class="form-item flex-center mrg-t">
          <button class="upload-btn"><span>上传视频</span></button>
          <span class="meta">（AVI格式 建议100M以内）</span>
        </div>
        <div class="single-btn">
          <el-button type="primary">历时流量适宜面积</el-button>
        </div>
      </CtrlItem>
    </CtrlPannel>
    <RiverMap>
      <div class="map-pannel flex-center" v-show="uploadShow">
        <i class="el-icon-close icon-close" @click="uploadShow = false"></i>
        <el-upload
          class="upload-demo"
          drag
          accept=".xls,.xlsx"
          :action="baseUrl + uploadUrl"
          :on-success="uploadSuccess"
          :on-error="uploadError">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击或者将文件拖拽到这里上传</div>
          <div class="el-upload__tip">支持拓展名：.xls, xlsx</div>
        </el-upload>
      </div>
      <!-- 流量与适宜面积关系曲线图 -->
      <div class="map-pannel flex-center" v-show="areaChartShow">
        <i class="el-icon-close icon-close" @click="areaChartShow = false"></i>
        <div class="charts" id="chart"></div>
      </div>
    </RiverMap>
  </div>
</template>
<script>
import CtrlPannel from '@/components/ecoCtrl/CtrlPannel.vue'
import CtrlItem from '@/components/ecoCtrl/CtrlItem.vue'
import InputVeri from '@/components/ecoCtrl/InputVeri.vue'
import RiverMap from '@/components/RiverMap.vue'
import echarts from 'echarts'
export default {
  components: {
    CtrlPannel,
    CtrlItem,
    RiverMap,
    InputVeri
  },
  data () {
    return {
      baseUrl: "http://118.24.156.207:8008/",
      uploadType: "water",
      uploadUrl: "flowdata",
      uploadFileName: "上传数据文件",
      uploadShow: false,
      areaChartShow: false
    }
  },
  methods: {
    handleUpload (type) {
      this.uploadType = type
      if (type === "water") {
        this.uploadUrl = "upload/flowdata"
      }
      if (this.uploadShow) {
        this.uploadShow = false
        setTimeout(() => this.uploadShow = true, 200)
      } else {
        this.uploadShow = true
      }
    },
    uploadSuccess (response, file) {
      if (response && response.code === 0) {
        this.$message.success("上传成功")
        this.uploadShow = false
        if (this.uploadType === "water") {
          this.uploadFileName = file.name || '上传数据文件'
        }
      } else {
        this.$message.error("上传失败")
      }
    },
    uploadError () {
      this.$message.error("上传失败")
    },
    getTimeFlowAreaLine () {
      this.areaChartShow = true
      this.$http.get('area/time-flow-area').then(res => {
        this.drawTimeAreaLine(res)
      })
    },
    drawTimeAreaLine (res) {
      const xData = []
      const yDataflow= []
      const yDataarea = []
      res.forEach((v, i) => {
        if (i % 10 === 0) {
          xData.push(v.day)
          yDataflow.push(v.flow)
          yDataarea.push(v.area)
        }
      })
      const lineOption = {
        title: {
          text: '适宜面积历时曲线',
        },
        grid: {
          top: "18%",
          left: "8%",
          bottom: "16%",
          right: "8%"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          show: false
        },
        xAxis: {
          data: xData,
          axisLabel: {
            rotate: 60
          }
        },
        yAxis: [
          {
            name: '面积（m^2）',
            type: 'value',
            min: 0,
            max: Math.max(...yDataarea),
            splitLine: {
              show: false
            }
          },
          {
            name: '流量（m^3/s）',
            type: 'value',
            min: 0,
            max: Math.max(...yDataflow),
            splitLine: {
              show: false
            }
          },
        ],
        series: [
          {
            name: '流量',
            type: 'line',
            yAxisIndex: 1,
            data: yDataflow,
          },
          {
            name: '面积',
            type: 'line',
            data: yDataarea,
            itemStyle: {
              color: "#4477cc"
            }
          }
        ]
      }
      setTimeout(() => {
        const lineChart = echarts.init(document.getElementById("chart"))
        lineChart.setOption(lineOption)
      }, 200)
    },
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.input, .select {
  width: 135px;
}
.single-btn {
  padding: 15px 0 5px 0px;
  justify-content: flex-start;
  text-align: left;
  button {
    padding: 8px 22px !important;
    font-size: 13px;
  }
}
.mrg-t { margin-top: 10px; }

.charts {
  width: 900px;
  height: 480px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 15px 0 rgba(0,0,0,.1);
}
</style>