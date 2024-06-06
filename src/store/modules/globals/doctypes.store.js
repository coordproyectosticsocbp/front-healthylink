import {getError} from "@/utils/helpers/getError.js";
import DoctypeService from "@/services/platformAdministration/Doctype.service.js";

export const namespaced = true

export const state = {
    documentTypes: [],
    loadingDocumentTypes: false,
    error: null
}

export const getters = {
    documentTypes: (state) => {
        return state.documentTypes
    },
    loadingDocumentTypes: (state) => {
        return state.loadingDocumentTypes
    },
    error: (state) => {
        return state.error
    },
}

export const actions = {
    async getDocumentTypes({commit}) {
        commit('SET_LOADING_DOCUMENT_TYPES', true)

        try {

            const response = await DoctypeService.getDocumentTypes()

            if (!response) commit('SET_ERROR', response.data.message)

            commit('SET_DOCUMENT_TYPES', response.data.data)
            commit('SET_LOADING_DOCUMENT_TYPES', false)

        } catch (error) {
            commit('SET_ERROR', getError(error))
            commit('SET_LOADING_DOCUMENT_TYPES', false)
        }
    }
}

export const mutations = {
    SET_DOCUMENT_TYPES(state, documentTypes) {
        state.documentTypes = documentTypes
    },
    SET_LOADING_DOCUMENT_TYPES(state, loadingDocumentTypes) {
        state.loadingDocumentTypes = loadingDocumentTypes
    },
    SET_ERROR(state, error) {
        state.error = error
    },
}