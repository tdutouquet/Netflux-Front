import { createStore } from 'vuex'

export default createStore({
  state: {
    userEmail: localStorage.getItem('userEmail') ?? null,
  },
  getters: {
    userEmail: state => state.userEmail,
    isLoggedIn: state => !!state.userEmail,
  },
  mutations: {
    setUser(state, email) {
      state.userEmail = email
      localStorage.setItem('userEmail', email)
    },
    clearUser(state) {
      state.userEmail = null
      localStorage.removeItem('userEmail')
    },
  },
  actions: {
  },
  modules: {
  }
})
