import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import LocalStorageManager from '../mixins/local_storage_manager'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=> {
  const result=LocalStorageManager.methods.getStoreValue('user')
  console.log('res: ',result)
  if(result===null && to.path!=='/login')  {
    next('/login')
  } else  {
    next()
  }
})

export default router
