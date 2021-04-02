<template>
  <teleport to="body">
    <transition name="fade">
      <div class="dialog" v-show="show">
        <div class="dialog-container">
          <div class="dialog-title" v-show="title">{{ title }}</div>
          <slot/>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, onMounted, watchEffect } from 'vue'
export default defineComponent({
  name: 'Dialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    let { modelValue } = toRefs(props)
    let show = ref(false)

    onMounted(() => {
      show.value = modelValue.value
    })

    watchEffect(() => {
      show.value = modelValue.value
    })

    function close() {
      show.value = false
      context.emit('update:modelValue', false)
    }
    return {
      close,
      show
    }
  }
})
</script>

<style scoped lang="scss">
.dialog {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  .dialog-container {
    background-color: #ffffff;
    position: relative;
    padding: 10px;
    margin: 25px auto 0 auto;
    width: 500px;
    box-shadow: 3px 3px 10px #909090;
    border-radius: 3px;
    animation: dialogFrames 0.3s ease;
    .dialog-title {
      font-size: 16px;
      color: #333333;
      text-align: left;
      padding: 8px 0;
      border-bottom: 1px solid #f3f3f3;
    }
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

@keyframes dialogFrames {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
