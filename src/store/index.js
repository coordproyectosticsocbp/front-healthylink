import { createStore } from 'vuex'

/** Importing Stores Modules */
import * as auth from '@/store/modules/authentication/Auth.store.js'

const store = createStore({
  strict: true,
  modules: {
    auth
  }
})

export default store