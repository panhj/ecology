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
        <InputVeri :verity="Verity.waterFile">
          <div class="upload-btn"><span>导入水数据</span></div>
        </InputVeri>
      </CtrlItem>
      <CtrlItem title="参数设置">
        <div class="double-select">
          <el-select class="select" v-model="Form.bioType" placeholder="选择目标物种">
            <el-option v-for="item in bioTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select class="select" v-model="Form.bioType" placeholder="选择环境参数">
            <el-option v-for="item in bioTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <InputVeri :verity="Verity.autoInterval" tip="（输入1-10整数）">
          <el-input class="input" v-model="Form.autoInterval" placeholder="输入环境参数间隔"></el-input>
        </InputVeri>
        <InputVeri :verity="Verity.manualInterval" tip="（逗号间隔，小数点后最多两位）">
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
      bioTypes: [],
      Form: {
        createName: "",
        createAuthor: "",
        bioType: "",
        autoInterval: "",
        manualInterval: ""
      },
      Verity: {
        waterFile: false,
        autoInterval: false,
        manualInterval: false
      }
    }
  },
  mounted () {
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
</style>