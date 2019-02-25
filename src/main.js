import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import './assets/css/primary.less'
import './assets/css/iconfont.css'
import 'mavon-editor/dist/css/index.css'
import './plugins/iview.js'
Vue.config.productionTip = false
Vue.use(mavonEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
