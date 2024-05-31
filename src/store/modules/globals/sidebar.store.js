export const namespaced = true

export const state = {
    collapsed: false,
    miniMenu: false
}

export const getters = {
    collapsed: (state) => {
        return state.collapsed
    },
    miniMenu: (state) => {
        return state.miniMenu
    }
}

export const actions = {
    updateCollapsed({commit}, payload) {
        commit('SET_COLLAPSED', payload)
    },
    updateMiniMenu({commit}) {
        commit('SET_MINI_MENU')
    }
}

export const mutations = {
    SET_COLLAPSED(state, collapsed) {
        state.collapsed = collapsed
    },
    SET_MINI_MENU(state, miniMenu) {
        state.miniMenu = miniMenu
    }
}