import Vue from 'vue'
import Router from 'vue-router'
import Base from '@/components/Base'
import Signin from '@/components/Signin'
import Channel from '@/components/Channel'
import Load from '@/components/Load'
import NewChannel from '@/components/NewChannel'
import store from '@/store'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Base',
      component: Base,
      children: [
        {
          path: '',
          name: 'Charger',
          component: Load
        },
        {
          path: '/channels/:id',
          name: 'Channel',
          component: Channel
        },
        {
          path: '/nouveau_chan',
          name: 'NewChannel',
          component: NewChannel
        }
      ]
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Signin' && !store.getters['auth/isConnected']) {
    next({name: 'Signin', query: {redirect: to.fullPath}})
  } else if (to.name === 'Signin' && store.getters['auth/isConnected']) {
    next({name: 'Base'})
  } else {
    next()
  }
})
