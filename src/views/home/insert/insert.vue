<template>
  <div class="insert scrollbar"
       ref="insert"
       :style="{ 'height': `${insertHeight}px`}"
       @scroll="_scroll">
    <Spin size="large" fix v-if="spinShow">
      <Icon type="ios-loading" size="18" class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div class="insert-bar" ref="insert-bar">
      <div class="sec-btn sec-btn__warning mr-10" @click="_cancel">取消</div>
      <div class="sec-btn sec-btn__success" @click="_save">保存</div>
    </div>
    <div ref="form">
      <Form label-position="top" :model="form" :rules="fromRules" ref="form-insert">
        <FormItem label="图标">
          <span :class="`${form.icon} iconfont secret-icon`" @click="_selectIcon"/>
        </FormItem>
        <FormItem label="名称" prop="name">
          <Input placeholder="例如：QQ(工作用)" type="text" v-model="form.name"/>
        </FormItem>
        <FormItem label="账号" prop="username">
          <Input placeholder="********" type="text" v-model="form.username"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input placeholder="********" type="password" v-model="form.password"/>
        </FormItem>
        <FormItem label="其他信息描述">
          <div>
            <mavon-editor v-model="value" :toolbars="toolbars" @change="_changeEditor"></mavon-editor>
          </div>
        </FormItem>
      </Form>
    </div>

    <!-- 图标选择 -->
    <Drawer title="图标选择" :closable="false" v-model="drawerIcon" :width="256">
      <span :class="[`${item} iconfont secret-icon-set`, item === form.icon ? 'secret-icon-set_active' : '']"
            v-for="(item, index) of iconList"
            :key="index" @click="_setIcon(item)"></span>
    </Drawer>
  </div>
</template>

<script>
  import { EDITOR_TOOL_BARS, DBCONFIG, ICON } from '@/lib/config'
  import { encrypt } from "../../../lib/lib";
  import { ipcRenderer } from 'electron'
  export default {
    name: "insert",
    data() {
      return {
        iconList: ICON,
        value: '描述',
        toolbars: EDITOR_TOOL_BARS,
        form: {
          icon: 'icon-yuechi',
          name: '',
          username: '',
          password: '',
          other: {
            value: '',
            render: ''
          }
        },
        fromRules: {
          name: [
            { required: true, message: '名称不能为空.', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '帐号不能为空.', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空.', trigger: 'blur' }
          ]
        },
        spinShow: false,
        drawerIcon: false
      }
    },
    computed: {
      insertHeight: function () {
        return this.$store.state.wh.h - 20
      }
    },
    created() {
      let { data } = this.$route.query
      if (data && data.hasOwnProperty('id')) {
        this.form.icon = data.icon
        this.form.name = data.name
        this.form.username = data.username
        this.form.password = data.password
        this.form.other = data.other
        this.value = data.other.value
      }
    },
    methods: {
      // 取消
      _cancel() {
        this.$refs['form-insert'].resetFields()
        this.$router.push({
          name: 'list-view'
        })
      },
      _save() {
        this.$refs['form-insert'].validate(valid => {
          if (valid) {
            this.spinShow = true
            let query = {
              'icon': encrypt(this.form.icon),
              'type': encrypt(DBCONFIG.password),
              'name': this.form.name,
              'username': encrypt(this.form.username),
              'password': encrypt(this.form.password),
              'other': encrypt(JSON.stringify(this.form.other)),
              'time': new Date().getTime()
            }
            let res
            if (this.$route.query.data) {
              res = ipcRenderer.sendSync('update', { _id: this.$route.query.data.id }, { $set: query }, { multi: false })
            } else {
              res = ipcRenderer.sendSync('insert', query)
            }
            if (!res.err) {
              this.spinShow = false
              this.$Message.success('操作成功!')
              this.$refs['form-insert'].resetFields()
              this.$router.push({ name: 'list-view' })
            }
          }
        })
      },
      _selectIcon() {
        this.drawerIcon = true
      },
      _setIcon(icon) {
        this.form.icon = icon
        this.drawerIcon = false
      },
      _scroll() {
        if (this.$refs['insert'].scrollTop > 5) {
          this.$refs['insert-bar'].className = 'insert-bar isFixed'
          this.$refs['form'].style.marginTop = '43px'
        } else {
          this.$refs['insert-bar'].className = 'insert-bar'
          this.$refs['form'].style.marginTop = '0'
        }
      },
      _changeEditor(value, render) {
        this.form.other.value = value
        this.form.other.render = render
      }
    }
  }
</script>

<style scoped lang="less">
.insert {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  &-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
    width: 100%;
    background-color: #ffffff;
  }
  .isFixed {
    position: fixed;
    width: 100%;
    right: 6px;
    top: 40px;
    box-shadow: 1px 0 4px rgba(0, 0, 0, 0.3);
    z-index: 5;
    padding-right: 10px;
  }
}
.secret-icon {
  border-radius: 8px;
  color: #ffffff;
  background-color: #777777;
  font-size: 15px;
  padding: 8px;
  cursor: pointer;
}
.secret-icon-set {
  border-radius: 8px;
  color: #ffffff;
  background-color: #777777;
  font-size: 20px;
  padding: 10px 15px;
  cursor: pointer;
  display: inline-block;
  margin: 2px;
  border: 3px solid #ffffff;
  &_active {
    border: 3px solid #4dcfb5;
  }
  &:hover {
    border: 3px solid #4dcfb5;
  }
}
</style>
