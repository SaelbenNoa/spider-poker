import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'

Vue.use(VueRouter)

const load = type => name => () =>
  System.import(`./${type}/${name}.vue`)

const layout = load('layouts')
const page = load('pages')
const component = load('components')

export default new VueRouter({
  routes: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: page('dashboard/dashboard'),
      beforeEnter: requireAuth,
      children: [
        {
          name: 'Project',
          path: '/dashboard/:projectId',
          component: page('dashboard/project')
        }
      ]
    },

    {
      name: 'Auth',
      path: '/auth',
      component: page('auth/layout'),
      children: [
        {
          name: 'Login',
          path: '/auth/login',
          component: page('auth/login')
        },

        {
          name: 'Logout',
          path: '/auth/logout',
          component: page('auth/logout')
        }
      ]
    },

    {
      path: '/',
      component: layout('base'),
      children: [
        {
          name: 'Home',
          path: '/',
          component: page('home')
        },

        {
          name: 'About',
          path: 'about',
          component: page('about')
        }
      ]
    },

    {
      path: '/init',
      component: page('init')
    },

    {
      name: 'Error',
      path: '*',
      component: component('Error404')
    }
  ]
})

function requireAuth(to, from, next) {
  if (store.getters.isAuthenticated) {
    return next()
  }

  return next({
    name: 'Login'
  })
}