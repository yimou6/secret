<template>
  <div class="container">
    <div class="search-container">
      <div class="search-input">
        <input v-model="searchValue" placeholder="搜索..." class="input">
        <img src="@/assets/search.png" alt="search">
      </div>
      <div class="btn">
        <button class="button primary-button" @click="add">
          <img src="@/assets/add.png" alt="add">
        </button>
      </div>
    </div>

    <div class="container-title">
      <span>TYPE 1</span>
    </div>

    <Secret :data="list"></Secret>

    <EditSecret ref="editSecret" @refresh="getList"></EditSecret>
  </div>
</template>

<script lang="ts">
import {ref, Ref, onMounted, defineComponent} from 'vue'
import Secret from '@/components/Secret.vue'
import EditSecret from '@/components/EditSecret.vue'
import { CEditSecret } from "@/components/editSecret";
const ipcRenderer = window.ipcRenderer
export default defineComponent({
  name: 'Home',
  components: { Secret, EditSecret },
  setup() {
    let list = ref([])
    let searchValue: Ref<string> = ref('')
    let visible: Ref<boolean> = ref(false)

    const editSecret = ref<CEditSecret | null>(null)
    function add() {
      if (editSecret.value) {
        editSecret.value.init()
      }
    }
    function getList() {
      console.log('-- get list --')
      ipcRenderer.send('secret-list', { type: '1' })
    }

    onMounted(() => {
      getList()
      ipcRenderer.on('submit-list-reply', (event, args) => {
        if (args.code === 1) {
          list.value = args.data
          console.log(list.value)
        }
      })
    })

    return {
      list,
      visible,
      searchValue,
      editSecret,
      add,
      getList
    }
  }
})
</script>

<style lang="scss">
.search-container {
  height: 50px;
  line-height: 48px;
  border-bottom: 1px solid #EAEBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search-input {
    width: 300px;
    margin-left: 20px;
    position: relative;
    input {
      border-radius: 4px;
      width: calc(100% - 24px);
    }
    img {
      width: 16px;
      height: 16px;
      position: absolute;
      right: 6px;
      top: 18px;
    }
  }
  .btn {
    margin-right: 20px;
    padding-top: 10px;
  }
  .primary-button {
    height: 34px;
    width: 40px;
    margin-left: 10px;
    color: #ffffff;
    font-size: 14px;
    padding: 0;
    line-height: 0;
    img {
      width: 20px;
    }
    &:hover {
      background-color: rgba(88, 80, 141, .9);
    }
  }
}
.container-title {
  color: #3a5062;
  font-weight: 600;
  font-size: 14px;
  padding: 15px 20px;
}
</style>
