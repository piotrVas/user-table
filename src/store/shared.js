export default {
    state: {
        reload: false
    },
    mutations: {
        setReload(state,payload){
            state.reload = payload
        }
    },
    actions: {
        getReload({commit},payload){
            commit('setReload',payload)
        }
    },
    getters: {
        reload(state){
            return state.reload;
        }
    }
}
