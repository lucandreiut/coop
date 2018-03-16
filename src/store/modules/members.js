import api from '@/api'

export default {
  namespaced: true,
  state: {
    members: {}
  },
  getters: {
    getMembers (state) {
      return state.members
    }
  },
  mutations: {
    initMembers (state, members) {
      state.members = members
    }
  },
  actions: {
    initMember ({commit}, id) {
      api.get('/members').then(response => {
        commit('initMembers', response.data)
      })
    }
  }
}
