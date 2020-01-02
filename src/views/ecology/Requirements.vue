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
        <InputVeri :verify="Verify.waterFile">
          <div class="upload-btn" @click="uploadShow = true"><span>{{uploadFileName}}</span></div>
        </InputVeri>
      </CtrlItem>
      <CtrlItem title="参数设置">
        <div class="double-select">
          <el-select class="select" v-model="Form.bioType" placeholder="选择目标物种">
            <el-option v-for="item in bioTypes" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select class="select" v-model="Form.envType" placeholder="选择环境参数">
            <el-option v-for="item in envTypes" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <InputVeri :verify="Verify.autoInterval" tip="（输入1-10整数）">
          <el-input class="input" v-model="Form.autoInterval" placeholder="输入环境参数间隔" @input="checkAutoInterval"></el-input>
        </InputVeri>
        <InputVeri :verify="Verify.manualInterval" tip="（逗号间隔，小数点后最多两位）">
          <el-input class="input" v-model="Form.manualInterval" placeholder="自定义值" @input="checkManualInterval"></el-input>
        </InputVeri>
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
        <el-upload
          class="upload-demo"
          drag
          action="http://118.24.156.207:8008/upload/benthicorganism"
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
      uploadFileName: '导入水生物需求数据',
      uploadShow: false,
      bioTypes: [],
      envTypes: [
        {label: '平均流速', value: 'AVG_FLOW_RATE'},
        {label: '表层流速', value: 'SFC_FLOW_RATE'},
        {label: '近低流速', value: 'BTM_FLOW_RATE'},
        {label: '水深', value: 'WATER_DEPTH'},
      ],
      Form: {
        modelName: "",
        modelCreator: "",
        bioType: "",
        envType: "",
        autoInterval: "",
        manualInterval: ""
      },
      Verify: {
        waterFile: false,
        autoInterval: false,
        manualInterval: false
      }
    }
  },
  methods: {
    getEnvs () {

    },
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
    checkAutoInterval (value) {
      if (/(^[1-9]\d*$)/.test(+value) && +value > 0 && +value < 11) {
        this.Verify.autoInterval = true
      } else {
        this.Verify.autoInterval = false
      }
    },
    checkManualInterval (value) {
      if (!value) return this.Verify.manualInterval = false
      if (/[^\d+(,\d\d\d)*.\d+$]/g.test(value)) {
        this.Verify.manualInterval = false
      } else {
        this.Verify.manualInterval = true
      }
    },
    compute (type) {
      const {
        modelName,
        modelCreator,
        bioType,
        envType,
        autoInterval,
        manualInterval
      } = this.Form
      const params = {
        autoInterval,
        bioType,
        envType,
        manualInterval,
        modelCreator,
        modelName
      }
      if (!modelName || !modelCreator) {
        return this.$message.error("请输入正确的值")
      }
      if (type === 'index') {
        this.$http.post("bio-req/compute-avg", params).then(res => {
          console.log(res)
        }).catch(e => {
          this.$message.error(e.msg)
        })
      } else if (type === 'avg') {
        this.$http.post("bio-req/compute-index", params).then(res => {
          console.log(res)
        }).catch(e => {
          this.$message.error(e.msg)
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
  margin-left: 30px;
  div.el-select+div.el-select { margin-left: 15px; }
}
.btns {
  padding: 0 20px;
  button {
    padding: 8px 40px !important;
    font-size: 13px;
  }
}
.map-pannel {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,.38);
}
</style>