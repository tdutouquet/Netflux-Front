import { createStore } from 'vuex'
import userService from '@/services/userService'

export default createStore({
  state: {
    siteName: 'Netflux',
    userEmail: localStorage.getItem('userEmail') ?? null,
    isAdmin: localStorage.getItem('isAdmin') ?? null,
  },
  getters: {
    siteName: state => state.siteName,
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
    async logout({commit}) {
      try {
        await userService.logout();
        commit('clearUser');
        commit('clearAdmin');
        return true;
      } catch (error) {
        console.log('Erreur pendant la déconnexion : ', error);
        throw error;
      }
    },
  },
  modules: {
  },
})
