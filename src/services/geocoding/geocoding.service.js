import * as API from '@/services/API.js'

export default {
    getCountry() {
        return API.apiClient.get(`/api/v1/`)
    }
}