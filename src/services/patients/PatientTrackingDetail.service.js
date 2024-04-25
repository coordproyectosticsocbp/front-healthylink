import * as API from '@/services/API.js'

export default {
    getPatientTrackingDetail(patientID) {
        return API.apiClient.get(`/api/v1/encuesta/get/estadosencuesta/${patientID}`)
    }
}