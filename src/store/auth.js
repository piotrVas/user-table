import fb from 'firebase'

export default {
    state:{
       users: []
    },
    mutations:{
        setUsers(state,payload){
            console.log(payload);
            return state.users = payload
        }
    },
    actions:{
        async createUser({commit},payload){
            commit('setClearError');
            try{
                await fb.database().ref('users').push(payload);
            }
            catch(error){
                commit('setError', error.message);
            }
        },
        async checkUserInDB({commit},payload){
            commit('setClearError');
            try{
                let snapShot = await fb.database().ref('users').once('value');
                let obj = snapShot.val();
                for(let key in obj){
                    console.log(obj[key]);
                    if(obj[key].username === payload.username && obj[key].password === payload.password){
                        return true
                    }
                }
                return false
            }
            catch(error){
                commit('setError', error.message);
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
                    //console.log(allUsers[key]);
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
        }
    },
    getters:{
        users(state){
            return state.users
        }
    }
}
