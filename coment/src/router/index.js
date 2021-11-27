import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import(/* webpackChunkName: "about" */ '../components/login.vue'), },
  {
    path: '/home', component: () => import(/* webpackChunkName: "about" */ '../components/home.vue'),
    children:[
      { path: '/home', redirect: 'users' },
      // 用户管理
      {path: 'users', component: () => import(/* webpackChunkName: "about" */ '../views/user/user.vue')},
      // 权限管理
      {path: 'roles', component: () => import(/* webpackChunkName: "about" */ '../views/roles/roles.vue')},
      {path: 'rights', component: () => import(/* webpackChunkName: "about" */ '../views/roles/rights')},
      // 商品管理
      {path: 'goods', component: () => import(/* webpackChunkName: "about" */ '../views/commodity/goods.vue')},
      {path: 'params', component: () => import(/* webpackChunkName: "about" */ '../views/commodity/list.vue')},
      {path: 'categories', component: () => import(/* webpackChunkName: "about" */ '../views/commodity/classify.vue')},
      // 订单管理
      {path: 'orders', component: () => import(/* webpackChunkName: "about" */ '../views/order/order.vue')},
      // 数据统计
      {path: 'reports', component: () => import(/* webpackChunkName: "about" */ '../views/data/data.vue')},
    ]

  }
]

const router = new VueRouter({
  routes
})

export default router
