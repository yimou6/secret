import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/new_home.vue'
import View from './views/home/view/view.vue'
import Insert from './views/home/insert/insert.vue'
import Detail from './views/home/detail/detail.vue'
import Init from './views/init/init.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'home',
          redirect: '/view'
        },
        {
          path: 'view',
          name: 'list-view',
          component: View
        },
        {
          path: 'insert',
          name: 'insert',
          component: Insert
        },
        {
          path: 'detail',
          name: 'detail',
          component: Detail
        }
      ]
    },
    {
      path: '/init',
      name: 'init',
      component: Init
    }
  ]
})
