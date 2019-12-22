<template>
  <div>
    <SubMenu></SubMenu>
    <router-view class="sub-content"></router-view>
  </div>
</template>
<script>
import SubMenu from '@/components/SubMenu.vue'
export default {
  components: {
    SubMenu
  }
}
</script>
<style lang="less" scoped>
.sub-content {
  height: calc(100% - @sub-menu-h - 10px);
}
</style>
