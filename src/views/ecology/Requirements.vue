<template>
  <div>
    <CtrlPannel>
      <CtrlItem title="方案创建">
        <div class="form-item flex-center">
          <span class="label">创建名称</span>
          <el-input class="input" v-model="Form.modelName" maxlength="8"></el-input>
          <span class="meta">（最高8个字符）</span>
        </div>
        <div class="form-item flex-center">
          <span class="label">创建人</span>
          <el-input class="input" v-model="Form.modelCreator" maxlength="8"></el-input>
          <span class="meta">（最高8个字符）</span>
        </div>
      </CtrlItem>
      <CtrlItem title="读取数据">
        <button class="upload-btn mrg-t mrg-l" @click="uploadShow = true"><span>{{uploadFileName}}</span></button>
      </CtrlItem>
      <CtrlItem title="参数设置">
        <div class="double-select">
          <el-select class="select" v-model="Form.bioType" placeholder="选择目标物种">
            <el-option v-for="item in bioTypes" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select class="select" v-model="Form.envType" placeholder="选择环境参数" @change="envTypeChange">
            <el-option v-for="item in envTypes" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-radio v-model="IntervaluType" label="autoInterval">
          <div class="form-item flex-center" style="display: inline-block;">
            <el-input class="input" v-model="Form.autoInterval" placeholder="输入环境参数间隔"></el-input>
            <span class="meta">（输入范围：{{intervalRangeString}} ）</span>
          </div>
        </el-radio>
        <el-radio v-model="IntervaluType" label="manualInterval">
          <div class="form-item flex-center" style="display: inline-block;">
            <el-input class="input" v-model="Form.manualInterval" placeholder="自定义值"></el-input>
            <span class="meta">（逗号间隔，小数点后最多两位）</span>
          </div>
        </el-radio>
      </CtrlItem>
      <CtrlItem title="模型计算">
        <div class="btns flex-center">
          <el-button type="primary" @click="compute('index')">求指数</el-button>
          <el-button type="primary" @click="compute('avg')">求均值</el-button>
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
          action="http://118.24.156.207:8008/upload/benthicorganism"
          :on-success="uploadSuccess"
          :on-error="uploadError">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击或者将文件拖拽到这里上传</div>
          <div class="el-upload__tip">支持拓展名：.xls, xlsx</div>
        </el-upload>
      </div>
      <div class="map-pannel flex-center" v-show="computedShow">
        <i class="el-icon-close icon-close" @click="computedShow = false"></i>
        <div class="compute-pannel">
          <p class="title">{{computedName}}</p>
          <div class="charts" id="line_chart"></div>
          <div class="value-table">
            <div class="row th">
              <span class="item">startValue</span>
              <span class="item">endValue</span>
              <span class="item">value</span>
            </div>
            <div class="row" v-for="item in computedValue" :key="item.startValue">
              <span class="item">{{item.startValue}}</span>
              <span class="item">{{item.endValue}}</span>
              <span class="item">{{item.value}}</span>
            </div>
          </div>
          <p style="text-align:center;">
            <el-button type="primary" @click="compute('save')">保 存</el-button>
          </p>
        </div>
      </div>
    </RiverMap>
  </div>
</template>
<script>
import CtrlPannel from '@/components/ecoCtrl/CtrlPannel.vue'
import CtrlItem from '@/components/ecoCtrl/CtrlItem.vue'
import RiverMap from '@/components/RiverMap.vue'
import echarts from 'echarts'
export default {
  components: {
    CtrlPannel,
    CtrlItem,
    RiverMap
  },
  data () {
    return {
      uploadFileName: '导入水生物需求数据',
      uploadShow: false,
      computedShow: false,
      computedName: '平均流速适宜指数分类曲线',
      bioTypes: [],
      envTypes: [
        {label: '平均流速', value: 'AVG_FLOW_RATE'},
        {label: '表层流速', value: 'SFC_FLOW_RATE'},
        {label: '近低流速', value: 'BTM_FLOW_RATE'},
        {label: '水深', value: 'WATER_DEPTH'},
      ],
      IntervaluType: "autoInterval",
      intervalRange: {min : 0, max: 5},
      intervalRangeString: "请先选择环境参数",
      Form: {
        modelName: "",
        modelCreator: "",
        bioType: "",
        envType: "",
        autoInterval: "",
        manualInterval: ""
      },
      Verify: {
        autoInterval: false,
        manualInterval: false
      },
      computedValue: [
        {
          startValue: 0.1,
          endValue: 0.3,
          bioName: '总生物量',
          value: 0.82374
        },
        {
          startValue: 0.3,
          endValue: 0.6,
          bioName: '总生物量',
          value: 0.232374
        },
        {
          startValue: 0.6,
          endValue: 1.6,
          bioName: '总生物量',
          value: 0.432374
        }
      ]
    }
  },
  methods: {
    uploadSuccess (response, file) {
      if (response && response.code === 0) {
        this.$message.success("上传成功")
        this.uploadShow = false
        this.uploadFileName = file.name || '导入水生物需求数据'
      } else {
        this.$message.error("上传失败")
      }
    },
    uploadError () {
      this.$message.error("上传失败")
    },
    envTypeChange () {
      console.log(this.Form.envType)
      const { envType } = this.Form
      if (!envType) return this.intervalRangeString = "请先选择环境参数"
      this.$http.post("bio-req/envs", { envType }).then(res => {
        this.intervalRange = res
        this.intervalRangeString = `${res.min} ~ ${res.max}`
      })
    },
    _checkAutoInterval () {
      const value = this.Form.autoInterval
      const { min, max } = this.intervalRange
      if (typeof +value === 'number' && +value > min && +value < max) {
        return true
      } else {
        this.$message.error("环境参数值需在" + this.intervalRangeString + "范围内")
        return false
      }
    },
    _checkManualInterval () {
      const value = this.Form.manualInterval
      if ((/[^\d+(,\d\d\d)*.\d+$]/g.test(value))) {
        this.$message.error("自定义环境参数输入格式不正确")
        return false
      }
      const { min, max } = this.intervalRange
      const aValue = value.split(',')
      if (+aValue[0] > min && +aValue[aValue.length-1] < max) {
        return true
      } else {
        this.$message.error("环境参数值需在" + this.intervalRangeString + "范围内")
        return false
      }
    },
    drawLine (computedValue) {
      const xData = []
      const yData = []
      computedValue.forEach(v => {
        xData.push(`${v.startValue} ~ ${v.endValue}`)
        yData.push(v.value)
      })
      const lineOption = {
        title: {
          text: '适宜度指数',
          top: 16,
          left: 10,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#666'
          }
        },
        grid: {
          bottom: xData.length > 4 ? "20%" : "10%",
          right: "8%"
        },
        tooltip: { show: false },
        legend: {
          show: false
        },
        xAxis: {
          data: xData,
          axisLabel: {
            interval: 0,
            rotate: xData.length > 4 ? 45 : 0
          } 
        },
        yAxis: {
          
        },
        series: [
          {
            name: '1',
            type: 'bar',
            barCategoryGap: 0,
            itemStyle: {
              color: "#fafafa",
              borderColor: "#555555",
            },
            data: yData
          },
          {
            name: '2',
            type: 'line',
            symbolSize: 7,
            label: {
                show: true,
            },
            data: yData
          }
        ]
      }
      setTimeout(() => {
        const lineChart = echarts.init(document.getElementById("line_chart"))
        lineChart.setOption(lineOption)
      }, 200)
    },
    compute (type) {
      const {
        modelName,
        modelCreator,
        bioType,
        envType,
      } = this.Form
      const params = {
        bioType,
        envType,
        modelCreator,
        [this.IntervaluType] : this.Form[this.IntervaluType],
        modelName
      }
      if (!modelName || !modelCreator) {
        return this.$message.error("请输入正确创建名称/人")
      }
      if (!bioType || !envType) {
        return this.$message.error("请选择目标物种和环境参数")
      }
      if (this.IntervaluType === "autoInterval" && !this._checkAutoInterval()) return false
      if (this.IntervaluType === "manualInterval" && !this._checkManualInterval()) return false
      if (type === 'index') {
        this.$http.post("bio-req/compute-avg", params).then(res => {
          this.computedShow = true
          this.computedName = "流速适宜指数分类曲线"
          this.computedValue = res
          this.drawLine(res)
        }).catch(e => {
          this.$message.error(e.msg)
        })
      } else if (type === 'avg') {
        this.$http.post("bio-req/compute-index", params).then(res => {
          this.computedShow = true
          this.computedName = "平均流速适宜指数分类曲线"
          this.computedValue = res
          this.drawLine(res)
        }).catch(e => {
          this.$message.error(e.msg)
        })
      } else if (type === 'save') {
        this.$http.post("bio-req/save-model", params).then(res => {
          this.computedShow = false
          this.$message.success("保存成功")
        })
      }
    }
  },
  mounted () {
    this.$store.dispatch('getSpecies').then(res => this.bioTypes = res)
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
.double-select {
  margin-left: 24px;
  div.el-select+div.el-select { margin-left: 15px; }
}
.btns {
  padding: 0 20px;
  button {
    padding: 8px 40px !important;
    font-size: 13px;
  }
}
.compute-pannel {
  width: 450px;
  text-align: center;
  background-color: #fff;
  padding: 0 10px 10px 10px;
  box-shadow: 0 0 15px 0 rgba(0,0,0,.38);
  border-radius: 4px;
  &>.title {
    display: inline-block;
    padding: 5px 14px;
    font-size: 20px;
    color: #fff;
    background-color: #409EFF;
  }
  .charts {
    margin-top: 10px;
    background-color: #efefef;
    border: 1px solid #ddd;
    height: 280px;
  }
  .value-table {
    margin: 10px 0;
    border:1px solid #aaa;
    background-color: #f6f6f6;
    max-height: 200px;
    overflow-y: auto;
    .row+.row {
      border-top: 1px solid #aaa;
    }
    .row {
      display: flex;
      justify-content: space-between;
      &>.item {
        width: 30%;
        flex-grow: 1;
        padding: 5px 0;
      }
      .item+.item {
        border-left: 1px solid #aaa;
      }
      &.th {
        background-color: #888;
        color: #fff;
        .item+.item {
          border-left: 1px solid #fff;
        }
      }
    }
  }
}
.mrg-t { margin-top: 15px; }
.mrg-l { margin-left: 24px; }
</style>