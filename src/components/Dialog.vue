<template>
  <transition name="bounce-top">
    <div class="dialog" v-clickoutside="close" v-show="visible">

    </div>
  </transition>
</template>

<script>
import Clickoutside from '../utils/clickoutside'
export default {
  name: 'Dialog',
  directives: { Clickoutside },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
  .dialog {
    position: fixed;
    left: 0;
    top: 45px;
    background-color: #ffffff;
    z-index: 99;
    width: 100%;
    height: calc(100% - 45px);
    overflow: hidden;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .bounce-top-enter-active {
    transition: all .5s ease;
  }
  .bounce-top-leave-active {
    transition: all .5s ease;
  }
  .bounce-top-enter, .bounce-top-leave-to {
    transform: translateY(45px);
    opacity: 0;
  }
</style>
