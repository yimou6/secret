<template>
  <div class="container">
    <div class="search-container">
      <span>设置</span>
    </div>
    <div class="config-item">
      <div class="title">分类</div>
      <table cellspacing="0" cellpadding="0" border="0">
        <thead>
        <tr>
          <th>名称</th>
          <th>数量</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(type, index) of types" :key="index">
          <td>{{ type.name }}</td>
          <td>{{ type.num }}</td>
          <td>--</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
const ipcRenderer = window.ipcRenderer
export default defineComponent({
  name: 'Config',
  setup() {
    let types = reactive([])
    onMounted(() => {
      ipcRenderer.send('type-list')
      ipcRenderer.on('type-list-reply', (event, args) => {
        if (args.code === 1) {
          types = args.data
        }
      })
    })
    return {
      types
    }
  }
})
</script>
<style lang="scss" scoped>
.search-container {
  padding: 0 20px;
  span {
    font-size: 16px;
    font-weight: 600;
    color: #2b2b2b;
  }
}
.config-item {
  padding: 0 20px;
  margin-top: 10px;
  .title {
    font-size: 14px;
    color: #555555;
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    th {
      border-bottom: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      overflow: hidden;
      user-select: none;
      background-color: #ffffff;
      padding: 12px 0;
      box-sizing: border-box;
      text-align: center;
      color: #909399;
      font-size: 14px;
    }
    td {
      border-bottom: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      font-size: 14px;
      color: #606266;
      padding: 12px 0;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      text-align: center;
    }
  }
}
</style>
