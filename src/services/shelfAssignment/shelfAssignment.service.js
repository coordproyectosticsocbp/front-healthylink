import * as API from '@/services/API.js'

export default {
    saveShelfCounterSamplesAssignment(payload) {
        return API.apiClient.post(`/api/v1/encuesta/post/asignacionbiobanco`, payload)
    },
    saveShelfSamplesAssignment(payload) {
        return API.apiClient.post(`/api/v1/encuesta/post/asignacionMuestrasEnvio`, payload)
    }
}