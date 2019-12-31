<template>
  <div>
    <CtrlPannel>
      <CtrlItem title="方案创建">
        <div class="form-item flex-center">
          <span class="label">创建名称</span>
          <el-input class="input" v-model="Form.createName"></el-input>
          <span class="meta">（最高8个字符）</span>
        </div>
        <div class="form-item flex-center">
          <span class="label">创建人</span>
          <el-input class="input" v-model="Form.createAuthor"></el-input>
          <span class="meta">（最高8个字符）</span>
        </div>
      </CtrlItem>
      <CtrlItem title="读取数据">
        <InputVeri :verify="Verify.waterFile">
          <div class="upload-btn" @click="uploadShow = true"><span>导入水生物需求数据</span></div>
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
          <el-input class="input" v-model="Form.manualInterval" placeholder="自定义值"></el-input>
        </InputVeri>
      </CtrlItem>
      <CtrlItem title="模型计算">
        <div class="btns flex-center">
          <el-button type="primary">求指数</el-button>
          <el-button type="primary">求均值</el-button>
        </div>
      </CtrlItem>
    </CtrlPannel>
    <RiverMap>
      <div class="map-pannel flex-center" v-show="uploadShow">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="uploadSuccess"
          multiple>
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
      uploadShow: false,
      bioTypes: [],
      envTypes: [
        {label: '平均流速', value: 'AVG_FLOW_RATE'},
        {label: '表层流速', value: 'SFC_FLOW_RATE'},
        {label: '近低流速', value: 'BTM_FLOW_RATE'},
        {label: '水深', value: 'WATER_DEPTH'},
      ],
      Form: {
        createName: "",
        createAuthor: "",
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
    uploadSuccess (response, file, fileList) {
      console.log(response)
    },
    checkAutoInterval (value) {
      if (/(^[1-9]\d*$)/.test(+value) && +value > 0 && +value < 11) {
        console.log(value)
        this.Verify.autoInterval = true
      } else {
        this.Verify.autoInterval = false
      }
    }
  },
  mounted () {
    this.$store.dispatch('getSpecies').then(res => this.bioTypes = res)
    // this.$http.post("bio-req/bio-types").then(res => {
    //   console.log(res)
    // }).catch(e => {console.warn(e)})
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