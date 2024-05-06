import BatchService from "@/services/batchs/Batch.service.js";

export const namespaced = true

export const state = {
    clinicalSamples: [],
    error: null,
}
export const getters = {
    clinicalSamples: (state) => {
        return state.clinicalSamples
    },
    error: (state) => {
        return state.error
    }
}
export const actions = {
    async getTemporalBatches({commit}, payload) {
        try {
            const response = await BatchService.getTemporalBatches(payload.user_id, payload.sede_id)
            commit('SET_CLINICAL_SAMPLES', response.data.data.temp_Muestras)
        } catch (e) {
            commit('SET_ERROR', e.response.data.message)
        }
    }
}
export const mutations = {
    SET_CLINICAL_SAMPLES(state, clinicalSamples) {
        state.clinicalSamples = clinicalSamples
    },
    SET_ERROR(state, error) {
        state.error = error
    }
}