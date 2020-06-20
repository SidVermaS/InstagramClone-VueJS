import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp as fasThumbsUp, faThumbsDown as fasThumbsDown, faComment as fasComment } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as farThumbsUp, faThumbsDown as farThumbsDown, faComment as farComment } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(fasThumbsUp,fasThumbsDown,fasComment,farThumbsUp,farThumbsDown,farComment) 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)



Vue.config.productionTip = false

const app=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
