<template>
  <div class="container">
    <div class="search-container">
      <input v-model="searchValue" placeholder="搜索..." class="input search-input">
      <button class="button primary-button" @click="add">添加</button>
    </div>

    <div class="container-title">
      <span>TYPE 1</span>
    </div>

    <Secret :data="list"></Secret>

    <EditSecret ref="editSecret"></EditSecret>
  </div>
</template>

<script lang="ts">
import { ref, Ref } from 'vue'
import Secret from '@/components/Secret.vue'
import EditSecret from '@/components/EditSecret.vue'
import { CEditSecret } from "@/components/editSecret";

export default {
  name: 'Home',
  components: { Secret, EditSecret },
  setup() {
    let list = ref([
      {
        name: 'QQ',
        user: '670746668',
        update: '2020/04/15'
      },
      {
        name: 'QQ',
        user: '670746668',
        update: '2020/04/15'
      },
      {
        name: 'QQ',
        user: '670746668',
        update: '2020/04/15'
      },
      {
        name: 'QQ',
        user: '670746668',
        update: '2020/04/15'
      }
    ])
    let searchValue: Ref<string> = ref('')
    let visible: Ref<boolean> = ref(false)

    const editSecret = ref<CEditSecret | null>(null)
    function add() {
      if (editSecret.value) {
        editSecret.value.init()
      }
    }

    return {
      list,
      visible,
      searchValue,
      editSecret,
      add
    }
  }
}
</script>

<style lang="scss">
.search-container {
  height: 50px;
  line-height: 48px;
  border-bottom: 1px solid #EAEBF1;
  .search-input {
    border-radius: 4px;
    width: 300px;
    margin-left: 10px;
  }
  .primary-button {
    height: 34px;
    width: 88px;
    margin-left: 10px;
    color: #ffffff;
    font-size: 14px;
  }
}
.container-title {
  color: #3a5062;
  font-weight: 600;
  font-size: 14px;
  padding: 15px 20px;
}
</style>
