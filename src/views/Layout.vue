<template>
  <div class="home">
    <NavBar class="header"/>
    <router-view class="content"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'home',
  components: {
    NavBar
  },
  data () {
    return { }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  min-width: 1200px;
  min-height: 600px;
  overflow: auto;
  background-color: @bg-color;
}
.header {
  width: 100%;
  height: @header-h;
  background-color: rgb(41, 81, 202);
}
.content {
  position: relative;
  width: calc(100% - 20px);
  height: calc(100% - @header-h - 20px);
  margin: 10px;
}
</style>
