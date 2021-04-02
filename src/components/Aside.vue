<template>
  <div class="aside">
    <div class="aside-logo"></div>
    <ul class="aside-container">
      <li class="aside-item"
          v-for="(item, index) of types"
          :key="index">
        {{ item.name }}
      </li>
      <li class="aside-item" @click="showCreateMenu">添加分类</li>
    </ul>

    <Dialog v-model="visible" title="添加分类">
      <div class="form-item">
        <label for="name">名称</label>
        <input type="text" id="name" autocomplete="off" class="input form-input">
      </div>
      <div class="dialog-footer">
        <button class="button warning-button" @click="visible = false">取消</button>
        <button class="button danger-button" @click="save">保存</button>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Dialog from '@/components/Dialog.vue'
export default defineComponent({
  name: 'Aside',
  components: { Dialog },
  props: {
    types: {
      type: Array,
      default: () => ([])
    }
  },
  setup() {
    const menuList = ref([
      { name: 'Type1' },
      { name: 'Type2' },
      { name: 'Type3' },
      { name: 'Type4' }
    ])
    const visible = ref(false)
    function showCreateMenu() {
      visible.value = true
    }

    return {
      visible,
      menuList,
      showCreateMenu
    }
  }
})
</script>

<style lang="scss">
.aside {
  height: 100%;
  width: 200px;

  .aside-logo {
    height: 100px;
  }
  .aside-container {
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
    .active {
      width: 150px;
      height: 30px;
      background-color: #58508d;
      position: absolute;
      top: 5px;
      left: 25px;
      border-radius: 15px;
      transition: top 0.3s ease;
    }
    li {
      color: #ffffff;
      font-weight: 400;
      font-size: 13px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      z-index: 1;
      position: relative;
      &:after {
        content: "";
        height: 40px;
        width: 0;
        background-color: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0;
        left: 0;
        transition: width 0.3s;
      }
      &:hover::after {
        width: 200px;
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
