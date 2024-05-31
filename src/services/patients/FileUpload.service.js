import * as API from '@/services/API.js'

export default {
    imgPreSignedUrl(payload) {
        return API.apiClient.post(`/api/v1/file/upload`, payload)
    }
}