import axios from "axios";

const http = axios.create({ baseURL: "https://my-json-server.typicode.com/SV51-MetaSoft-App-Web/endpoint-winemaking-process2" });

export class ProductApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = _resourceEndpoint;
    }
    getAllResources() {
        return http.get(this.resourceEndpoint);
    }

    getResourceById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(product) {
        return http.post(this.resourceEndpoint, product);
    }

    update(id, product) {
        return http.put(`${this.resourceEndpoint}/${id}`, product);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findResourceById(id) {
        return http.get(`${this.resourceEndpoint}?id=${id}`);
    }
}