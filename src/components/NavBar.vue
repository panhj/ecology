<template>
  <header>
    <div class="logo">
      <img src="" alt="">
      <span class="title">长江经济带干流水系统综合模拟与调控平台</span>
    </div>
    <ul>
      <li><router-link to="#">基础信息</router-link></li>
      <li><router-link to="#">水循环</router-link></li>
      <li><router-link to="#">水系统健康评价</router-link></li>
      <li><router-link to="#">绿色发展路径模拟</router-link></li>
      <li><router-link to="#">调控决策</router-link></li>
      <li class="active"><router-link to="#">水生态模型</router-link></li>
    </ul>
    <div class="setting">
      <span class="set-btn">设置</span>
    </div>
  </header>
</template>
<script>
export default {
  name: 'NavBar',
  data () {
    return { }
  }
}
</script>
<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  color: #fff;
  .logo {
    flex-shrink: 0;
    width: 350px;
    height: 100%;
    display: flex;
    align-items: center;
    &>img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: #fff;
    }
    &>.title {
      font-size: 15px;
      margin-left: 10px;
    }
  }
  &>ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 15px;
    li, a {
      display: inline-block;
      height: @header-h;
      line-height: @header-h;
      text-align: center;
      user-select: none;
      transition: background-color .2s;
    } 
    li a { padding: 0 20px; }
    a:hover, li.active a {
      background-color: rgb(40, 138, 223);
    }
  }
  .setting {
    display: flex;
    align-items: center;
    .set-btn {
      padding: 2px 15px 3px 15px;
      font-size: 14px;
      color: #fff;
      background-color: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-radius: 4px;
      cursor: pointer;
    }
    .set-btn:hover {
      color: #666;
      background-color: #fff;
      user-select: none;
    }
  }
}
</style>