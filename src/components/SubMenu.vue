<template>
  <div class="ecology-container">
    <ul class="menu flex-center">
      <li><router-link to="#"><span>生态流量决策</span></router-link></li>
      <li><router-link to="#"><span>生态流量决策</span></router-link></li>
      <li class="active"><router-link to="#"><span>生态流量决策</span></router-link></li>
      <li><router-link to="#"><span>生态流量决策</span></router-link></li>
      <li><router-link to="#"><span>生态流量决策</span></router-link></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SubMenu'
}
</script>
<style lang="less" scoped>
.menu {
  width: @left-pannel-w;
  &>li {
    height: 120px;
    font-size: 16px;
    color: #fff;
    flex-grow: 1;
    margin-left: 3px;
    border-radius: 4px;
    overflow: hidden;
  }
  &>li:nth-child(1) {margin: 0;}
  &>li a {
    display: flex;
    align-items: center;
    background-color: rgb(139, 195, 74);
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  &>li.active a {
    background-color: rgb(40, 138, 223);
  }
}
</style>
