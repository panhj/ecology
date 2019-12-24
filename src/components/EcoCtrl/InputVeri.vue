<template>
  <div class="input-veri flex-center">
    <i class="el-icon-success icon-pre" :class="{'ok': verify}"></i>
    <div class="content">
      <slot></slot>
    </div>
    <span class="meta">{{tip}}</span>
  </div>
</template>
<script>
export default {
  name: 'InputVeri',
  props: {
    verify: {
      type: Boolean,
      default: false
    },
    tip: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      
    }
  }
}
</script>
<style lang="less" scoped>
.input-veri {
  justify-content: flex-start;
  margin-top: 10px;
  .icon-pre {
    font-size: 18px;
    margin: 0 10px 0 2px;
    color: #bbb;
  }
  .icon-pre.ok {
    color: rgb(41, 81, 202);
  }
  .meta {
    margin-left: 2px;
    font-size: 12px;
    color: #999;
    white-space: nowrap;
  }
}
</style>