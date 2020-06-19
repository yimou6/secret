<template>
  <div class="home">
    <div class="header">
      <ul>
        <li v-for="color of colors" :key="color" :style="{ 'background-color': color }"></li>
      </ul>
      <input type="text" placeholder="search..." class="input">
      <button class="button primary-button" @click="add">
        <i class="iconfont icon-add-select"></i>
      </button>
    </div>

    <div class="content">
      <table cellspacing="0">
        <thead>
        <tr>
          <th>名称</th>
          <th>账号</th>
          <th>时间</th>
          <th>#</th>
        </tr>
        </thead>
      </table>
      <div class="u-table">
        <table cellspacing="0">
          <tbody>
          <tr v-for="(it, index) of list" :key="`t-${index}`" class="c1">
            <td>{{ it.name }}</td>
            <td>{{ it.u }}</td>
            <td>{{ it.time }}</td>
            <td>
              <button class="button default-button"><i class="iconfont icon-search"></i></button>
              <button class="button default-button"><i class="iconfont icon-editor"></i></button>
              <button class="button default-button"><i class="iconfont icon-ashbin"></i></button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="footer">
        <p>共 100</p>
        <div class="pagination">
          <i class="iconfont icon-arrow-lift" title="上一页"></i>
          <input type="text" v-model="current">
          <i class="iconfont icon-arrow-right" title="下一页"></i>
        </div>
      </div>
    </div>

    <Dialog :visible="visible" @close="visible = false"/>
  </div>
</template>

<script>
import Dialog from '../components/Dialog'
export default {
  name: 'Home',
  components: { Dialog },
  data() {
    return {
      colors: ['#E44747', '#7A69E9', '#69E972', '#E9CF69'],
      loading: false,
      searchValue: '',
      visible: true,
      list: [
        {
          name: 'QQ',
          u: '23895197571',
          time: '2020-06-17 15:30'
        },
        {
          name: 'QQ',
          u: '23895197571',
          time: '2020-06-17 15:30'
        },
        {
          name: 'QQ',
          u: '23895197571',
          time: '2020-06-17 15:30'
        }
      ],
      current: 1
    }
  },
  methods: {
    add() {
      this.visible = true
    }
  }
}
</script>

<style lang="scss">
  .home {
    width: 100%;
    height: 100%;
    .content {
      height: calc(100% - 60px);
      overflow-x: hidden;
      overflow-y: auto;
      padding: 10px;
      table {
        width: 100%;
        thead {
          tr > th {
            font-size: 14px;
            color: #546586;
            font-weight: normal;
            box-sizing: border-box;
            border-bottom: 1px solid #546586;
            &:nth-child(1) {
              padding-left: 4px;
            }
          }
        }
        td, th {
          &:nth-child(1) {
            width: 100px;
          }
          &:nth-child(3) {
            width: 180px;
          }
          &:nth-child(4) {
            width: 130px;
          }
        }
        tbody {
          font-size: 13px;
          font-weight: 400;
          tr > td {
            text-align: center;

          }
        }
      }
    }
  }
  .header {
    height: 40px;
    background-color: #ffffff;
    box-shadow: 0 3px 12px #d7d7d7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    ul {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0;
      li {
        width: 40px;
        height: 26px;
        cursor: pointer;
      }
    }
    .input {
      outline: none;
      height: 26px;
      width: 200px;
      background-color: transparent;
      padding: 2px 8px;
      border: 1px solid #7987A1;
      border-radius: 2px;
      box-sizing: border-box;
      color: #7987A1;
      &::placeholder {
        color: #7987A1;
        font-size: 12px;
        font-weight: lighter;
      }
    }
  }
  .u-table {
    height: calc(100% - 50px);
    overflow-y: auto;
    overflow-x: hidden;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-weight: lighter;
      font-size: 12px;
      margin: 0;
    }
    .pagination {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      input {
        height: 18px;
        width: 26px;
        text-align: center;
        outline: none;
        & + .iconfont {
          margin-left: 10px;
        }
      }
      .iconfont {
        font-size: 18px;
        cursor: pointer;
        & + input {
          margin-left: 10px;
        }
        &:hover {
          font-weight: bold;
        }
      }
    }

  }
  .c1 {
    background-color: #E4474720;
    td {
      padding: 5px 0;
      &:nth-child(1)  {
        border-left: 4px solid #E44747;
      }
    }
  }
</style>
