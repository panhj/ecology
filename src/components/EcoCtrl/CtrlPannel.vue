<template>
  <div class="ctrl-pannel">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CtrlPannel'
}
</script>
<style lang="less" scoped>
@gap: 10px;
.ctrl-pannel {
  border: 1px solid #dfdfdf;
  background-color: #fff;
  border-radius: 4px;
  margin-top: @gap;
  width: @left-pannel-w;
  height: 100%;
  overflow: auto;
  // box-shadow: 0 0 5px 0px rgba(0,0,0,.12);
}
</style>