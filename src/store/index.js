import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import channel from './modules/channel'
import channels from './modules/channels'
import members from './modules/members'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    auth,
    channel,
    channels,
    members
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
