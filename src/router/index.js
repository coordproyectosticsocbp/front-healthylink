/** Main Importing */
import {createRouter, createWebHashHistory} from 'vue-router'
import middlewarePipeline from '@/middlewares/middlewarePipeline.js'
import auth from '@/middlewares/auth.js'
import guest from '@/middlewares/guest.js'

import DashboardView from '@/views/Dashboard/DashboardView.vue'
import AuthenticationView from '@/views/Authentication/AuthenticationView.vue'
import Login from '@/components/authentication/Login/Login.vue'
import ResetPassword from '@/components/authentication/ResetPassword/ResetPassword.vue'
import PatientsMainComponent from '@/components/patients/PatientsMainComponent.vue'
import PatientList from "@/components/patients/subComponents/PatientsList/PatientList.vue";
import followup from "@/components/patients/subComponents/FollowUp/FollowUp.vue";
import CreateLote from "@/components/patients/subComponents/Lote/CreateLote.vue";
import transport from "@/components/patients/subComponents/Transport/Transport.vue";
import ClinicalSamples from "@/components/patients/subComponents/Lote/SubComponents/ClinicalSamples.vue";
import CounterSamples from "@/components/patients/subComponents/Lote/SubComponents/CounterSamples.vue";
import ShelfAssignment from "@/components/patients/subComponents/ShelfAssignment/ShelfAssignment.vue";
import ShelfClinicalSamples
    from "@/components/patients/subComponents/ShelfAssignment/SubComponents/ShelfClinicalSamples.vue";
import ShelfClinicalCounterSamples
    from "@/components/patients/subComponents/ShelfAssignment/SubComponents/ShelfClinicalCounterSamples.vue";
import Receivealot from "@/components/patients/subComponents/Receivealot/Receivealot.vue";
import UserComponent from "@/components/platformAdministration/Users/UserComponent.vue";
import PermissionsComponent from "@/components/platformAdministration/Permissions/PermissionsComponent.vue";
import RolesComponent from "@/components/platformAdministration/Roles/RolesComponent.vue";
import DashboardGraphicsAdmin from "@/components/Dashboard/DashboardGraphicsAdmin.vue";
import CreatePatientComponent
    from "@/components/patients/subComponents/CreatePatient/CreatePatientForm/CreatePatientComponent.vue";
import InformedConsentComponent
    from "@/components/patients/subComponents/CreatePatient/InformedConsent/InformedConsentComponent.vue";
import PatientHealthSurvey
    from "@/components/patients/subComponents/CreatePatient/HealthSurvey/PatientHealthSurvey.vue";
import NotFoundPage from "@/views/NOTFOUND/NotFoundPage.vue";
import {useStore} from "vuex";

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {middleware: [guest]},
        redirect: () => {
            return {name: 'auth'}
        },
    },
    {
        path: '/auth',
        name: 'auth',
        meta: {middleware: [guest]},
        component: AuthenticationView,
        redirect: () => {
            return {name: 'login'}
        },
        children: [
            {
                path: '/auth/login',
                name: 'login',
                meta: {middleware: [guest]},
                component: Login
            },
            {
                path: '/auth/reset-password',
                name: 'reset-password',
                meta: {middleware: [guest]},
                component: ResetPassword
            }
        ]
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        meta: {middleware: [auth]},
        component: DashboardView,
        redirect: () => {
            return {name: 'statistics'}
        },
        children: [
            {
                path: '/dashboard/statistics',
                name: 'statistics',
                component: DashboardGraphicsAdmin
            }
        ]
    },
    {
        path: '/patient',
        name: 'patient',
        meta: {middleware: [auth]},
        component: DashboardView,
        children: [
            {
                path: '/patient/create-patient',
                name: 'create-patient',
                meta: {middleware: [auth]},
                component: PatientsMainComponent,
                redirect: () => {
                    return {name: 'create-patient-form'}
                },
                children: [
                    {
                        path: '/patient/create-patient/form',
                        name: 'create-patient-form',
                        meta: {middleware: [auth]},
                        component: CreatePatientComponent,
                    },
                    {
                        path: '/patient/create-patient/informed-consent',
                        name: 'create-patient-informed-consent',
                        meta: {middleware: [auth]},
                        component: InformedConsentComponent,
                    },
                    {
                        path: '/patient/create-patient/survey',
                        name: 'create-patient-survey',
                        meta: {middleware: [auth]},
                        component: PatientHealthSurvey,
                    }
                ]
            },
            {
                path: '/patient/patient-list',
                name: 'patient-list',
                meta: {middleware: [auth]},
                component: PatientList
            },
            {
                path: '/patient/FollowUp',
                name: 'Follow-up',
                meta: {middleware: [auth]},
                component: followup
            },
            {
                path: '/patient/createLote',
                name: 'createLote',
                meta: {middleware: [auth]},
                component: CreateLote,
                redirect: () => {
                    return {name: 'muestras'}
                },
                children: [
                    {
                        path: '/patient/createLote/clinical-samples',
                        name: 'muestras',
                        meta: {middleware: [auth]},
                        component: ClinicalSamples
                    },
                    {
                        path: '/patient/createLote/clinical-countersamples',
                        name: 'contramuestras',
                        meta: {middleware: [auth]},
                        component: CounterSamples
                    },
                ]
            },
            {
                path: '/patient/transport',
                name: 'transport',
                meta: {middleware: [auth]},
                component: transport
            },
            {
                path: '/patient/receivealot',
                name: 'receivealot',
                meta: {middleware: [auth]},
                component: Receivealot
            },
            {
                path: '/patient/shelf-assignment',
                name: 'shelf-assignment',
                meta: {middleware: [auth]},
                component: ShelfAssignment,
                redirect: () => {
                    return {name: 'shelf-assignment-samples'}
                },
                children: [
                    {
                        path: '/patient/shelf-assignment/samples',
                        name: 'shelf-assignment-samples',
                        meta: {middleware: [auth]},
                        component: ShelfClinicalSamples
                    },
                    {
                        path: '/patient/shelf-assignment/counter-samples',
                        name: 'shelf-assignment-counter-samples',
                        meta: {middleware: [auth]},
                        component: ShelfClinicalCounterSamples
                    }
                ]
            }
        ]
    },
    {
        path: '/administration',
        name: 'administration',
        meta: {middleware: [auth]},
        component: DashboardView,
        redirect: () => {
            return {name: 'users'}
        },
        children: [
            {
                path: '/administration/users',
                name: 'users',
                meta: {middleware: [auth]},
                component: UserComponent
            },
            {
                path: '/administration/roles',
                name: 'roles',
                meta: {middleware: [auth]},
                component: RolesComponent
            },
            {
                path: '/administration/permissions',
                name: 'permissions',
                meta: {middleware: [auth]},
                component: PermissionsComponent
            },
            {
                path: '/administration/locations',
                name: 'locations',
                meta: {middleware: [auth]},
                component: UserComponent
            },
        ]
    }, // Ahora viene PAGE NOT FOUND
    {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: NotFoundPage,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    strict: true,
    linkActiveClass: 'exact-active',
    linkExactActiveClass: 'exact-active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {left: 0, top: 0}
        }
    }
})

router.beforeEach((to, from, next) => {
    const store = useStore()
    const {middleware} = to.meta
    const context = {to, from, next, store}

    if (!middleware) {
        return next()
    }

    middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})


export default router
