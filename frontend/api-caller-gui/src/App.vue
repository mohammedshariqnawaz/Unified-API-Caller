<template>
  <div id="app">
    <the-navigation></the-navigation>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import TheNavigation from './components/TheNavigation.vue'

export default {
  name: 'App',
  components: {
    TheNavigation,
  }
}

</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
  background-color: grey;
  
}

</style>
