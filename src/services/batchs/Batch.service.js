import * as API from '@/services/API.js'

export default {
    getTemporalBatches(user_id, sede_id) {
        return API.apiClient.get(`/api/v1/encuesta/get/tempmuestras/${user_id}/${sede_id}`)
    },
    saveBatchTemporal(payload) {
        return API.apiClient.post(`/api/v1/encuesta/post/tempmuestras`, payload)
    },
    deleteBatchFromTemporal(payload) {
        return API.apiClient.post(`/api/v1/encuesta/delete/tempmuestras`, payload)
    },
    saveRealBatch(payload) {
        return API.apiClient.post(`/api/v1/encuesta/post/asignarmuestrasalote`, payload)
    }
}