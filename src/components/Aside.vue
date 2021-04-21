<template>
  <div class="aside">

    <div class="aside-logo">SECRET</div>

    <ul class="aside-container">
      <li class="aside-item"
          v-for="(item, index) of types"
          :key="index"
          :class="{'aside-active': item.value === activeType.value}"
          @click="handleClick(item)">
        <span>{{ item.name }}</span>
      </li>
      <li class="aside-item" :class="{'aside-active': route.name === 'config'}" @click="setting">
        <span>设置</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'Aside',
  props: {
    types: {
      type: Array,
      default: () => ([])
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const visible = ref(false)
    const activeType = computed(() => {
      return route.params
    })
    function showCreateMenu() {
      visible.value = true
    }
    function handleClick(type: { name: string, value: string }) {
      router.push({ name: 'home', params: { value: type.value } })
    }
    onMounted(() => {
      if (!route.params.value && route.name !== 'config') {
        router.push({ name: 'home', params: { value: '1' } })
      }
    })
    function setting() {
      router.push({ name: 'config' })
    }
    return {
      route,
      visible,
      activeType,
      handleClick,
      showCreateMenu,
      setting
    }
  }
})
</script>

<style lang="scss">
.aside {
  height: 100%;
  width: 200px;

  .aside-logo {
    height: 50px;
    line-height: 48px;
    text-align: center;
    color: #7E88C8;
    font-weight: 800;
    font-size: 20px;
    border-bottom: 1px solid #EAEBF1;
  }

  .aside-container {
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
    .aside-active span {
      font-weight: 600;
      color: #7784D7;
      background-color: #E4E7F5;
    }
    li {
      color: #878D97;
      font-weight: 400;
      font-size: 13px;
      text-align: center;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      z-index: 1;
      position: relative;
      margin-top: 10px;
      span {
        display: inline-block;
        width: 160px;
        border-radius: 4px;
        transition: all .3s;
      }
      &:hover span {
        font-weight: 600;
        color: #7784D7;
        background-color: #E4E7F5;
      }
    }
  }
  .aside-create {
    width: 150px;
    height: 30px;
    line-height: 30px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    margin: 20px auto;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
