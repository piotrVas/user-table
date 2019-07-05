<script>
    import Login from '../pages/Login.vue';
    import Home from '../pages/Home.vue'
    const routes = [
        { path: '/', name: 'login', component: Login, meta:{title:'User Table - Login'} },
        { path: '/home', name: 'home', component: Home, meta:{title:'User Table - Login'}}
    ]
    export default routes;
</script>
