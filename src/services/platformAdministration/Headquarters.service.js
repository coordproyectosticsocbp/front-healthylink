import * as API from '@/services/API.js'

export default {
    getHeadquartersList() {
        return API.apiClient.get("/api/v1/sedesmuestras/get/sedestomademuestras");
    },
}