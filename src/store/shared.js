export default {
    state: {
        reload: false,
        error: null
    },
    mutations: {
        setReload(state,payload){
            state.reload = payload
        },
        setError(state,payload){
            state.error = payload
        },
        setClearError(state){
            state.error = null
        }
    },
    actions: {
        getReload({commit},payload){
            commit('setReload',payload)
        },
        setError({commit},payload){
            commit('setError',payload)
        },
        clearError({commit}){
            commit('setClearError')
        }
    },
    getters: {
        reload(state){
            return state.reload;
        },
        error(state){
            return state.error;
        }
    }
}
