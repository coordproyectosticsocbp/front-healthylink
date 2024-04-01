import axios from 'axios'
import store from '@/store/index.js'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_BASE_URL__P,
  //baseURL: API_URL,
  withCredentials: true,
  withXSRFToken: true // required to handle the CSRF token
})

console.log(import.meta.env.VITE_NODE_ENV)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  function(error) {
    if (
      error.response &&
      [401, 419].includes(error.response.status) &&
      store.getters['auth/authUser'] &&
      !store.getters['auth/guest']
    ) {
      store.dispatch('auth/logout')
    }
    return Promise.reject(error)
  }
)