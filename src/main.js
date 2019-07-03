import Vue from 'vue'
import routes from './config/PageRouter.vue'

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'


Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VeeValidate)

const router = new VueRouter({
    routes,
    mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
