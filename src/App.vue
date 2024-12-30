<template>
  <div class="container">
    <Menu>
      <router-link to="/">Inicio</router-link>
      
      <router-link to="/pacientes">Pacientes</router-link>
      <router-link to="/doctores">Doctores</router-link>
      <router-link to="/citas">Citas</router-link>
      <router-link to="/about">Acerca de...</router-link>
    </Menu>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>

import Menu from './components/Menu.vue'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    Menu
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style lang="scss">
.container{
  padding-top: 50px;
}
</style>
