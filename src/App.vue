<template>
  <div id="app">
    <router-view></router-view>
    <div v-if="error" class="alert alert-danger width-lg" @click="handleError()">
      <span class="close" data-dismiss="alert">×</span>
      <strong>Error!</strong>
      {{ error }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
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
  height: 100%;
}
.alert{
  top:0;
  left:0;
  position: fixed;
  width: 100%;
}
html, body{
  height: 100%;
}
</style>
