import api from '@/api'
import { router } from '@/router'

export default {
  namespaced: true,
  state: {
    channels: {}
  },
  getters: {
    getChannels (state) {
      return state.channels
    },
    getChannel (state) {
      return c => state.channels.filter(channel => {
        if (channel._id === c) { return channel }
      })
    }
  },
  mutations: {
    initState (state, channels) {
      state.channels = channels
    },
    addPost (state, post) {
      state.posts.posts.push(post)
    },
    addChannel (state, channel) {
      state.channels.push(channel)
      router.push({path: '/channels/' + channel._id})
    },
    delete (state, channel) {
      state.channels.splice(state.channels.indexOf(channel), 1)
      if (Object.keys(state.channels).length === 0) {
        router.push({name: 'NewChannel'})
      } else {
        router.push({path: '/channels/' + state.channels[0]._id})
      }
    }
  },
  actions: {
    initChannels ({commit}) {
      api.get('/channels').then(response => {
        commit('initState', response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    newChannel ({commit}, newChannel) {
      api.post('/channels', newChannel).then(response => {
        commit('addChannel', response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    deleteChannel ({commit}, credentials) {
      api.delete('channels/' + credentials._id).then(response => {
        commit('delete', credentials)
      })
    }
  }
}
