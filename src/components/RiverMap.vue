<template>
  <div class="map-container">
    <div class="map">

    </div>
    <div class="flex-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RiverMap'
}
</script>

<style lang="less" scoped>
.map-container {
  position: absolute;
  top: 0; right:0;
  width: calc(100% - @left-pannel-w - 10px);
  height: 100%;
  background-color: #aaa;
  border-radius: 4px;
  overflow: auto;
  .map {
    width: 100%;
    height: 100%;
  }
}
</style>