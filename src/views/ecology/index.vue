<template>
  <div class="ecology-container">
    <SubMenu></SubMenu>
    <router-view></router-view>
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
