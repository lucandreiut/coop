/**
 * Created by quentin on 1/15/18.
 */

import api from '@/api'
import ls from '@/services/ls'
import store from '@/store'

export default {
  install: (Vue, options = {}) => {
    api.interceptors.request.use(function (config) {
      // Do something before request is sent
      if (ls.get('token')) {
        if (!config.params) {
          config.params = {}
        }
        config.params.token = ls.get('token')
      }
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })

// Add a response interceptor
    api.interceptors.response.use(function (response) {
      // Do something with response data
      return response
    }, function (error) {
      if (error.response && error.response.status === 401) {
        store.dispatch('auth/logout', !error.response.data.error.indexOf('wrong token'))
        options.router.push({name: 'Signin'})
      }
      return Promise.reject(error)
    })
  }
}
