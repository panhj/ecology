<template>
  <header>
    <div class="logo">
      <img src="" alt="">
      <span class="title">XXXXXXX</span>
    </div>
    <ul>
      <li><router-link to="#">Go to Foo</router-link></li>
      <li><router-link to="#">Go to Foo</router-link></li>
      <li><router-link to="#">Go to Foo</router-link></li>
      <li><router-link to="#">Go to Foo</router-link></li>
      <li><router-link to="#">Go to Foo</router-link></li>
      <li class="active"><router-link to="#">Go to Foo</router-link></li>
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
  padding: 0 40px;
  color: #fff;
  .logo {
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
      font-size: 20px;
      margin: 0 20px;
    }
  }
  &>ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    li, a {
      display: inline-block;
      width: 120px;
      height: @header-h;
      line-height: @header-h;
      text-align: center;
      user-select: none;
      transition: background-color .2s;
    }
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