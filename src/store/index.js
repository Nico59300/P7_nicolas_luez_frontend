import Vue from 'vue'
import Vuex from 'vuex'
import authStore from './modules/authStore'
import usersStore from './modules/usersStore'
import postsStore from './modules/postsStore'
import commentsStore from './modules/commentsStore'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    auth: authStore,
    users: usersStore,
    posts: postsStore,
    comments: commentsStore
  },
  
  plugins: [
    createPersistedState({
      paths: ['auth.user']
    })
  ],
})
