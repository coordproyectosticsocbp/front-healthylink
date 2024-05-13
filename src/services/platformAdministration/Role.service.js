import * as API from '@/services/API.js'

export default {
    getRoleList() {
        return API.apiClient.get("/api/v1/roles");
    },
    createRole(payload) {
        return API.apiClient.post("/api/v1/roles/store", payload);
    },
    deleteRole(item) {
        return API.apiClient.delete('/api/v1/roles/delete/' + item)
    }
}