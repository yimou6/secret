import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/home.vue'
import Init from './views/init/init.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/init',
      name: 'init',
      component: Init
    }
  ]
})
