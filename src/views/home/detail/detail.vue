<template>
  <div>
    <div class="detail-bar">
      <div class="sec-btn sec-btn__success" @click="_edit">编辑</div>
      <div class="sec-btn sec-btn__error mr-10" @click="_delete">删除</div>
      <div class="sec-btn sec-btn__default mr-10" @click="_back">返回</div>
    </div>
    <div :style="{'height': `${detailHeight}px`}" class="scrollbar detail-box">
      <div class="detail-item">
        <span class="detail-item-label">图标</span>
        <span class="detail-item-info" :class="`${data.icon} iconfont`"></span>
      </div>
      <div class="detail-item">
        <span class="detail-item-label">名称</span>
        <span class="detail-item-info">{{ data.name }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-label">最后更新时间</span>
        <span class="detail-item-info">{{data.time}}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-label">账号</span>
        <span class="detail-item-info">{{data.username}}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item-label">密码</span>
        <span class="detail-item-info">{{data.password}}</span>
      </div>
      <div class="detail-item-remark">
        <article class="detail-item-remark-info" v-html="html"></article>
      </div>
    </div>

    <!-- 删除确认框 -->
    <Modal
      v-model="modalDel" :mask-closable="false" footer-hide :width="'256px'"
      title="提示">
      <p>此操作将永久删除该条数据，是否继续？</p>
      <div class="btn-right del-info">
        <div class="sec-btn sec-btn__error mr-10" @click="modalDel = false">取消</div>
        <div class="sec-btn sec-btn__primary" @click="_ok">确认</div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  export default {
    name: "detail",
    data() {
      return {
        data: {},
        html: '',
        modalDel: false
      }
    },
    computed: {
      detailHeight: function () {
        return this.$store.state.wh.h - 110
      }
    },
    mounted() {
      let { data } = this.$route.query
      if (data.hasOwnProperty('password')) {
        this.data = data;
        this.html = data.other.render
      } else {
        this.$router.push({ name: 'list-view' })
      }
    },
    methods: {
      // 返回
      _back() {
        this.$router.push({ name: 'list-view' })
      },
      // 删除
      _delete() {
        this.modalDel = true
      },
      // 确认删除
      _ok() {
        let result = ipcRenderer.sendSync('remove', { _id: this.data.id }, {})
        if (!result.err) {
          this.$Message.success('删除成功!')
          this.modalDel = false
          this._back()
        }
      },
      // 编辑
      _edit() {
        this.$router.push({
          name: 'insert',
          query: { data: this.data }
        })
      }
    }
  }
</script>

<style scoped lang="less">
.detail-bar {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 40px;
}
.detail-box {
  overflow-x: hidden;
  overflow-y: auto;
}
.detail-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  &-label {
    display: inline-block;
    width: 50%;
    font-size: 16px;
    text-align: right;
    padding-right: 8px;
  }
  &-info {
    display: inline-block;
    width: 50%;
    font-size: 16px;
    padding-left: 12px;
  }
}
.detail-item-remark {
  width: 90%;
  margin: 0 auto;
  padding: 10px;
}
.del-info {
  margin-top: 12px;
}
</style>
