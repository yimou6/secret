<template>
  <div class="layout">
    <Aside/>
    <router-view />
  </div>
</template>

<script lang="ts">
import Aside from '@/components/Aside.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'layout',
  components: { Aside },
  setup() {

    return {}
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
