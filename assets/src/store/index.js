import Vue from 'vue'
import Vuex from 'vuex'
import Logger from 'vuex/dist/logger'
import VuexPersistence from 'vuex-persist'

import * as auth from './modules/auth'
import * as projects from './modules/projects'

Vue.use(Vuex)
Vue.config.debug = true

const persistence = new VuexPersistence({
  storage: window.localStorage,
  reducer: ({auth, projects: {projects, selectedProjectId}}) => ({
    auth, projects: {projects, selectedProjectId}
  }),
  filter: ({type}) =>
    ['setToken', 'setUser', 'projectsSynced', 'selectProject'].includes(type)
})

export default new Vuex.Store({
  strict: true,

  modules: {
    auth,
    projects
  },

  plugins: [
    persistence.plugin,
    Logger()
  ]
})
