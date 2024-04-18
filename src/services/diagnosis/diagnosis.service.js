import * as API from '@/services/API.js'

export default {
    getAllCie10Diagnosis() {
        return API.apiClient.get(`/api/v1/enfermedades/get/oncologicas`);
    },
}