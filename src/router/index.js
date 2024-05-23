/** Main Importing */
import {createRouter, createWebHashHistory} from "vue-router";
import middlewarePipeline from "@/middlewares/middlewarePipeline.js";
import auth from "@/middlewares/auth.js";
import guest from "@/middlewares/guest.js";

import DashboardView from "@/views/Dashboard/DashboardView.vue";
import AuthenticationView from "@/views/Authentication/AuthenticationView.vue";
import Login from "@/components/authentication/Login/Login.vue";
import ResetPassword from "@/components/authentication/ResetPassword/ResetPassword.vue";
import PatientsMainComponent from "@/components/patients/PatientsMainComponent.vue";
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
import UnauthorizedPage from "@/views/UNATHORIZED/UnauthorizedPage.vue";

const routes = [
    {
        path: "/",
        name: "home",
        meta: {middleware: [guest]},
        redirect: () => {
            return {name: "auth"};
        },
    },
    {
        path: "/auth",
        name: "auth",
        meta: {middleware: [guest]},
        component: AuthenticationView,
        redirect: () => {
            return {name: "login"};
        },
        children: [
            {
                path: "/auth/login",
                name: "login",
                meta: {middleware: [guest]},
                component: Login,
            },
            {
                path: "/auth/reset-password",
                name: "reset-password",
                meta: {middleware: [guest]},
                component: ResetPassword,
            },
        ],
    },
    {
        path: "/dashboard",
        name: "dashboard",
        meta: {middleware: [auth]},
        component: DashboardView,
        redirect: () => {
            return {name: "statistics"};
        },
        children: [
            {
                path: "/dashboard/statistics",
                name: "statistics",
                component: DashboardGraphicsAdmin,
            },
        ],
    },
    {
        path: "/patient",
        name: "patient",
        meta: {middleware: [auth]},
        component: DashboardView,
        children: [
            {
                path: "/patient/create-patient",
                name: "create-patient",
                meta: {
                    middleware: [auth], requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'HEADQUARTERS-PERSON']
                },
                component: PatientsMainComponent,
                redirect: () => {
                    return {name: "create-patient-form"};
                },
                children: [
                    {
                        path: "/patient/create-patient/form",
                        name: "create-patient-form",
                        meta: {
                            middleware: [auth],
                            requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'HEADQUARTERS-PERSON']
                        },
                        component: CreatePatientComponent,
                    },
                    {
                        path: "/patient/create-patient/informed-consent",
                        name: "create-patient-informed-consent",
                        meta: {
                            middleware: [auth],
                            requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'HEADQUARTERS-PERSON']
                        },
                        component: InformedConsentComponent,
                    },
                    {
                        path: "/patient/create-patient/survey",
                        name: "create-patient-survey",
                        meta: {
                            middleware: [auth],
                            requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'HEADQUARTERS-PERSON']
                        },
                        component: PatientHealthSurvey,
                    },
                ],
            },
            {
                path: "/patient/patient-list",
                name: "patient-list",
                meta: {middleware: [auth], requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'HEADQUARTERS-PERSON']},
                component: PatientList,
            },
            {
                path: "/patient/FollowUp",
                name: "Follow-up",
                meta: {
                    middleware: [auth],
                    requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'AUDITOR']
                },
                component: followup,
            },
            {
                path: "/patient/createLote",
                name: "createLote",
                meta: {
                    middleware: [auth],
                },
                component: CreateLote,
                redirect: () => {
                    return {name: "muestras"};
                },
                children: [
                    {
                        path: "/patient/createLote/clinical-samples",
                        name: "muestras",
                        meta: {
                            middleware: [auth],
                            requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'HEADQUARTERS-PERSON']
                        },
                        component: ClinicalSamples,
                    },
                    {
                        path: "/patient/createLote/clinical-countersamples",
                        name: "contramuestras",
                        meta: {
                            middleware: [auth],
                            requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'CONVEYOR']
                        },
                        component: CounterSamples,
                    },
                ],
            },
            {
                path: "/patient/transport",
                name: "transport",
                meta: {
                    middleware: [auth],
                    requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'CONVEYOR']
                },
                component: transport,
            },
            {
                path: "/patient/receivealot",
                name: "receivealot",
                meta: {middleware: [auth], requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'CUSTODIAN-CENTER']},
                component: Receivealot,
            },
            {
                path: "/patient/shelf-assignment",
                name: "shelf-assignment",
                meta: {middleware: [auth], requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'CUSTODIAN-CENTER']},
                component: ShelfAssignment,
                redirect: () => {
                    return {name: "shelf-assignment-samples"};
                },
                children: [
                    {
                        path: "/patient/shelf-assignment/samples",
                        name: "shelf-assignment-samples",
                        meta: {
                            middleware: [auth],
                            requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'CUSTODIAN-CENTER']
                        },
                        component: ShelfClinicalSamples,
                    },
                    {
                        path: "/patient/shelf-assignment/counter-samples",
                        name: "shelf-assignment-counter-samples",
                        meta: {
                            middleware: [auth],
                            requiredRole: ['SUPER-ADMIN', 'GENERAL-OPERATOR', 'CUSTODIAN-CENTER']
                        },
                        component: ShelfClinicalCounterSamples,
                    },
                ],
            },
        ],
    },
    {
        path: "/administration",
        name: "administration",
        meta: {middleware: [auth], requiredRole: ['SUPER-ADMIN']},
        component: DashboardView,
        redirect: () => {
            return {name: "users"};
        },
        children: [
            {
                path: "/administration/users",
                name: "users",
                meta: {middleware: [auth], requiredRole: ['SUPER-ADMIN']},
                component: UserComponent,
            },
            {
                path: "/administration/roles",
                name: "roles",
                meta: {middleware: [auth], requiredRole: ['SUPER-ADMIN']},
                component: RolesComponent,
            },
            {
                path: "/administration/permissions",
                name: "permissions",
                meta: {middleware: [auth], requiredRole: ['SUPER-ADMIN']},
                component: PermissionsComponent,
            },
            {
                path: "/administration/locations",
                name: "locations",
                meta: {middleware: [auth], requiredRole: ['SUPER-ADMIN']},
                component: UserComponent,
            },
        ],
    },
    {
        path: "/unauthorized",
        name: "unauthorized",
        component: UnauthorizedPage,
    },
    // Ahora viene PAGE NOT FOUND
    {
        path: "/:pathMatch(.*)*",
        name: "PageNotFound",
        component: NotFoundPage,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    strict: true,
    linkActiveClass: "exact-active",
    linkExactActiveClass: "exact-active",
    scrollBehavior(to, from, savedPosition) {

        if (savedPosition) {
            return savedPosition
        } else {
            return {left: 0, top: 0}
        }
    }
});

router.beforeEach((to, from, next) => {
    const store = useStore();
    const {middleware} = to.meta;

    const context = {to, from, next, store};

    if (!middleware) {
        return next();
    }

    //console.log(middleware[0])
    //console.log(context)
    middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1),
    });
});

export default router;
