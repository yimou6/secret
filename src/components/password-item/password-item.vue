<template>
  <div class="pwd-item">
    <div class="pwd-item__img">
      <span :class="`${pwd.icon} iconfont`"></span>
    </div>
    <div class="pwd-item__info">
      <div class="pwd-item__info-title">{{ pwd.name }}</div>
      <div class="pwd-item__info-time">{{ pwd.time }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "password-item",
    props: {
      pwd: {
        img: '',
        name: '',
        time: ''
      }
    }
  }
</script>

<style scoped lang="less">
.pwd-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 4px;
  cursor: pointer;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  box-shadow:
    1px 0 4px #ffffff,
    1px 0 4px #ffffff,
    1px 0 4px #ffffff,
    1px 0 4px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  transition: all 0.3s;
  &:hover{
    box-shadow: 1px 0 4px rgba(0, 0, 0, 0.14);
    border-left: 2px solid #4dcfb5;
  }
  &__img {
    width: 50px;
    height: 50px;
    margin-right: 12px;
    margin-left: 12px;
    line-height: 50px;
    span {
      font-size: 40px;
    }
  }
  &__info {
    position: relative;
    width: calc(100% - 74px);
    &-title {
      font-size: 16px;
      font-weight: 500;
      text-align: left;
    }
    &-time {
      position: absolute;
      bottom: 6px;
      right: 12px;
      font-size: 12px;
      font-weight: lighter;
      text-align: right;
    }
  }
}
</style>
