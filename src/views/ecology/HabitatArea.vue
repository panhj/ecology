<template>
  <div>
    <CtrlPannel>
      <CtrlItem title="导入二维水动力学模型结果">
        <div class="double-input flex-center">
          <el-select class="select m-r" v-model="Form.targetRiver" placeholder="选择目标河段">
            <el-option v-for="item in targetRisvers" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <InputVeri :verity="Verity.flowFile">
            <div class="upload-btn selects">
              <p>{{uploadFileName}}</p>
              <ul class="sub-ul">
                <li @click="handleUpload('DEPTH')">上传水深模拟结果</li>
                <li @click="handleUpload('LEVEL')">上传水位模拟结果</li>
                <li @click="handleUpload('SPEED')">上传流速模拟结果</li>
              </ul>
            </div>
          </InputVeri>
        </div>
      </CtrlItem>
      <CtrlItem title="计算单个环境栖息地面积">
        <div class="double-select">
          <el-select class="select m-r" v-model="Form.flow" placeholder="选择流量">
            <el-option v-for="item in flows" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
          <el-button type="primary">确 认</el-button>
        </div>
      </CtrlItem>
      <CtrlItem title="计算组合环境参数栖息地面积">
        <div class="btns flex-center">
          <el-button type="primary">权值适宜面积</el-button>
          <el-button type="primary">流量与适宜面积关系曲线</el-button>
        </div>
      </CtrlItem>
    </CtrlPannel>
    <RiverMap>
      <div class="map-pannel flex-center" v-show="uploadShow">
        <el-upload
          class="upload-demo"
          drag
          :action="baseUrl + uploadUrl"
          :on-success="uploadSuccess"
          :on-error="uploadError">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击或者将文件拖拽到这里上传</div>
          <div class="el-upload__tip">支持拓展名：.rar .zip .docx .pdf .jpg...</div>
        </el-upload>
      </div>
    </RiverMap>
  </div>
</template>
<script>
import CtrlPannel from '@/components/ecoCtrl/CtrlPannel.vue'
import CtrlItem from '@/components/ecoCtrl/CtrlItem.vue'
import InputVeri from '@/components/ecoCtrl/InputVeri.vue'
import RiverMap from '@/components/RiverMap.vue'
export default {
  components: {
    CtrlPannel,
    CtrlItem,
    RiverMap,
    InputVeri
  },
  data () {
    return {
      baseUrl: "http://118.24.156.207:8008/upload/",
      uploadType: "DEPTH",
      uploadUrl: "waterDepthSimulate",
      uploadShow: false,
      uploadFileName: "导入流量模拟结果",
      targetRisvers: [],
      flows: [],
      envTypes: [
        {label: '平均流速', value: 'AVG_FLOW_RATE'},
        {label: '表层流速', value: 'SFC_FLOW_RATE'},
        {label: '近低流速', value: 'BTM_FLOW_RATE'},
        {label: '水深', value: 'WATER_DEPTH'},
      ],
      requireModels: [],
      bioTypes: [],
      Form: {
        targetRiver: "",
        flow: "",
        envType: "",
        requireModel: ""
      },
      Verity: {
        flowFile: false
      }
    }
  },
  methods: {
    getModels () {
      this.$http.post('bio-req/models').then(res => this.requireModels = res)
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
  },
  mounted () {
    // this.getModels()
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
</style>