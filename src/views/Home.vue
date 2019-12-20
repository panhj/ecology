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
.header {
  width: 100%;
  height: 80px;
  background-color: rgb(41, 81, 202);
}
.content {
  width: 100%;
  height: calc(100vh - 90px);
  margin-top: 10px;
  background-color: #222;
}
</style>
