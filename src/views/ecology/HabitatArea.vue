<template>
  <div>
    <CtrlPannel>
      <CtrlItem title="导入二维水动力学模型结果">
        <div class="double-input flex-center">
          <el-select class="select m-r" v-model="Form.targetRiver" placeholder="选择目标河段">
            <el-option v-for="item in targetRisvers" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <div class="upload-btn selects">
            <p>{{uploadFileName}}</p>
            <ul class="sub-ul">
              <li @click="handleUpload('DEPTH')">上传水深模拟结果</li>
              <li @click="handleUpload('LEVEL')">上传水位模拟结果</li>
              <li @click="handleUpload('SPEED')">上传流速模拟结果</li>
            </ul>
          </div>
        </div>
      </CtrlItem>
      <CtrlItem title="计算单个环境栖息地面积">
        <div class="double-select">
          <el-select class="select m-r" v-model="Form.flow" placeholder="选择流量">
            <el-option v-for="item in flowRates" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-select class="select" v-model="Form.envType" placeholder="选择环境参数">
            <el-option v-for="item in envTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="form-item flex-center">
          <el-select class="select" v-model="Form.requireModel" placeholder="选择需求模型">
            <el-option v-for="item in requireModels" :key="item.modelId" :label="item.modelName" :value="item.modelId"></el-option>
          </el-select>
          <span class="meta">（最高显示10个最新模型）</span>
        </div>
        <div class="btns">
          <el-button type="primary" @click="postAreaSingle">确 认</el-button>
        </div>
      </CtrlItem>
      <CtrlItem title="计算组合环境参数栖息地面积">
        <div class="btns flex-center">
          <el-button type="primary" @click="caculatorShow = true">权值适宜面积</el-button>
          <el-button type="primary" @click="getFlowAreaLine">流量与适宜面积关系曲线</el-button>
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
      <!-- 组合计算器 -->
      <div class="map-pannel flex-center" v-show="caculatorShow">
        <i class="el-icon-close icon-close" @click="caculatorShow = false"></i>
        <div class="caculator">
          <div class="models-pannel">
            <p class="title">点击选择模型输入</p>
            <ul class="models">
              <li
                v-for="item in requireModels"
                :key="item.modelId"
                @click="clickModelList(item)"
              >
                {{item.modelName}}
              </li>
            </ul>
          </div>
          <div class="btns-pannel">
            <ul class="calc-btns">
              <li
                class="item"
                v-for="(item, index) in calcBtns"
                :key="index"
                @click="clickBtnList(item)"
              >
                {{item}}
              </li>
            </ul>
          </div>
          <div class="input-pannel">
            <el-input class="textarea" type="textarea" rows="3" v-model="Form.functionStr" readonly></el-input>
          </div>
          <div style="text-align:center;">
            <el-button type="primary" @click="postAreaCombin">保 存</el-button>
          </div>
        </div>
      </div>
      <!-- 单环境参数栖息地面积 -->
      <div class="map-pannel flex-center" v-show="areaSingleShow">
        <i class="el-icon-close icon-close" @click="areaSingleShow = false"></i>
        <div class="single-map-container">
          <div class="title flex-center">
            <span>流速适宜范围</span>
            <span class="tag" style="background-color:#ffffff;"><span>不适宜</span></span>
            <span class="tag" style="background-color:#fab0aa;"><span>中适宜</span></span>
            <span class="tag" style="background-color:#fd5455;"><span>高适宜</span></span>
          </div>
          <SingleAreaMap :gpsData="areaSingleData"></SingleAreaMap>
        </div>
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
import RiverMap from '@/components/RiverMap.vue'
import SingleAreaMap from '@/components/SingleAreaMap.vue'
import echarts from 'echarts'
export default {
  components: {
    CtrlPannel,
    CtrlItem,
    RiverMap,
    SingleAreaMap
  },
  data () {
    return {
      baseUrl: "http://118.24.156.207:8008/upload/",
      uploadType: "DEPTH",
      uploadUrl: "waterDepthSimulate",
      uploadShow: false,
      caculatorShow: false,
      areaChartShow: false,
      areaSingleShow: false,
      areaSingleData: [],
      uploadFileName: "导入流量模拟结果",
      targetRisvers: [],
      flowRates: [],
      envTypes: [
        {label: '水深模拟', value: 'DEPTH'},
        {label: '水位模拟', value: 'LEVEL'},
        {label: '流速模拟', value: 'SPEED'},
      ],
      requireModels: [],
      bioTypes: [],
      functionStrList: [],
      Form: {
        targetRiver: "",
        flow: "",
        envType: "",
        requireModel: "",
        functionStr: "",
        paramsMap: {}
      },
      calcBtns: [
        '(',')','^','←',
        '7','8','9','/',
        '4','5','6','*',
        '1','2','3','-',
        '0','.','+'
      ]
    }
  },
  watch: {
    functionStrList: function (newValue) {
      let str = ""
      let map = []
      newValue.forEach(v => {
        if (typeof v === "object") {
          str += `[${v.modelName}]`
          map.push({
            name: v.modelName,
            id: v.modelId
          })
        } else {
          str += v
        }
      })
      this.Form.functionStr = str
      this.Form.paramsMap = map
    }
  },
  methods: {
    getModels () {
      this.$http.post('bio-req/models').then(res => this.requireModels = res)
    },
    getFlowRates () {
      this.$http.get('bio-req/flow-rate').then(res => this.flowRates = res)
    },
    getRivers () {
      this.$http.get('metadata/species').then(res => {
        for (let k in res) {
          this.targetRisvers.push({label: k, value: res[k]})
        }
      })
    },
    handleUpload (type) {
      this.uploadType = type
      if (type === "DEPTH") {
        this.uploadUrl = "waterDepthSimulate"
      } else if (type === "LEVEL") {
        this.uploadUrl = "waterLevelSimulate"
      } else if (type === "SPEED") {
        this.uploadUrl = "waterSpeedSimulate"
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
        this.uploadFileName = file.name || '导入流量模拟结果'
      } else {
        this.$message.error("上传失败")
      }
    },
    uploadError () {
      this.$message.error("上传失败")
    },
    clickModelList (item) {
      this.functionStrList.push(item)
    },
    clickBtnList (item) {
      if (item === '←') {
        this.functionStrList.pop()
      } else {
        this.functionStrList.push(item)
      }
    },
    postAreaSingle () {
      const {
        flow,
        envType,
        requireModel
      } = this.Form
      if (!envType || !flow || !requireModel) {
        return this.$message.error("请选择流量/环境参数/模型")
      }
      const params = {
        analogType: envType,
        bioModelId: requireModel,
        simulatePoint: flow+''
      }
      const loading = this.$loading()
      this.$http.post("area/single", params).then(res => {
        loading.close()
        this.areaSingleShow = true
        this.areaSingleData = res
      }).catch(e => {
        this.$message.error(e.msg)
      })
    },
    postAreaCombin () {
      const {
        flow,
        envType,
        functionStr,
        paramsMap
      } = this.Form
      if (!envType || !flow) {
        return this.$message.error("请选择流量/环境参数")
      }
      const params = {
        analogType: envType,
        function: functionStr,
        params: paramsMap,
        simulatePoint: flow+''
      }
      this.$http.post("area/combin", params).then(res => {
        this.$message.success("保存成功")
      }).catch(e => {
        this.$message.error(e.msg)
      })
    },
    getFlowAreaLine () {
      this.areaChartShow = true
      this.$http.get('area/flow-area').then(res => {
        this.drawAreaLine(res)
      })
    },
    drawAreaLine (res) {
      const xData = []
      const yData = []
      res.forEach(v => {
        xData.push(v.flow)
        yData.push(v.area)
      })
      const lineOption = {
        title: {
          text: '流量WUA关系',
        },
        grid: {
          bottom: "10%",
          right: "8%"
        },
        tooltip: {},
        legend: {
          show: false
        },
        xAxis: {
          data: xData,
        },
        yAxis: {
          
        },
        series: [
          {
            type: 'line',
            data: yData,
            symbolSize: 6,
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
    this.getModels()
    this.getFlowRates()
    this.getRivers()
  }
}
</script>
<style lang="less" scoped>
.input, .select {
  width: 135px;
}
.form-item,.double-select, .btns {
  margin-top: 10px;
}
.double-input {
  margin-top: 10px;
  justify-content: flex-start;
  .select.m-r { margin-right: 10px; }
  div.el-select+div.input-veri { margin:0 0 0 15px; }
}
.double-select {
  div.el-select+div.el-select { margin-left: 15px; }
}
.btns {
  padding: 10px 0 0 0;
  justify-content: flex-start;
  text-align: center;
  button {
    padding: 8px 24px !important;
    font-size: 13px;
  }
  button+button {
    margin-left: 26px;  
  }
}
.upload-btn.selects {
  overflow: visible;
  position: relative;
  &>p { overflow: hidden; }
  &:hover {
    &>.sub-ul {
      visibility: visible;
    }
  }
  .sub-ul {
    position: absolute;
    top: 37px; left: 0;
    width: 100%;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, .2);
    border-radius: 4px;
    color: #666; background-color: #fff;
    padding: 5px 0;
    z-index: 9;
    visibility: hidden;
    transition: all .2s;
    &>li {
      padding: 2px 15px;
    }
    &>li:hover {
      background-color: #eee;
    }
  }
}
.caculator {
  width: 536px;
  background-color: #eee;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, .2);
  border-radius: 4px;
  padding: 15px;
  .models-pannel, .btns-pannel {
    display: inline-block;
    height: 265px;
    vertical-align: middle;
  }
  .models-pannel {
    background-color: #f8f8f8;
    width: 280px;
    margin-right: 15px;
    border: 1px solid #aaa;
    border-radius: 4px;
    font-size: 15px;
    .title {
      color: rgba(41, 81, 202,.8);
      margin: 6px 10px 0 10px;
      padding-bottom: 5px;
      user-select: none;
      border-bottom: 1px dashed rgba(41, 81, 202,.6);
    }
    .models {
      padding: 2px 0;
      margin-right: 10px;
      height: calc(100% - 40px);
      overflow: auto;
      &>li {
        padding: 4px 11px;
        color: #666;
        cursor: pointer;
      }
      &>li:hover {
        background-color: rgba(21, 81, 202,.1);
      }
      &>li:active {
        background-color: rgba(21, 81, 202,.2);
      }
    }
  }
  .btns-pannel {
    width: 210px;
    padding-top: 1px;
    .calc-btns {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      user-select: none;
      .item {
        width: 46px;
        height: 46px; line-height: 46px;
        text-align: center;
        color: #888;
        background-color: #ddd;
        border: 1px solid #999;
        margin-bottom: 8px;
        font-weight: 700;
        cursor: pointer;
      }
      .item:nth-last-child(3) {
        width: 100px;
      }
      .item:hover {
        background-color: #ccc;
      }
      .item:active {
        background-color: #bbb;
      }
    }
  }
  .input-pannel {
    margin: 10px 0;
    .textarea { font-size: 20px; }
  }
}

.charts, .single-map-container {
  width: 600px;
  height: 480px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 15px 0 rgba(0,0,0,.1);
}
.single-map-container {
  width: 900px;
  height: auto;
  .title {
    width: 100%;
    height: 30px;
    font-size: 18px;
    justify-content: flex-start;
    margin: 0 0 10px 2px;
    user-select: none;
    .tag {
      width: 80px;
      height: 26px;
      font-size: 15px;
      background-color: #aaa;
      margin: 0 80px 0 30px;
      border: 1px solid #777;
      &>span {
        position: relative;
        left: 90px;
        line-height: 26px;
      }
    }
  }
}
</style>