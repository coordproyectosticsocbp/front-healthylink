import * as API from '@/services/API.js'

export default {
    getCountries() {
        return API.apiClient.get(`/api/v1/geografia/getpais`);
    },
    getAllStates() {
        return API.apiClient.get(`/api/v1/geografia/getalldepartamento`);
    },
    getAllCities() {
        return API.apiClient.get(`/api/v1/geografia/getallciudad`);
    },
    getStatesByCountryId(countryID) {
        return API.apiClient.get(`/api/v1/geografia/getdepartamento/${countryID}`);
    },
    getCitiesOfState(stateID) {
        return API.apiClient.get(`/api/v1/geografia/getciudad/${stateID}`);
    }
}