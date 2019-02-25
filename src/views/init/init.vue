<template>
  <div class="init" :style="{ height: `${initHeight}px` }">
    <div class="bg">
      <div class="wel" v-if="status">欢迎回来!</div>
      <div class="wel-btn ripple" v-if="status" @click="changeStatus">注册</div>
      <div class="wel" v-if="!status">你好，朋友！</div>
      <div class="wel-btn ripple" v-if="!status" @click="changeStatus">登录</div>
    </div>
    <div class="form">
      <div class="box">
        <div class="box-title" v-if="status">登陆</div>
        <div class="box-title" v-else>注册</div>
        <Form :model="form" ref="form" :rules="rules">
          <FormItem prop="name">
            <Input prefix="ios-person-outline"
                   type="text"
                   v-model="form.name"
                   placeholder="name"/>
          </FormItem>
          <FormItem prop="password">
            <Input prefix="ios-key-outline"
                   type="password"
                   v-model="form.password"
                   placeholder="password"/>
          </FormItem>
        </Form>
        <div class="box-btn">
          <span class="ripple-go" @click="go">GO</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import electron from 'electron'
  import { encrypt } from "../../lib/lib";
  import { DBCONFIG } from "../../lib/config";

  export default {
    name: "init",
    data() {
      const required = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'))
        } else {
          callback()
        }
      }
      return {
        form: {
          name: '',
          password: ''
        },
        status: true,
        initHeight: 300,
        rules: {
          name: [
            { validator: required, trigger: 'blur' }
          ],
          password: [
            { validator: required, trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.initHeight = window.innerHeight - 40
      let _this = this
      window.onresize = function () {
        _this.initHeight = window.innerHeight - 40
      }
    },
    methods: {
      changeStatus() {
        this.status = !this.status
        this.$refs.form.resetFields()
      },
      go() {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.status) {
              // 登录
              let res = electron.ipcRenderer.sendSync('findOne', { type: DBCONFIG.user, data: encrypt(JSON.stringify(this.form)) })
              if (!res.err) {
                if (res.docs) {
                  let update = electron.ipcRenderer.sendSync('update', { _id: res.docs._id }, { $set: { status: "1" }}, {})
                  if (!update.err) {
                    this.$Message.success('登陆成功!')
                    this.$router.push({ name: 'home' })
                  }
                } else {
                  this.$Message.error('登录失败！用户名或密码错误!')
                }
              }
            } else {
              // 注册
              let user = electron.ipcRenderer.sendSync('findOne', { type: DBCONFIG.user })
              if (!user.err) {
                if (user.docs !== null) {
                  this.$Message.error('注册失败！本地只支持一个用户!')
                } else {
                  let res = electron.ipcRenderer.sendSync('insert', {
                    type: DBCONFIG.user,
                    data: encrypt(JSON.stringify(this.form)),
                    status: "0"
                  })
                  // console.log(res)
                  if (!res.err) {
                    this.$Message.success('注册成功!')
                    this.changeStatus()
                  }
                }
              }

            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
.init {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  .bg {
    min-width: 300px;
    width: 50%;
    height: 100%;
    background: linear-gradient(55deg, #E1A960, #7DCFBB);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .wel {
      font-size: 30px;
      color: white;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      font-weight: bold;
      margin-bottom: 40%;
    }
    .wel-btn {
      font-weight: lighter;
      color: #ededed;
      font-size: 20px;
      display: inline-block;
      cursor: pointer;
      padding: 4px 50px;
      border: 1px solid #ededed;
      -webkit-border-radius: 22px;
      -moz-border-radius: 22px;
      border-radius: 22px;
    }
  }
  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .box {
      &-title {
        font-size: 24px;
        color: #7DCFBB;
        margin-bottom: 28px;
        text-align: center;
      }
      &-btn {
        width: 100%;
        text-align: center;
        span {
          display: inline-block;
          width: 100%;
          border-radius: 20px;
          padding-top: 5px;
          padding-bottom: 5px;
          color: #ffffff;
          cursor: pointer;
          background: linear-gradient(55deg, #E1A960, #7DCFBB);
        }
      }
    }
  }
}
</style>
