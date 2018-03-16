import api from '@/api'

export default {
  namespaced: true,
  state: {
    posts: {
      idChannel: null,
      posts: []
    }
  },
  getters: {
    getPostsChannel (state) {
      return state.posts
    }
  },
  mutations: {
    initState (state, posts) {
      state.posts.idChannel = posts.idChannel
      state.posts.posts = posts.posts
    },
    addPost (state, post) {
      state.posts.posts.push(post)
    },
    deletePost (state, credentials) {
      state.posts.posts.splice(state.posts.posts.indexOf(credentials.post), 1)
    }
  },
  actions: {
    getPostsChannel ({commit}, idChannel) {
      api.get('/channels/' + idChannel + '/posts').then(response => {
        let res = {idChannel: idChannel, posts: response.data}
        commit('initState', res)
      }).catch(error => {
        console.log(error)
      })
    },
    addPosts ({commit}, credentials) {
      api.post('/channels/' + credentials.idChannel + '/posts', credentials).then(response => {
        commit('addPost', response.data)
      })
    },
    deletePosts ({commit}, credentials) {
      api.delete('/channels/' + credentials.idChannel + '/posts/' + credentials.post._id, credentials.post.message).then(response => {
        commit('deletePost', credentials)
      })
    }
  }
}
