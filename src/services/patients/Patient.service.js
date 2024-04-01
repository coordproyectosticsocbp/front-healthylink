import * as API from '@/services/API.js'

export default {

  getPatientsFullList() {
    return API.apiClient.get(`/api/v1/patient/get/patient`)
  },
  getPatientById(patientId) {
    return API.apiClient.get(`/api/v1/patient/get/patient/${patientId}`)
  },
  createPatient(payload) {
    return API.apiClient.post(`/api/v1/patient/post/createpatient`, payload)
  }

}