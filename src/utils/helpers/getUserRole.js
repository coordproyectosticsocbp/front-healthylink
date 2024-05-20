export const Role = ({to, next, store}) => {
    const storageItem = window.localStorage.getItem('guest')
    if (storageItem === 'isNotGuest' && !store.getters['auth/authUser']) {
        store.dispatch('auth/getAuthUser').then((response) => {
            console.log(response.data.data)
        })
    }
}