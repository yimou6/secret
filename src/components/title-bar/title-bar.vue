<template>
  <div class="title-bar">

  </div>
</template>

<script>
  export default {
    name: "title-bar"
  }
</script>

<style scoped lang="less">
.title-bar {
  width: 100%;
  position: absolute;
  -webkit-app-region: drag;
  height: 40px;
  background: linear-gradient(80deg, #29DDCC, #8E697B);
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
