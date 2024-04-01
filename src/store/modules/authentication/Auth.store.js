import router from '@/router/index.js'
import { getError } from '@/utils/helpers/getError.js'
import AuthService from '@/services/authentication/Auth.service.js'

export const namespaced = true

export const state = {
  user: null,
  pw_expired: false,
  loading: false,
  error: null,
  permissions: [],
  loggingOut: false
}

export const getters = {
  authUser: (state) => {
    return state.user
  },
  isAdmin: (state) => {
    return !!(state.user && state.user.roles[0].id === 1)
  },
  pw_expired: (state) => {
    return state.pw_expired
  },
  error: (state) => {
    return state.error
  },
  loading: (state) => {
    return state.loading
  },
  loggedIn: (state) => {
    return !!state.user
  },
  loggingOut: (state) => {
    return state.loggingOut
  },
  guest: () => {
    const storageItem = window.localStorage.getItem('guest')
    if (!storageItem) return false
    if (storageItem === 'isGuest') return true
    if (storageItem === 'isNotGuest') return false
  },
  can: (state) => (permission) => {
    return state.permissions.find(todo => todo.name === permission)
  }
}

export const actions = {
  logout({ commit, dispatch }) {
    commit('SET_IS_LOGGING_OUT', true)
    return AuthService.logout()
      .then(() => {
        commit('SET_USER', null)
        dispatch('setGuest', { value: 'isGuest' })
        commit('SET_IS_LOGGING_OUT', false)
        if (router.currentRoute.value.name !== 'login')
          router.push({ path: '/auth' })
      })
      .catch((error) => {
        commit('SET_IS_LOGGING_OUT', false)
        commit('SET_ERROR', getError(error))
      })
  },
  async getAuthUser({ commit }) {
    commit('SET_LOADING_USER', true)
    commit('SET_PASSWORD_EXPIRED_TODAY', false)
    try {

      const dateCurrent = new Date()
      const today = dateCurrent.getFullYear() + '-' + String(dateCurrent.getMonth() + 1).padStart(2, '0') + '-' + dateCurrent.getDate()

      const response = await AuthService.getAuthUser()
      if (response.data.passwordExpirationDate <= today) commit('SET_PASSWORD_EXPIRED_TODAY', true)
      //console.log(response.data)
      commit('SET_USER', response.data)
      //commit('SET_PERMISSIONS', response.data.roles[0].permissions)
      commit('SET_LOADING_USER', false)
      return response.data
    } catch (error) {
      commit('SET_LOADING_USER', false)
      commit('SET_USER', null)
      commit('SET_ERROR', getError(error))
    }
  },
  setGuest(context, { value }) {
    window.localStorage.setItem('guest', value)
  }
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_PASSWORD_EXPIRED_TODAY(state, pw_expired) {
    state.pw_expired = pw_expired
  },
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions
  },
  SET_LOADING_USER(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_IS_LOGGING_OUT(state, loggingOut) {
    state.loggingOut = loggingOut
  }
}