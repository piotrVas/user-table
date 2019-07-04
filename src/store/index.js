import Vue from 'vue'
import VueX from 'vuex'
import auth from './auth'
import shared from './shared'

Vue.use(VueX)

export default new VueX.Store({
    modules:{auth, shared}
})
