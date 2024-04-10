import { createStore } from 'vuex'

/** Importing Stores Modules */
import * as auth from '@/store/modules/authentication/Auth.store.js'
import * as sidebar from '@/store/modules/globals/sidebar.store.js'
import * as geocoding from '@/store/modules/globals/geocoding.store.js'

const store = createStore({
  strict: true,
  modules: {
    auth,
    sidebar,
    geocoding
  }
})

export default store