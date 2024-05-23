import store from "@/store/index.js";

export const adminGuard = (to, from, next) => {

    const isAuthenticated = store.getters['auth/authUser']
    const requiredRole = to.matched.some(record => record.meta.requiredRole)

    if (isAuthenticated) {

        console.log(isAuthenticated.roles[0].name)

        if (requiredRole && !hasRole(isAuthenticated.roles[0].name, requiredRole)) {
            return next({name: 'PageNotFound'})
        }
        return next()
    }

    return next({name: 'login'})
}

function hasRole(userRole, requiredRole) {
    return userRole === requiredRole
}