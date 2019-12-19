<template>
  <div class="home">
    <NavBar class="navbar"/>
    <router-view class="content"/>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
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
    return {
      input: ''
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  padding: 20px;
}
</style>
