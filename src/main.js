import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/sb-admin-2.min.css'

import '@/assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index.js'

/** Importing Design Framework */
import FontAwesomeIcon from '@/components/icons/index'

/** Complementary packages */
import axios from 'axios'
import VueAxios from 'vue-axios'

/* Sweet Alert */
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/** Vue Notification */
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

/** Vu3 Tables */
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import 'bootstrap/dist/js/bootstrap.min.js'

/** Vue Signature PAD */
import Vue3Signature from "vue3-signature"

const app = createApp(App)

app.config.productionTip = false
app.use(router)
app.use(store)
app.use(Vue3Toasity, { autoClose: 3000 });
app.use(VueAxios, axios)
app.use(VueSweetalert2)
app.use(Vue3Signature)
window.Swal =  app.config.globalProperties.$swal; //to make a global property

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('EasyDataTable', Vue3EasyDataTable)

app.mount('#app')

