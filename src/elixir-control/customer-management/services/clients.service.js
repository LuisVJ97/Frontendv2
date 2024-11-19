import http from "../../../shared/services/http-common.js";

export class ClientsService {
    /**
     * API endpoint for clients
     * @type {string}
     */
    resourceEndpoint = '/clients';

    /**
     * Gets all clients
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @method getAll
     */
    getAll() {
        console.log(http.defaults.baseURL);
        console.log(this.resourceEndpoint);
        return http.get(this.resourceEndpoint);
    }

    /**
     * Gets a client by id
     * @param {string|number} id
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @method getById
     */
    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Updates a client by id
     * @param id
     * @param data
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    update(id, data) {
        return http.put(`${this.resourceEndpoint}/${id}`, data);
    }

    /**
     * Creates a new client
     * @param {Object} data
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @method create
     */
    create(data) {
        return http.post(this.resourceEndpoint, data);
    }

    /**
     * Deletes a client by id
     * @param {string|number} id
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @method delete
     */
    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }
}