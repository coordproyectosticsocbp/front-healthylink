import * as API from '@/services/API.js'

export default {
    getCountries() {
        return API.apiClient.get(`/api/v1/geografia/getpais`);
    },
    /*getStatesByCountryId(countryID) {
        return API.apiClient.get(`/api/v1/geografia/getdepartamento/${countryID}`);
    },
    getCitiesOfState(stateID) {
        return API.apiClient.get(`/api/v1/geografia/getciudad/${stateID}`);
    }*/
}