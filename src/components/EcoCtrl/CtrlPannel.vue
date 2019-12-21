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
@ctrl-h: calc(100vh - @sub-menu-h - @gap - @header-h - 20px);
.ctrl-pannel {
  border: 1px solid #eaeaea;
  background-color: #fff;
  border-radius: 5px;
  margin-top: @gap;
  width: @left-pannel-w;
  height: @ctrl-h;
  overflow: auto;
  box-shadow: 0 0 5px 0px rgba(0,0,0,.12);
}
</style>