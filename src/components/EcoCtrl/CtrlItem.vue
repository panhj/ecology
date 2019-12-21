<template>
  <div class="pannel">
    <h3 class="title">{{title}}</h3>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CtrlItem',
  props: {
    title: {
      type: String,
      default: ""
    }
  }
}
</script>
<style scoped>
.pannel {
  padding: 0 10px;
  color: rgb(41, 81, 202);
}
.title {
  font-size: 17px;
  font-weight: 400;
  padding: 13px 1px 11px 1px;
  border-bottom: 1px solid #eaeaea;
  user-select: none;
}
.content {
  padding: 10px 1px;
}
</style>