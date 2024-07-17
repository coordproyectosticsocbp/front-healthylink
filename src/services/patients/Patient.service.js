import * as API from '@/services/API.js'

export default {

    getPatientsFullList() {
        return API.apiClient.get(`/api/v1/encuesta/get/encuestassincrf`)
    },
    getfollowup() {
        return API.apiClient.get(`api/v1/encuesta/get/encuestasporestado`)
    },
    getDetailsStudiesForStatus(id) {
        return API.apiClient.get(`api/v1/encuesta/get/encuestasporestado/${id}`)
    },
    //Crear lote
    getLoteWithAperturas() {
        return API.apiClient.get(`api/v1/encuesta/get/tempmuestras/1/1`)
    },
    saveLoteTemp(payload) {
        return API.apiClient.post(`/api/v1/encuesta/post/tempmuestras`, payload);
    },
    deleteLoteTemp(payload) {
        return API.apiClient.post(`/api/v1/encuesta/delete/tempmuestras`, payload);
    },

    createPatient(payload) {
        return API.apiClient.post(`/api/v1/patient/post/createpatient`, payload)
    },
    saveInformedConsent(payload) {
        return API.apiClient.post(`/api/v1/patient/post/patientinformedconsent`, payload);
    },
    saveSurveyInformation(payload) {
        return API.apiClient.post(`/api/v1/encuesta/post/registrarencuesta`, payload);
    },
    saveComplementaryInformation(payload) {
        return API.apiClient.post(`/api/v1/encuesta/post/registrarinformacionhistoriaclinica`, payload)
    },
    validateIfPatientExist(payload) {
        return API.apiClient.post(`/api/v1/patient/get/valdiarpaciente`, payload)
    }

}