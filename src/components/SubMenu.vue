<template>
  <div>
    <ul class="menu flex-center">
      <li>
        <router-link to="#"><span>岸线<br/>历史演变</span></router-link>
      </li>
      <li>
        <router-link to="#"><span>岸带<br/>质量评估</span></router-link>
      </li>
      <li :class="{'active': routerName  === 'requirements'}">
        <router-link to="/ecology/requirements"><span>栖息地<br/>需求模型</span></router-link>
      </li>
      <li :class="{'active': routerName  === 'habitatArea'}">
        <router-link to="/ecology/habitatArea"><span>栖息地<br/>适宜面积</span></router-link>
      </li>
      <li :class="{'active': routerName  === 'flowDecision'}">
        <router-link to="/ecology/flowDecision"><span>生态<br/>流量决策</span></router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SubMenu',
  data () {
    return {
      routerName: ""
    }
  },
  watch: {
    "$route": function (newVal, oldVal) {
      this.routerName = newVal.name
    }
  },
  mounted () {
    this.routerName = this.$route.name
  }
}
</script>
<style lang="less" scoped>
.menu {
  width: @left-pannel-w;
  &>li {
    height: @sub-menu-h;
    font-size: 14px;
    color: #fff;
    width: 60px;
    flex-grow: 1;
    margin-left: 3px;
    border-radius: 4px;
    overflow: hidden;
    &>a {
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: rgb(139, 195, 74);
      width: 100%;
      height: 100%;
      padding: 5px;
      text-align: center;
    }
    &>a:hover {
      background-color: #5ec149;
    }
  }
  &>li:nth-child(1) {margin: 0;}
  &>li.active a {
    background-color: rgb(40, 138, 223);
  }
}
</style>
