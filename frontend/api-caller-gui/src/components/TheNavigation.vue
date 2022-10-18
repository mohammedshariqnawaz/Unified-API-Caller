<template>
  <div class="nav-bar">
    <div class="topnav">
      <router-link to="/request">Service Agent Page</router-link>
      <div class="topnav-right">
        <router-link to="/status">Status Page</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.topnav {
  background-color: #333;
  overflow: hidden;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: rgb(248, 248, 248);
  color: black;
}

.topnav-right {
  float: right;
}
</style>
