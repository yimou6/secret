<template>
  <teleport to="body">
    <transition name="fade">
      <div class="edit-secret-bg" v-show="show">
        <div class="edit-secret" :class="animationClass">
          <div class="edit-secret-title">添加</div>
          <div class="edit-secret-container">
            <div class="edit-secret-info">
              <label for="name">名称</label>
              <input id="name" autocomplete="off" v-model="form.name"/>
              <label for="pwd">账号</label>
              <input id="user" autocomplete="off" v-model="form.user"/>
              <label for="pwd">密码</label>
              <input id="pwd" autocomplete="off" v-model="form.pwd"/>
            </div>
            <div class="edit-secret-info">
              <label for="remark">备注</label>
              <textarea id="remark" autocomplete="off" rows="10" v-model="form.remark"/>
              <div class="edit-secret-button">
                <button class="default-button" @click="close">取消</button>
                <button class="primary-button">保存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
interface ISecret {
  name: string
  user: string
  pwd: string
  remark: string
}
export default defineComponent({
  setup() {
    const show = ref<boolean>(false)
    const animationClass = ref<string>('show-edit-secret')
    const form = reactive<ISecret>({
      name: '',
      user: '',
      pwd: '',
      remark: ''
    })

    function init () {
      animationClass.value = 'show-edit-secret'
      show.value = true
    }

    function close() {
      animationClass.value = 'hidden-edit-secret'
      show.value = false
    }
    return {
      form,
      animationClass,
      close,
      show,
      init
    }
  }
})
</script>

<style scoped lang="scss">
.edit-secret-bg {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  .edit-secret {
    height: 300px;
    width: 100%;
    position: absolute;
    background-color: #ffffff;
    bottom: 0;
    left: 0;
    .edit-secret-title {
      width: 100%;
      border-bottom: 1px solid #EAEBF1;
      font-size: 14px;
      color: #1d1d1d;
      font-weight: 600;
      height: 42px;
      line-height: 40px;
      padding-left: 10px;
    }
    .edit-secret-container {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
    .edit-secret-info {
      width: 360px;
      padding: 0 20px;
      label {
        margin-top: 15px;
        margin-bottom: 12px;
        display: block;
        font-size: 13px;
        color: #1d1d1d;
      }
      input {
        margin-bottom: 12px;
        display: block;
        background-color: #ffffff;
        background-image: none;
        color: #666666;
        outline: none;
        height: 32px;
        padding: 0 12px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        width: calc(100% - 20px);
      }
      textarea {
        margin-top: 10px;
        display: block;
        background-color: #ffffff;
        background-image: none;
        color: #666666;
        outline: none;
        padding: 0 12px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        width: calc(100% - 20px);
        height: 120px;
      }
      .edit-secret-button {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid #dcdfe6;
        text-align: center;
        button {
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          border: 1px solid #dcdfe6;
          text-align: center;
          box-sizing: border-box;
          outline: none;
          margin: 0;
          transition: .5s;
          font-weight: 500;
          border-radius: 4px;
          padding: 4px 12px;
          font-size: 14px;
          height: 34px;
          width: 88px;
        }
        button + button {
          margin-left: 10px;
        }
        .default-button {
          color: #555555;
          background-color: #ffffff;
        }
        .primary-button {
          color: #ffffff;
          background-color: #7E88C8;
        }
      }
    }
    .edit-secret-info + .edit-secret-info {
      border-left: 1px solid #EAEBF1;
    }
  }
  .show-edit-secret {
    animation: showAnimation 0.5s ease;
  }
  .hidden-edit-secret {
    animation: hiddenAnimation 0.5s ease;
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes showAnimation {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes hiddenAnimation {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(100px);
  }
}
</style>
