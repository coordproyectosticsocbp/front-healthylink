import * as API from '@/services/API.js'

export default {

    getDataDashboard() {
        return API.apiClient.get(`/api/v1/encuesta/get/reportes/datadashboard`)
    },
    getDataByDate(initDate, endDate) {
        return API.apiClient.get(`/api/v1/encuesta/get/reportes/databydate/${initDate}/${endDate}`)
    },

}