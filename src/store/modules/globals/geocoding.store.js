import geocodingService from "@/services/geocoding/geocoding.service.js";

export const namespaced = true

export const state = {
    countries: [],
    states: [],
    cities: [],
}

export const getters = {
    countries: (state) => {
        return state.countries
    },
    states: (state) => {
        return state.states
    },
    cities: (state) => {
        return state.cities
    }
}

export const actions = {
    async geoCountries({ commit }) {

        const response = await geocodingService.getCountries()
        //console.log(response.data.data)
        commit('SET_GEO_COUNTRIES', response.data.data)

    },
    async getStatesOfCountry({commit}, payload) {
        const response = await geocodingService.getStatesByCountryId(payload)
        //console.log(response.data.data)
        commit('SET_GEO_STATES', response.data.data)

    },
    async getCitiesOfState({commit}, payload) {
        const response = await geocodingService.getCitiesOfState(payload)
        //console.log(response.data.data)
        commit('SET_GEO_CITIES', response.data.data)

    }
}

export const mutations = {
    SET_GEO_COUNTRIES(state, countries) {
        state.countries = countries
    },
    SET_GEO_STATES(state, states) {
        state.states = states
    },
    SET_GEO_CITIES(state, cities) {
        state.cities = cities
    }
}