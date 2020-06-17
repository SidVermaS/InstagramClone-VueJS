import Vue from 'vue'
import VueRouter from 'vue-router'
import LocalStorageManager from '../mixins/local_storage_manager'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

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
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=> {
  const result=LocalStorageManager.methods.getStoreValue('user')
  console.log('res: ',result)
  if(result===null) {
    if(to.path==='/login' || to.path==='/register')  {
      next()
    } else  {
      next('/login')
    }
  } else if(result!==null && (to.path==='/login' || to.path==='/register'))  {
    next('/')
  } else  {
    next()
  }
})

export default router
