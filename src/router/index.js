import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import LocalStorageManager from '../mixins/local_storage_manager'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import FullPost from '../views/FullPost.vue'
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
    path: '/user/:user_id',
    name: 'User',
    component: User
  },
  {
    path: '/post/:post_id',
    name: 'FullPost',
    component: FullPost
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
  if(result===null) {
    if(to.path==='/login' || to.path==='/register')  {
      next()
    } else  {
      next('/login')
    }
  } else if(result!==null && (to.path==='/login' || to.path==='/register'))  {
    store.dispatch('setUser', JSON.parse(result))
    next('/')
  } else  {
    store.dispatch('setUser', JSON.parse(result))
    next()
  }
})

export default router
