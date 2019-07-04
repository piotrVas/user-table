<template>
    <div class="wrap-home">
        <div class="login-cover">
            <div class="login-cover-image"></div>
            <div class="login-cover-bg home-cover-bg"></div>
        </div>
        <div class="wrap-content">
            <h1>Home Page</h1>
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Password</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <th scope="row">{{user.id}}</th>
                        <td>{{user.username}}</td>
                        <td>{{user.password}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        mounted(){
            this.$store.dispatch('getAllUsers');
        },
        computed:{
            users(){
                return this.$store.getters.users;
            }
        }
    }


</script>

<style>
    .home-cover-bg{
        background: url('../assets/home-bg.jpg') no-repeat center center;
    }
    .wrap-content{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 900px;
        margin: 0 auto;
    }
</style>