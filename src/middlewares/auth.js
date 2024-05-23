export default function auth({to, next, store}) {
    const loginQuery = {name: 'login', query: {redirect: to.fullPath}}
    const isAuthenticated = store.getters['auth/authUser']
    //const requiredRole = to.matched.some(record => record.meta.requiredRole)
    const requiredRole = to.meta.requiredRole

    if (!isAuthenticated) {
        store.dispatch('auth/getAuthUser').then(() => {
            if (!store.getters['auth/authUser']) {
                next(loginQuery)
            } else {
                next()
            }
        })
    } else {

        //console.log(isAuthenticated.roles[0].name, requiredRole)
        if (requiredRole && !hasRole(isAuthenticated.roles[0].name, requiredRole)) {
            //console.log(isAuthenticated.roles[0].name, requiredRole[0])
            return next({name: 'unauthorized'})
        }
        next()
    }
}

function hasRole(userRole, requiredRole) {
    //return userRole === requiredRole
    //if (requiredRole.includes(userRole)) console.log('yeah')
    return requiredRole.includes(userRole)
}