import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入Element
import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });

// 引入axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
