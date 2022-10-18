import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//import component for router
import ApiForm from './components/ApiForm'
import StatusPage from './components/StatusPage'

// Import Bootstrap and BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

Vue.config.productionTip = false

//Create routes
const routes = [
  { path: '/request', component: ApiForm },
  { path: '/status', component: StatusPage }
]

//Configure Router
const router = new VueRouter({
  mode:'history',
  routes
})


new Vue({
  router,
  render: function(createElement){
      return createElement(App)
  }
}).$mount('#app')