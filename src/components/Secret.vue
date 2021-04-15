<template>
  <div class="secret">
    <div v-for="(item, index) of data" :key="index" class="secret-card">
      <div class="secret-card-name">
        <span>{{ item.name }}</span>
        <span> · {{ item.update }}</span>
      </div>
      <div class="secret-card-user">{{ item.user }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Secret',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.secret {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: 540px;
  margin: 15px auto;
  border-top: 1px solid #EAEBF1;
  border-right: 1px solid #EAEBF1;
  .secret-card {
    width: 180px;
    height: 80px;
    background-color: #ffffff;
    border-bottom: 1px solid #EAEBF1;
    border-left: 1px solid #EAEBF1;
    box-sizing: border-box;
    padding: 10px;
    &-name {
      font-size: 12px;
      span:nth-child(1) {
        color: #32495B;
      }
      span:nth-child(2) {
        color: #979797;
      }
    }
    &-user {
      padding-top: 10px;
      font-size: 14px;
      font-weight: 600;
      color: #1d1d1d;
    }
  }
}
</style>
