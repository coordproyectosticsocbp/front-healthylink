import geocodingService from "@/services/geocoding/geocoding.service.js";

export const namespaced = true

export const state = {
    countries: [],/*
    states: null,
    cities: null,
    error: null*/
}

export const getters = {
    countries: (state) => {
        return state.countries
    },
    /*states: (state) => {
        return state.states
    },
    cities: (state) => {
        return state.cities
    }*/
}

export const actions = {
    async geoCountries({ commit }) {

        const response = await geocodingService.getCountries()
        console.log(response.data.data)
        commit('SET_GEO_COUNTRIES', response.data.data)

    },
    updateMiniMenu({commit}) {
        commit('SET_MINI_MENU')
    }
}

export const mutations = {
    SET_GEO_COUNTRIES(state, countries) {
        state.countries = countries
    },
    /*SET_GEO_STATES(states) {
        state.states = states
    },
    SET_GEO_CITIES(cities) {
        state.cities = cities
    }*/
}