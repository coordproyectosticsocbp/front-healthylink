import * as API from '@/services/API.js'

export default {
    transporLote(payload) {
        return API.apiClient.post(`/api/v1/encuesta/post/lotesentrasporte`, payload)
    },
    receivealot(payload) {
        return API.apiClient.post(`/api/v1/encuesta/post/lotemuestrasrecibidasbiobanco`, payload)
    }
}