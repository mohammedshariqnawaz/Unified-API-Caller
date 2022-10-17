<template>
  <div id="app">
    <RequestPage />
    <ApiForm/>
    <ApiResponse/>
  </div>
</template>

<script>
import RequestPage from './components/RequestPage.vue'
import ApiForm from './components/ApiForm.vue';
import ApiResponse from './components/ApiResponse.vue'

export default {
  name: 'App',
  components: {
    RequestPage,
    ApiForm,
    ApiResponse
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
