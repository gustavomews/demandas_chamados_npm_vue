import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.token,
    urlAccessApi: 'http://127.0.0.1:8000/api',
    urlFetchApi: 'http://127.0.0.1:8000/api/v1',
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
