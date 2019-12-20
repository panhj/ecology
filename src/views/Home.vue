<template>
  <div class="home">
    <NavBar class="header"/>
    <router-view class="content"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
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
  height: calc(100vh - 100px);
}
</style>
