import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'

Vue.use(VueRouter)

const load = type => name => () =>
  System.import(`./${type}/${name}.vue`)

const layout = load('components/layout')
const page = load('pages')
const component = load('components')

export default new VueRouter({
  routes: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: page('dashboard/dashboard'),
      beforeEnter: requireAuth
    },

    {
      name: 'Login',
      path: '/auth/login',
      component: page('auth/login'),
      beforeEnter: notAuthenticated
    },

    {
      name: 'Logout',
      path: '/auth/logout',
      component: page('auth/logout')
    },

    {
      name: 'Register',
      path: '/auth/register',
      component: page('auth/register'),
      beforeEnter: notAuthenticated
    },

    {
      name: 'SocialAuthCallback',
      path: '/auth/social',
      component: page('auth/social'),
      beforeEnter: notAuthenticated
    },

    {
      name: 'Profile',
      path: '/user/profile/:username',
      component: page('user/profile')
    },

    {
      name: 'UserSettings',
      path: '/user/settings',
      component: page('user/settings'),
      beforeEnter: requireAuth
    },

    {
      path: '/',
      component: layout('base'),
      children: [
        {
          name: 'Home',
          path: '/',
          component: page('home'),
          beforeEnter: notAuthenticated
        }
      ]
    },

    {
      name: 'Error',
      path: '*',
      component: component('error-404')
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

function notAuthenticated(to, from, next) {
  if (store.getters.isAuthenticated) {
    return next({name: 'Dashboard'})
  }

  return next()
}
