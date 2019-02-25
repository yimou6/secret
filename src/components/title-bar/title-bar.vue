<template>
  <div class="title-bar">
    <div class="title-bar__logo">
      <img src="../../assets/icon/logo.png" alt="小秘密">
      <span>Secret</span>
    </div>
    <div class="title-bar__bar">
      <img src="../../assets/image/window_min.png" @click="windowMin" alt="min">
      <img src="../../assets/image/window_max.png" @click="windowMax" alt="max">
      <img src="../../assets/image/window_close.png" @click="windowClose" alt="close">
    </div>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  export default {
    name: "title-bar",
    methods: {
      // 最小化
      windowMin() {
        ipcRenderer.send('min')
      },
      // 最大化
      windowMax() {
        ipcRenderer.send('max')
      },
      // 关闭
      windowClose() {
        ipcRenderer.send('close')
      }
    }
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
  z-index: 99;
  &__logo {
    cursor: pointer;
    width: 110px;
    height: 35px;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    img {
      height: 100%;
    }
    span {
      padding-left: 8px;
      color: #f9f9f9;
      font-size: 13px;
      font-weight: lighter;
      font-family: "Microsoft YaHei UI",serif;
    }
  }
  &__bar {
    width: calc(100% - 120px);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      cursor: pointer;
      -webkit-app-region: no-drag;
    }
  }
}
</style>
