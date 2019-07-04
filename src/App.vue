<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <router-view></router-view>
    <div v-if="error" class="alert alert-danger width-lg" @click="handleError()">
      <span class="close" data-dismiss="alert">×</span>
      <strong>Error!</strong>
      {{ error }}
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    //HelloWorld
  },
  computed: {
      error(){
          return this.$store.getters.error
      }
  },
  methods: {
      handleError(){
          this.$store.dispatch('clearError');
      },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.alert{
  top:0;
  left:0;
  position: fixed;
  width: 100%;
}
</style>
