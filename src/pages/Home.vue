<template>
    <div class="wrap-home">
        <div class="cover">
            <div class="cover-image home-image"></div>
            <div class="cover-bg"></div>
        </div>
        <div v-if="users.length!=0 && !reload" class="wrap-content">
            <h1>Users</h1>
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
                        <td><div class="wrap-item">{{user.username}}</div></td>
                        <td><div class="wrap-item">{{user.password}}</div></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <i class="fa fa-spinner fa-spin fa-3x fa-fw reload" v-if="reload"></i>
        <div  class="user-not-found" v-if="users.length == 0&&!reload"><h2>Users not found</h2></div>
    </div>
</template>
<script>
    export default{
        created(){
            this.$store.dispatch('getAllUsers');
        },
        computed:{
            users(){
                return this.$store.getters.users;
            },
            reload(){
                return this.$store.getters.reload;
            }
        }
    }
</script>
<style>
    .home-image{
        background: url('../assets/home-bg.jpg') no-repeat center center;
        background-size: cover;
    }
    .wrap-home{
        height: 100%;
    }
    .wrap-content{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 900px;
        margin: 0 auto;
        top: 50%;
        transform: translate(0,-50%);
    }
    .wrap-content h1{
        background: #343a40;
        padding: 10px 20px;
        opacity: 0.9;
        color: #fff;
    }
    .reload{
        top: 50%;
        left: 50%;
        position: fixed;
        margin-left: -0.5em;
        color: #fff;
    }
    .user-not-found{
        position: relative;
        max-width: 900px;
        color: white;
        background: #343A40;
        margin: 0 auto;
        padding: 60px;
        opacity:0.8;
    }
    .wrap-item{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    table{
        table-layout: auto;
        opacity: 0.9;
    }
    @media(max-width: 900px){
        table{
            table-layout: fixed;
        }
        .wrap-content{
            margin:60px 5px;
            top: 0;
            transform: translate(0%,0%);
        }
    }
</style>