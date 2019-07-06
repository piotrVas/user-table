export default {
    state: {
        reload: false,
        error: null,
        greeting: ''
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
        },
        setGreeting(state,payload){
            state.greeting = payload
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
        },
        setDelayAndRoute({commit},payload){
          commit('setReload', true);
          setTimeout(() => {payload.push('/home');commit('setReload', false);}, 2000);
        },
        setGreeting({commit},payload){
            commit('setGreeting',payload)
        }
    },
    getters: {
        reload(state){
            return state.reload;
        },
        error(state){
            return state.error;
        },
        greeting(state){
            return state.greeting;
        }
    }
}
