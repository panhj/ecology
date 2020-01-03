<template>
  <div>
    <CtrlPannel>
      <CtrlItem title="流量时间序列的导入">
        <InputVeri :verity="Verity.flowTimesFile">
          <div class="upload-btn" @click="handleUpload('water')"><span>上传数据文件</span></div>
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
      baseUrl: "http://118.24.156.207:8008/",
      uploadType: "water",
      uploadUrl: "flowdata",
      uploadFileName: "上传数据文件",
      uploadShow: false,
      Verity: {
        flowTimesFile: false,
        Amt1File: false,
        Amt2File: false
      }
    }
  },
  methods: {
    handleUpload (type) {
      this.uploadType = type
      if (type === "water") {
        this.uploadUrl = "flowdata"
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