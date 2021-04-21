<template>
  <div class="select" ref="select">
    <input class="select-value"
           autocomplete="off"
           placeholder="请选择"
           :value="showLabel"
           readonly
           @click="changeShow" />
    <div class="select-content" v-show="show">
      <ul class="select-ul">
        <li v-for="(item, index) of list" :key="index" @click="handleClick(item)">{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
interface ISelectOption {
  label: string
  value: string
}
export default defineComponent({
  name: 'Select',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    let show = ref<boolean>(false)
    let showLabel = ref<string>('')
    const select = ref<HTMLDivElement | null>(null)
    function changeShow() {
      show.value = !show.value
    }
    function handleClick(val: ISelectOption) {
      showLabel.value = val.label
      ctx.emit('update:modelValue', val.value)
      ctx.emit('change', val.value, val)
      show.value = false
    }
    function handleClickOther(e: Event) {
      if (select.value) {
        // contains(other: Node | null): boolean;
        // interface Node extends EventTarget
        if (!select.value.contains((e.target as Node))) {
          show.value = false
        }
      }
    }
    onMounted(() => {
      if (props.modelValue) {
        const index: number = props.list.findIndex(it => (it as ISelectOption).value === props.modelValue)
        if (index !== -1) {
          showLabel.value = (props.list[index] as ISelectOption).label
        }
      }
      document.addEventListener('click', handleClickOther)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOther)
    })
    return {
      show,
      select,
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
  position: relative;
  .select-value {
    display: block;
    background-color: #ffffff;
    background-image: none;
    color: #666666;
    outline: none;
    height: 32px;
    padding: 0 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    width: calc(100% - 24px);
  }
  .select-content {
    position: absolute;
    z-index: 10;
    top: 34px;
    margin: 8px 0 0 0;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    overflow: auto;
    width: 100%;
    max-height: 200px;
    background-color: #ffffff;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
