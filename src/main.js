import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@/assets/sb-admin-2.min.css'

import '@/assets/main.css'

import {createApp} from 'vue'
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
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

/** Vu3 Tables */
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

/** Vue Signature PAD */
import Vue3Signature from "vue3-signature"

/** Vue Sidebar */
import vueAwesomeSidebar from 'vue-awesome-sidebar'
import 'vue-awesome-sidebar/dist/vue-awesome-sidebar.css'

/** Vue Wizard Stepper */
import Vue3FormWizard from 'vue3-form-wizard'
import 'vue3-form-wizard/dist/style.css'

/** Vue Loading Overlay */
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

/** Vue DaysJs */
import * as dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

/** Vue Input Multi Select */
import VueMultiselect from "vue-multiselect";
import 'vue-multiselect/dist/vue-multiselect.css'

/** Vue Excel */
//import JsonExcel from "vue-json-excel3";

const app = createApp(App)

app.config.productionTip = false
app.use(router)
app.use(store)
app.use(Vue3Toastify, {autoClose: 3000});
app.use(VueAxios, axios)
app.use(VueSweetalert2)
app.use(Vue3Signature)
app.use(vueAwesomeSidebar)
app.use(Vue3FormWizard)
app.use(LoadingPlugin)
window.Swal = app.config.globalProperties.$swal; //to make a globals property

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('EasyDataTable', Vue3EasyDataTable)
app.component('VueMultiselect', VueMultiselect)
//app.component("downloadExcel", JsonExcel)

app.config.globalProperties.$dayjs = dayjs.extend(relativeTime);
app.config.globalProperties.$dayjs = dayjs.extend(utc);
app.config.globalProperties.$dayjs = dayjs.extend(timezone);

app.mount('#app')

