<template>
  <div class="card">
    <div class="card-name">
      <div class="card-icon">{{ icon }}</div>
      <h3>{{ data.name }}</h3>
    </div>
    <div class="card-user">{{ data.user }}</div>
    <div class="card-date">{{ data.update || data.create }}</div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed, ComputedRef } from 'vue'
import { PwdInfo } from '@/types'

export default defineComponent({
  name: 'Card',
  props: {
    data: {
      type: Object as PropType<PwdInfo>,
      default: () => []
    }
  },
  setup(props) {
    const icon: ComputedRef<string> = computed(() => {
      const { name } = props.data
      if (name) {
        return name.split('')[0]
      }
      return '-'
    })
    return {
      icon
    }
  }
})
</script>

<style lang="scss">
.card {
  background-color: #ffffff;
  padding: 10px;
  width: 25%;
  box-sizing: border-box;
  border-left: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.8s ease;

  &-name {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    .card-icon {
      border: 1px solid rgba(144, 144, 144, 0.6);
      border-radius: 50%;
      width: 36px;
      height: 36px;
      text-align: center;
      line-height: 34px;
      font-weight: bolder;
      font-size: 14px;
      background-color: rgba(144, 144, 144, 0.1);
    }
    h3 {
      font-weight: bold;
      font-size: 16px;
      color: #333333;
      margin: 0;
      padding: 10px 0 15px 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 75%;
      overflow: hidden;
    }
  }

  &-user {
    color: #476582;
    font-size: 13px;
    background-color: rgb(27 31 35 / 5%);
    display: inline-block;
    padding: 2px 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 90%;
    overflow: hidden;
  }

  &-date {
    color: #686868;
    font-size: 12px;
    text-align: right;
    font-weight: 400;
    padding: 10px 0 0 0;
  }
}
</style>
