<template>
  <div class="container">
    <div class="search-container">
      <input v-model="searchValue" placeholder="搜索..." class="input search-input">
      <button class="button primary-button" @click="showAdd">添加</button>
    </div>
    <transition-group name="list-complete" tag="div" class="card-container">
      <Card v-for="item of list" :key="item.id" :data="item"></Card>
    </transition-group>

    <Dialog v-model="visible" title="添加">
      <div class="form-item">
        <label for="name">名称</label>
        <input type="text" id="name" autocomplete="off" class="input form-input">
      </div>
      <div class="form-item">
        <label for="user">用户名</label>
        <input type="text" id="user" name="user" autocomplete="off" class="input form-input">
      </div>
      <div class="form-item">
        <label for="pwd">密码</label>
        <input type="text" id="pwd" name="pwd" class="input form-input">
      </div>
      <div class="form-item">
        <label for="desc">备注</label>
        <div class="form-desc">
          <div id="desc"></div>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="button warning-button" @click="visible = false">取消</button>
        <button class="button danger-button" @click="save">保存</button>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { ref, Ref, onMounted } from 'vue'
import Card from '@/components/Card.vue'
import Dialog from '@/components/Dialog.vue'
import { PwdInfo } from '@/types'
import E from 'wangeditor'

export default {
  name: 'Home',
  components: { Card, Dialog },
  setup() {
    let list: Ref<PwdInfo[]> = ref([])
    let searchValue: Ref<string> = ref('')
    let visible: Ref<boolean> = ref(false)

    function showAdd() {
      visible.value = true
    }

    onMounted(() => {
      // 初始化富文本编辑器
      const editor = new E('#desc')
      editor.config.menus = [
          'bold',
          'emoticon',
          'table'
      ]
      editor.config.height = 160
      // 取消全屏
      editor.config.showFullScreen = false
      editor.create()
    })

    function save() {
      visible.value = false
    }

    return {
      list,
      save,
      searchValue,
      visible,
      showAdd
    }
  }
}
</script>

<style lang="scss">
.search-container {
  height: 60px;
  line-height: 60px;
  .search-input {
    border-radius: 4px;
    width: 220px;
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
.card-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 12px;
}
.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
.form-item {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  label {
    font-size: 14px;
    color: #333333;
    font-weight: 500;
    width: 60px;
    text-align: right;
    display: inline-block;
    padding-right: 8px;
  }
  .form-input {
    display: inline-block;
    position: relative;
    width: 405px;
    border-color: #dcdfe6;
  }
  .form-desc {
    width: 435px;
  }
}
.dialog-footer {
  border-top: 1px solid #f3f3f3;
  margin-top: 10px;
  height: 36px;
  line-height: 36px;
  text-align: right;
}
</style>
