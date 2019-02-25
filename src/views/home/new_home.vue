<template>
  <div class="home">
    <transition name="fadeLeft">
      <div class="home-avatar" v-if="showAvatar" @click="_showUser">
        <img src="../../assets/image/man.png" alt="user">
      </div>
    </transition>

    <transition name="fadeLeft">
      <div class="home-user" v-if="showUser">
        <div class="home-user-avatar">
          <img src="../../assets/image/man.png" @click="_hiddenUser">
        </div>
        <!--<div class="home-user-item">-->
          <!--<div class="sec-btn sec-btn__default">设置</div>-->
        <!--</div>-->
        <div class="home-user-item">
          <div class="sec-btn sec-btn__error" @click="_logout">退出登陆</div>
        </div>
      </div>
    </transition>
    <router-view  class="home-view" :style="{ 'width': showUser ? 'calc(100% - 256px)' : '100%' }"/>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import { DBCONFIG } from "../../lib/config";

  export default {
    name: "new_home",
    data() {
      return {
        showAvatar: false,
        showUser: false
      }
    },
    created() {
      let _this = this
      let avatar = setTimeout(() => {
        _this.showAvatar = true
        clearTimeout(avatar)
      }, 500)
      let user = ipcRenderer.sendSync('findOne', { type: DBCONFIG.user })
      if (!user.err) {
        if (user.docs === null) {
          this.$router.push({ name: 'init' })
        }
      } else {
        this.$router.push({ name: 'init' })
      }
    },
    computed: {
      viewWidth: function () {
        console.log(this.$store.state.wh)
        if (this.showUser) {
          return this.$store.state.wh.w
        } else {
          return this.$store.state.wh.w - 256
        }
      }
    },
    methods: {
      // 显示用户信息界面
      _showUser() {
        this.showAvatar = false
        this.showUser = true
      },
      // 隐藏用户信息界面
      _hiddenUser() {
        this.showAvatar = true
        this.showUser = false
      },
      // 退出登陆
      _logout() {
        let logout = ipcRenderer.sendSync('update', { type: DBCONFIG.user }, { $set: { status: "0" } }, {})
        if (!logout.err) {
          this.$Message.error('退出成功!')
          setTimeout(() => {
            this.$router.push({ name: 'init' })
          }, 500)
        } else {
          this.$Message.error('退出登陆失败咯!')
        }
      }
    }
  }
</script>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  &-avatar {
    position: fixed;
    top: 50px;
    left: 10px;
    width: 39px;
    height: 39px;
    border-radius: 50%;
    z-index: 10;
    cursor: pointer;
    box-shadow: 1px 0 4px rgba(0, 0, 0, 0.3);
    background-color: white;
    transition: all 0.3s;
    opacity: 0.5;
    img {
      width: 100%;
      height: 100%;
    }
    &:active {
      box-shadow: 1px 0 4px rgba(0, 0, 0, 0.14);
    }
    &:hover {
      opacity: 1;
    }
  }
  &-user {
    width: 256px;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    position: fixed;
    z-index: 23;
    background: #fff;
    &-avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 16px;
      margin-bottom: 16px;
      img {
        cursor: pointer;
      }
    }
    &-item {
      margin-top: 16px;
      margin-bottom: 16px;
      text-align: center;
      div {
        width: 50%;
      }
    }
  }
  &-view {
    transition: width 0.3s;
    float: right;
    padding: 10px;
    background-color: #ffffff;
  }
}
</style>
