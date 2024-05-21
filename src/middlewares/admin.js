import store from "@/store/index.js";

export const adminGuard = (to, from, next) => {

    if (store.state.auth.user && store.state.auth.user.roles[0].name === "TEST-RROLE") {
        next()
    } else {
        next({name: 'PageNotFound'})
    }
}