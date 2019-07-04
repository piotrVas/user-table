import fb from 'firebase'

export default {
    state:{
       users: []
    },
    mutations:{
        setUsers(state,payload){
            return state.user = payload
        }
    },
    actions:{
        async createUser({commit},payload){
            try{
                await fb.database().ref('users').push(payload);
            }
            catch(error){
                console.log(error);
            }
        },
        async checkUserInDB({commit},payload){
            try{
                let snapShot = await fb.database().ref('users').once('value');
                let obj = snapShot.val();
                for(let key in obj){
                    //console.log(obj[key]);
                    if(obj[key].username === payload.username && obj[key].password === payload.password){
                        return true
                    }
                }
                return false
            }
            catch(error){
                console.log(error);
            }
        },
        async getAllUsers({commit}){
            
        }
    },
    getters:{
        users(state){
            return state.users
        }
    }
}
