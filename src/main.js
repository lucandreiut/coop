// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.config with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store'
import interceptors from './services/interceptor'

Vue.config.productionTip = false

Vue.use(interceptors, {
  router
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
