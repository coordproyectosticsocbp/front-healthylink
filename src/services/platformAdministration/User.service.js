import * as API from '@/services/API.js'

export default {
    getUsers() {
        return API.apiClient.get('/api/v1/users');
    },
    getUser(userId) {
        return API.apiClient.get(`/users/${userId}`);
    },
    createUser(payload) {
        return API.apiClient.post('api/v1/users/store', payload);
    },
    inactivateUser(item) {
        return API.apiClient.delete('/api/v1/user/inactivate/' + item);
    },
    updatePassword(payload) {
        return API.apiClient.post('/api/v1/users/change-password', payload);
    },
    updateUser(payload, userId) {
        return API.apiClient.put("/api/v1/users/update/" + userId, payload);
    },
}