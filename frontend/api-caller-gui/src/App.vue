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

//Dummy Data

// data = 
//     {   "serviceId": 1,
//         "serviceName": "Testing",
//         "apiMethod": "POST",
//         "apiEndpoint": "https://jsonplaceholder.typicode.com/todos",
//         "apiHeaders": {
//             'Content-Type': 'application/json'
//         },
//         "apiBody": {
//             "title": "delectus aut autem",
//             "completed": false
//         },
//         "apiExecuteNow":true,
//         "dataTime": "2019-02-03T06:48:07"
//     }

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
