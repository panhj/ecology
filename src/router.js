import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/ecology',
      component: Layout,
      children : [
        {
          path: 'ecology',
          name: 'ecology',
          redirect: '/ecology/requirements',
          component: () => import(/* webpackChunkName: "about" */ './views/ecology/index.vue'),
          children: [
            {
              path: 'requirements',
              name: 'requirements',
              component: () => import(/* webpackChunkName: "about" */ './views/ecology/Requirements.vue'),
            }
          ]
        }
      ]
    }
  ]
})
