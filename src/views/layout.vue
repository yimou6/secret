<template>
  <div class="layout">
    <Aside :types="types"/>
    <router-view />
  </div>
</template>

<script lang="ts">
import Aside from '@/components/Aside.vue'
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'layout',
  components: { Aside },
  setup() {
    let types = ref([])

    onMounted(() => {
      // 获取初始化配置
      let config: any = localStorage.getItem('config')
      if (config) {
        config = JSON.parse(config)
      } else {
        // 设置默认配置
        config = {
          types: [
            {
              name: '全部',
              key: 'all'
            }
          ]
        }
        localStorage.setItem('config', JSON.stringify(config))
      }
      types.value = config.types
    })

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
