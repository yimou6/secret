<template>
  <div class="select">
    <input readonly class="select-value" :value="showLabel" @click="changeShow" />
    <ul class="select-ul" v-show="show">
      <li v-for="(item, index) of list" :key="index" @click="handleClick(item)">{{ item.label }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Test',
  props: {
    list: {
      type: Array,
      default: () => ([
        {
          label: '11111111111'
        },
        {
          label: '22222222222'
        },
        {
          label: '33333333333'
        },
        {
          label: '44444444444'
        }
      ])
    }
  },
  setup() {
    let show = ref<boolean>(false)
    let showLabel = ref<string>('')
    function changeShow() {
      show.value = !show.value
    }
    function handleClick(val: { label: string }) {
      show.value = false
    }
    return {
      show,
      showLabel,
      changeShow,
      handleClick
    }
  }
})
</script>

<style scoped lang="scss">
.select {
  width: 160px;
  .select-value {
    height: 32px;
    background-color: #ffffff;
    border: 1px solid #cdcdcd;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid #cdcdcd;
    box-shadow: 0 2px 2px #909090;
    li {
      display: block;
      width: 100%;
      height: 28px;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>
