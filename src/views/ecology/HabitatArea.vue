<template>
  <div>
    <CtrlPannel>
      <CtrlItem title="导入二维水动力学模型结果">
        <div class="double-input flex-center">
          <el-select class="select m-r" v-model="Form.targetRiver" placeholder="选择目标河段">
            <el-option v-for="item in targetRisvers" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <InputVeri :verity="Verity.flowFile">
            <div class="upload-btn"><span>导入水数据</span></div>
          </InputVeri>
        </div>
      </CtrlItem>
      <CtrlItem title="计算单个环境栖息地面积">
        <div class="double-select">
          <el-select class="select m-r" v-model="Form.flow" placeholder="选择流量">
            <el-option v-for="item in flows" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select class="select" v-model="Form.envParam" placeholder="选择环境参数">
            <el-option v-for="item in envParams" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="form-item flex-center">
          <el-select class="select" v-model="Form.requireModel" placeholder="选择需求模型">
            <el-option v-for="item in requireModels" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
      targetRisvers: [],
      flows: [],
      envParams: [],
      requireModels: [],
      bioTypes: [],
      Form: {
        targetRiver: "",
        flow: "",
        envParam: "",
        requireModel: ""
      },
      Verity: {
        flowFile: false
      }
    }
  },
  mounted () {
    
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
.form-item {
  justify-content: flex-start;
  font-size: 14px;
  .label, .meta {
    display: inline-block;
  }
  .label {
    width: 70px;
  }
  .meta {
    margin-left: 2px;
    font-size: 13px;
    color: #999;
    white-space: nowrap;
    cursor: default;
  }
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
</style>