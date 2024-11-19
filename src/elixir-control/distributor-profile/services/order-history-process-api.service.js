import axios from "axios";
import { Order } from "../model/order-history.entity.js"; // Asegúrate de que la ruta sea correcta

const http = axios.create({ baseURL: "https://my-json-server.typicode.com/SV51-MetaSoft-App-Web/endpoint-distributor-profile-order" }); // Establece la URL base para tu API

export class OrderProcessApiService {
    constructor() {
        this.resourceEndpoint = '/orderHistory'; // Cambia a tu nuevo endpoint
    }

    async getAllOrders() {
        const response = await http.get(this.resourceEndpoint);

        // Mapear los datos de respuesta a instancias de Order
        return response.data.map(item => new Order(
            item.id,
            item.business,
            item.date,
            item.quantity,
            item.phone,
            item.contact // Asegúrate de que contact tenga la estructura correcta
        ));
    }

    getOrderById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(order) {
        return http.post(this.resourceEndpoint, order);
    }

    update(id, order) {
        return http.put(`${this.resourceEndpoint}/${id}`, order);
    }

    async delete(id) {
        return await http.delete(`${this.resourceEndpoint}/${id}`); // Usa id aquí
    }

    findOrderById(id) {
        return http.get(`${this.resourceEndpoint}?id=${id}`); // Ajusta según sea necesario
    }
}

export default new OrderProcessApiService();