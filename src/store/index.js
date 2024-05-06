import {createStore} from 'vuex'

/** Importing Stores Modules */
import * as auth from '@/store/modules/authentication/Auth.store.js'
import * as sidebar from '@/store/modules/globals/sidebar.store.js'
import * as geocoding from '@/store/modules/globals/geocoding.store.js'
import * as clinicalSamples from '@/store/modules/batches/clinicalSample.store.js'
import * as clinicalCounterSamples from '@/store/modules/batches/clinicalCounterSample.store.js'

const store = createStore({
    strict: true,
    modules: {
        auth,
        sidebar,
        geocoding,
        clinicalSamples,
        clinicalCounterSamples
    },
    //plugins
})

export default store