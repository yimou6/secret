<template>
  <div id="app">
    <div class="app-drag">
      <div class="app-drag-logo">
        <img src="./assets/logo.png" alt="">
        <span>Secret App</span>
      </div>
      <div class="app-drag-nav">
        <img src="./assets/window_min.png" @click="windowMin" alt="min">
        <img src="./assets/window_max.png" @click="windowMax" alt="max">
        <img src="./assets/window_close.png" @click="windowClose" alt="close">
      </div>
    </div>
    <div style="width: 100%; margin-top: 40px;-webkit-app-region: no-drag;">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: "app",
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
};
</script>

<style lang="less">
html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.3);
}
.app-drag {
  width: 100%;
  position: absolute;
  -webkit-app-region: drag;
  height: 40px;
  background: linear-gradient(80deg, #29DDCC, #8E697B);
  display: flex;
  flex-direction: row;
  align-items: center;
  &-logo {
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
      font-family: "Microsoft YaHei UI";
    }
  }
  &-nav {
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
.spin-icon-load {
  animation: ani-spin 1s linear infinite;
}
@keyframes ani-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.ripple, .ripple-go {
  position: relative;
}
.ripple:focus, .ripple-go:focus{
  outline: none;
}
.ripple:after {
  content: "";
  display: block;
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  pointer-events: none;
  background: #ededed no-repeat 50%;
  opacity: 0;
  -webkit-border-radius: 22px;
  -moz-border-radius: 22px;
  border-radius: 22px;
  transition: all .3s;
}
.ripple-go:after {
  content: "";
  display: block;
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  pointer-events: none;
  background: #4dcfb5 no-repeat 50%;
  opacity: 0;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px;
  transition: all .5s;
}
.ripple:active:after, .ripple-go:active:after {
  opacity: .5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0s;
}
.btn {
  display: inline-block;
  padding: 5px 22px;
  font-size: 14px;
  font-weight: lighter;
  -webkit-border-radius: 22px;
  -moz-border-radius: 22px;
  border-radius: 22px;
  cursor: pointer;
  outline: none;
}
.btn-default {
  color: white;
  background: linear-gradient(55deg, #E1A960, #7DCFBB);
}
.btn-white {
  color: #777;
  border: 1px solid #adadad;
}

.scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #648fb0;
}
.scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(145, 145, 145, 0.3);
  border-radius: 2px;
  background-color: #F5F5F5;
}
.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 6px rgba(194, 191, 191, 0.8);
  background-color: #bfc0c0;
}
</style>
