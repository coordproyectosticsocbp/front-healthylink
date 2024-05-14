import * as API from '@/services/API.js'

export default {
    getPermissionsList() {
        return API.apiClient.get("/api/v1/permissions");
    },
    createPermission(payload) {
        return API.apiClient.post("/api/v1/permissions/store", payload);
    },
    deletePermission(item) {
        return API.apiClient.delete('/api/v1/permissions/delete/' + item)
    }
}