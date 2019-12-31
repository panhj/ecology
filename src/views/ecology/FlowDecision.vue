<template>
  <div>
    <CtrlPannel>
      <CtrlItem title="流量时间序列的导入">
        <InputVeri :verity="Verity.flowTimesFile">
          <div class="upload-btn"><span>导入水数据</span></div>
        </InputVeri>
      </CtrlItem>
      <CtrlItem title="水生态预测结果展示">
        <div class="single-btn">
          <el-button type="primary">适宜面积历时曲线</el-button>
        </div>
      </CtrlItem>
      <CtrlItem title="空间分布图动画展示">
        <InputVeri :verity="Verity.Amt1File" tip="（AVI格式 建议100M以内）">
          <div class="upload-btn"><span>上传视频</span></div>
        </InputVeri>
        <div class="single-btn">
          <el-button type="primary">指定流量适宜面积</el-button>
        </div>
        <InputVeri :verity="Verity.Amt2File" tip="（AVI格式 建议100M以内）">
          <div class="upload-btn"><span>上传视频</span></div>
        </InputVeri>
        <div class="single-btn">
          <el-button type="primary">历时流量适宜面积</el-button>
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
      Verity: {
        flowTimesFile: false,
        Amt1File: false,
        Amt2File: false
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
.single-btn {
  padding: 15px 0 5px 30px;
  justify-content: flex-start;
  text-align: left;
  button {
    padding: 8px 22px !important;
    font-size: 13px;
  }
}
</style>