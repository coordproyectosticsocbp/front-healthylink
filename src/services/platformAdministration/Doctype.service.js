import * as API from '@/services/API.js'

export default {

    getDocumentTypes() {
        return API.apiClient.get(`/api/v1/doctypes`);
    }

}