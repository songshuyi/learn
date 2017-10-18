import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store/store'
import router from '@/router/router'

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
