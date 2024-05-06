import BatchService from "@/services/batchs/Batch.service.js";

export const namespaced = true

export const state = {
    clinicalCounterSamples: [],
    error: null,
}
export const getters = {
    clinicalCounterSamples: (state) => {
        return state.clinicalCounterSamples
    },
    error: (state) => {
        return state.error
    }
}
export const actions = {
    async getTemporalCounterSamplesBatches({commit}, payload) {
        try {
            const response = await BatchService.getTemporalBatches(payload.user_id, payload.sede_id)
            commit('SET_CLINICAL_COUNTER_SAMPLES', response.data.data.tempContraMuestras)
        } catch (e) {
            commit('SET_ERROR', e.response.data.message)
        }
    }
}
export const mutations = {
    SET_CLINICAL_COUNTER_SAMPLES(state, clinicalCounterSamples) {
        state.clinicalCounterSamples = clinicalCounterSamples
    },
    SET_ERROR(state, error) {
        state.error = error
    }
}