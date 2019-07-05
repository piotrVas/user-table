import Vue from 'vue'
import routes from './config/PageRouter.vue'

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import * as fb from 'firebase'
import VueX from 'vuex'
import store from './store'
import VuePassword from 'vue-password'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'


Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(VueX)
Vue.component(VuePassword)

const router = new VueRouter({
    routes,
    mode: 'hash'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    fb.initializeApp({apiKey: "AIzaSyCm1X3gN-wyJHAEzUVsUk9RUFo4s4_i10Y",
          authDomain: "user-table.firebaseapp.com",
          databaseURL: "https://user-table.firebaseio.com",
          projectId: "user-table",
          storageBucket: "",
          messagingSenderId: "667317373144",
          appId: "1:667317373144:web:b2688f3cccff2d8a"}
          );
  },
}).$mount('#app')
