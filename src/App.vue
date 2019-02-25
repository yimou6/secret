<template>
  <div id="app">
    <title-bar></title-bar>
    <div class="app-body">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TitleBar from './components/title-bar/title-bar'
export default {
  name: "app",
  components: { TitleBar },
  created() {
    let _this = this
    let wh = { h: window.innerHeight, w: window.innerWidth }
    this.$store.commit('setWH', wh)
    window.onresize = function () {
      _this.$store.commit('setWH', { h: window.innerHeight, w: window.innerWidth })
    }
  }
};
</script>

<style lang="less">
// loading动画
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
.app-body {
  height: calc(100% - 40px);
  width: 100%;
  margin-top: 40px;
  -webkit-app-region: no-drag;
}
</style>
