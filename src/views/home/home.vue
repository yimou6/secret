<template>
  <div class="home">
    <Spin size="large" fix v-if="spinShow">
      <Icon type="ios-loading" size="18" class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div class="home-nav">
      <div class="home-nav-man">
        <img src="../../assets/man.png" alt="man">
      </div>
      <div class="home-nav-insert ripple-go" @click="handleInsert">
        <span>新增</span>
      </div>
    </div>
    <div class="home-list">
      <div class="item" v-for="(item, index) of password" :key="index">
        <div class="item-icon">
          <span v-if="item.data.icon === 'default'" class="icon-item">
            <img src="../../assets/password.png" alt="password">
          </span>
          <span v-else class="icon-item">
            <i :class="`${item.data.icon} icomoon`"></i>
          </span>
        </div>
        <div class="item-info">
          <div>{{item.data.name}}</div>
          <div>{{new Date(item.time).toLocaleString()}}</div>
        </div>
      </div>
      <div class="list-zero" v-if="password.length === 0">暂无数据</div>
    </div>

    <!-- 新增 -->
    <Drawer v-model="drawerShow" :closable="false" title="新增">
      <Form :model="newData" :label-width="60" ref="insertForm" :rules="newRules">
        <FormItem label="图标" prop="icon">
          <span @click="handleIcon" v-if="newData.icon === ''">选择</span>
          <span @click="handleIcon" v-else>
            <span class="icon-item" v-if="newData.icon !== 'default'">
              <i :class="`${newData.icon} icomoon`"></i>
            </span>
            <span v-else class="icon-item">
              <img src="../../assets/password.png" alt="password">
            </span>
          </span>
          <Input v-model="newData.icon" v-show="false"/>
        </FormItem>
        <FormItem label="网站名称" prop="name">
          <Input placeholder="网站名称,如：QQ" type="text" v-model="newData.name"/>
        </FormItem>
        <FormItem label="用户名" prop="username">
          <Input placeholder="用户名" type="text" v-model="newData.username"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input placeholder="密码" type="password" v-model="newData.password"/>
        </FormItem>
        <FormItem label="绑定手机" prop="phone">
          <Input placeholder="绑定手机" type="text" v-model="newData.phone"/>
        </FormItem>
        <FormItem label="绑定邮箱" prop="email">
          <Input placeholder="绑定邮箱" type="text" v-model="newData.email"/>
        </FormItem>
        <FormItem label="其他信息" prop="other">
          <Input placeholder="其他信息" type="text" v-model="newData.other"/>
        </FormItem>
      </Form>
      <div class="drawer-footer">
        <div class="btn btn-white ripple-go" style="margin-right: 8px" @click="cancelInsert">取消</div>
        <div class="ripple-go btn-default btn" @click="submitInsert">提交</div>
      </div>
    </Drawer>

    <!-- 选择图标 -->
    <Drawer v-model="drawerShowIcon" :closable="false" title="选择图标">
      <div class="icon-list">
        <span class="icon-item" @click="selectIcon('default')">
          <i style="font-size: 13px">默认</i>
        </span>
        <span v-for="(item, index) in icon" :key="index" class="icon-item" @click="selectIcon(item)">
          <i :class="`${item} icomoon`"></i>
        </span>
      </div>
    </Drawer>

    <!--  查看/删除/修改  -->
    <Drawer v-model="drawerShowView" :closable="false" title="详细信息"></Drawer>
  </div>
</template>

<script>
  import { readConfig, encrypt, decrypt } from '../../lib/lib'
  import electron from 'electron'
  import { DBCONFIG, ICON } from '../../lib/config'
  export default {
    name: "home",
    data() {
      return {
        spinShow: true,
        password: [],
        drawerShow: false,
        drawerShowIcon: false,
        drawerShowView: false,
        icon: ICON,
        newData: {
          icon: '', // 图标
          name: '', // 网站名称
          username: '', // 用户名
          password: '', // 密码
          phone: '', // 绑定手机
          email: '', // 绑定邮箱
          other: '' // 其他信息，例如QQ安全问题...
        },
        newRules: {
          icon: [
            { required: true, message: '请选择图标', trigger: 'change' }
          ],
          name: [{ required: true, message: '请填写网站名称', trigger: 'blur' }],
          username: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请填写密码', trigger: 'blur' }]
        }
      }
    },
    created() {
      readConfig().then(res => {
        this.spinShow = false
        if (res['success']) {
          this.getList()
        } else {
          this.$router.push({ name: 'init' })
        }
      })
    },
    methods: {
      handleInsert() {
        this.drawerShow = true
      },
      handleIcon() {
        this.drawerShowIcon = true
      },
      // 选择图标
      selectIcon(icon) {
        this.newData.icon = icon
        this.drawerShowIcon = false
      },
      // 取消新增
      cancelInsert() {
        this.drawerShow = false
      },
      // 确认新增
      submitInsert() {
        this.$refs.insertForm.validate(valid => {
          if (valid) {
            let res = electron.ipcRenderer.sendSync('insert', {
              conc: DBCONFIG.password,
              data: encrypt(JSON.stringify(this.newData)),
              time: new Date().getTime()
            })
            if (!res.err) {
              this.$Message.success('添加成功!')
              this.drawerShow = false
              this.getList()
            } else {
              this.$Message.error('添加失败')
            }
          }
        })
      },
      // 获取列表
      getList() {
        this.spinShow = true
        let list = electron.ipcRenderer.sendSync('find', { conc: DBCONFIG.password }, {
          sort: { time: -1 },
          skip: 0,
          limit: 10
        })
        this.spinShow = false
        if (!list.err) {
          this.password = list.docs
          this.password.map(item => {
            item['data'] = JSON.parse(decrypt(item.data))
          })
          console.log(this.password)
        }
      }
    }
  }
</script>

<style scoped lang="less">
.home-nav {
  height: 60px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  &-man {
    width: 50px;
    height: 50px;
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  &-insert {
    cursor: pointer;
    font-size: 15px;
    font-weight: lighter;
    padding: 6px 20px;
    background: linear-gradient(55deg, #E1A960, #7DCFBB);
    border-radius: 18px;
    color: white;
  }
}
.list-zero {
  text-align: center;
  margin-top: 8px;
  font-weight: lighter;
  font-size: 13px;
  color: #777777;
}
.icon-list {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
}
.icon-item {
  display: flex;
  width: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 5px;
  border: 2px solid #777777;
  margin: 2px;
  cursor: pointer;
  font-size: 26px;
  img {
    width: 100%;
    height: 100%;
  }
}
.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.home-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 8px;
  .item {
    background: linear-gradient(55deg, #E1A960, #7DCFBB);
    color: white;
    padding: 8px;
    border-radius: 10px;
    box-shadow: 1px 0 8px rgba(0, 0, 0, 0.14);
    margin: 2px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    .item-icon {
      margin-right: 5px;
      .icon-item {
        border: none;
      }
    }
    .item-info {
      font-weight: lighter;
      font-size: 12px;
    }
  }
}
</style>
