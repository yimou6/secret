<template>
  <router-view/>
</template>

<style lang="scss">
  body, html {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #e5e8ed;
  }
  ul {
    list-style: none;
  }
  .button {
    outline: none;
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    transition: 0.5s;
  }
  .primary-button {
    background-color: #7987A1;
    color: #ffffff;
    border-radius: 2px;
    border: 1px solid #7987A1;
    font-size: 13px;
    padding: 3px 12px;
    &:hover {
      background-color: #546586;
      border-color: #546586;
    }
  }
  button + button {
    margin-left: 4px;
  }
  .default-button {
    background-color: transparent;
    border: none;
    font-size: 12px;
    padding: 1px;
    border-radius: 50%;
  }
</style>
