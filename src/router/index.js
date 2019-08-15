import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Poetry from '@/components/Poetry'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/Register',
      name: 'Register',
      component: Register
    }, {
      path: '/Home',
      name: 'Home',
      component: Home
    }, {
      path: '/Poetry',
      name: 'Poetry',
      component: Poetry
    }
  ]
})
