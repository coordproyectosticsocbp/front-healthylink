import * as API from '@/services/API.js'

export default {

    getDataDashboard() {
        return API.apiClient.get(`/api/v1/encuesta/get/reportes/datadashboard`)
    }

}