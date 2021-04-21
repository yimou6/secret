<template>
  <div class="layout">
    <Aside :types="types"/>
    <router-view />
  </div>
</template>

<script lang="ts">
import Aside from '@/components/Aside.vue'
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'layout',
  components: { Aside },
  setup() {
    let types = reactive([
      { name: '默认', value: '1' }
    ])
    return {
      types
    }
  }
})
</script>

<style lang="scss">
.layout {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;

  .container {
    height: 100%;
    width: calc(100% - 200px);
  }
}
</style>
