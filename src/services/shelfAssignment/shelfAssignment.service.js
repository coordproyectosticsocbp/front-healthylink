import * as API from '@/services/API.js'

export default {
    saveShelfCounterSamplesAssignment(payload) {
        return API.apiClient.post(`/api/v1/encuesta/post/asignacionbiobanco`, payload)
    },
    saveShelfSamplesAssignment(payload) {
        return API.apiClient.post(`/api/v1/encuesta/post/asignacionMuestrasEnvio`, payload)
    },
    getTempSponsorBox(payload,biobanco_id) {
        return API.apiClient.get(`/api/v1/encuesta/get/tempmuestrassponsorbox/`+biobanco_id, payload)
    },
    sendBoxSponsor(payload) {
        return API.apiClient.post(`/api/v1/encuesta/post/enviarmuestrassponsor`, payload)
    }
}