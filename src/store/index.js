import { createStore } from 'vuex'

export default createStore({
  state: {
    userEmail: localStorage.getItem('userEmail') ?? null,
    isAdmin: localStorage.getItem('isAdmin') ?? null,
  },
  getters: {
    userEmail: state => state.userEmail,
    isLoggedIn: state => !!state.userEmail,
    isAdmin: state => state.isAdmin,
  },
  mutations: {
    setUser(state, email) {
      state.userEmail = email
      localStorage.setItem('userEmail', email)
    },
    setAdmin(state, isAdmin) {
      state.isAdmin = isAdmin
      localStorage.setItem('isAdmin', isAdmin)
    },
    clearUser(state) {
      state.userEmail = null
      localStorage.removeItem('userEmail')
    },
    clearAdmin(state) {
      state.isAdmin = null
      localStorage.removeItem('isAdmin')
    }
  },
  actions: {
  },
  modules: {
  },
})
