import fb from 'firebase/app';
import 'firebase/database';

export default {
    state:{
       users: []
    },
    mutations:{
        setUsers(state,payload){
            return state.users = payload;
        }
    },
    actions:{
        async createUser({commit},payload){
            commit('setClearError');
            try{
                if(payload.route) delete payload.route;
                await fb.database().ref('users').push(payload);
            }
            catch(error){
                commit('setError', error.message);
            }
        },
        async checkUserInDB({commit, dispatch},payload){
            commit('setClearError');
            try{
                let snapShot = await fb.database().ref('users').once('value');
                let obj = snapShot.val();
                for(let key in obj){
                    if(obj[key].username === payload.username && obj[key].password === payload.password){
                        dispatch('setDelayAndRoute', payload.route);
                        dispatch('setUserInLocal',payload);
                        commit('setGreeting',`Nice to see You again, ${payload.username}`);
                        return
                    }
                    else if(obj[key].username === payload.username && obj[key].password !== payload.password){
                        throw {message: 'This user name already exists'};
                    }
                }
                dispatch('setDelayAndRoute', payload.route);
                dispatch('createUser', payload);
                dispatch('setUserInLocal',payload);
                commit('setGreeting',`Welcome, ${payload.username}`);
            }
            catch(error){
                commit('setError', error.message);
                commit('setReload', false);
            }
        },
        async getAllUsers({commit}){
            commit('setClearError');
            commit('setReload',true);
            try{
                const fbVal = await fb.database().ref('users').once('value');
                let allUsers = fbVal.val() || [];
                const users = [];
                let count = 1
                Object.keys(allUsers).forEach(key=>{
                    allUsers[key].id = count++;
                    users.push(allUsers[key]);
                });
                commit('setUsers',users);
                commit('setReload',false);
            }
            catch(error){
                commit('setError',error.message);
                commit('setReload',false);
            }
        },
        setUserInLocal({commit},payload){
            try{
                if(payload.route)delete payload.route;
                localStorage[payload.username] = JSON.stringify(payload);
            }
            catch(error){
                commit('setError',error.message);
            }

        }
    },
    getters:{
        users(state){
            return state.users
        }
    }
}
