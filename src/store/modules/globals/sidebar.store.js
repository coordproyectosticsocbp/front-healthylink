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
    updateCollapsed({commit, state}) {
        commit('SET_COLLAPSED', state)
    },
    updateMiniMenu({commit}) {
        commit('SET_MINI_MENU')
    }
}

export const mutations = {
    SET_COLLAPSED(state) {
        state.collapsed = !state.collapsed
    },
    SET_MINI_MENU(state) {
        state.miniMenu = !state.miniMenu
    }
}