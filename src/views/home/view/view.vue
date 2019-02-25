<template>
  <div>
    <div class="view-bar">
      <Input v-model="value" icon="ios-search-outline" placeholder="搜索..." style="width: 200px" />
      <div class="sec-btn sec-btn__default view-bar-btn" @click="_insert">新增</div>
    </div>
    <password-item v-for="(item, index) of list" :key="index" :pwd="item" @click.native="_clickPwd(item)"></password-item>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import { DBCONFIG } from "../../../lib/config";
  import {decrypt, encrypt} from "../../../lib/lib";
  import PasswordItem from '../../../components/password-item/password-item.vue'
  import dayjs from '@/plugins/dayjs.js'
  export default {
    name: "list-view",
    components: {PasswordItem},
    data() {
      return {
        list: [],
        value: ''
      }
    },
    created() {
      this._getList()
    },
    methods: {
      // 获取列表
      _getList() {
        let list = ipcRenderer.sendSync('find', { type: encrypt(DBCONFIG.password) }, {
          sort: { time: -1 },
          skip: 0,
          limit: 50
        })
        if (!list.err) {
          this.list = list.docs
          this.list.map(item => {
            item.icon = decrypt(item.icon)
            item.time = dayjs(new Date(item.time)).fromNow()
          })
        }
      },
      // 新增
      _insert() {
        this.$router.push({
          name: 'insert'
        })
      },
      // 点击列表项
      _clickPwd(pwd) {
        let data = JSON.parse(JSON.stringify(pwd))
        this.$router.push({
          name: 'detail',
          query: {
            data: {
              icon: data.icon,
              name: data.name,
              other: JSON.parse(decrypt(data.other)),
              password: decrypt(data.password),
              time: data.time,
              username: decrypt(data.username),
              id: data._id
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
.view-bar {
  display: flex;
  height: 32px;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  &-btn {
    margin-left: 12px;
  }
}
</style>
