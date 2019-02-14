<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  background: #7DCFBB no-repeat 50%;
  opacity: 0;
  -webkit-border-radius: 22px;
  -moz-border-radius: 22px;
  border-radius: 22px;
  transition: all .3s;
}

.ripple:active:after, .ripple-go:active:after {
  opacity: .3;
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
</style>
