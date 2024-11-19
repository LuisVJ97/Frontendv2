// src/elixir-control/order-management/model/order-history.entity.js

export class Order {
    constructor(
        id,
        business,
        date,
        quantity,
        phone,
        contact // Objeto que contiene información del contacto
    ) {
        this.id = id; // Identificador único del pedido
        this.business = business; // Nombre del negocio
        this.date = date; // Fecha del pedido
        this.quantity = quantity; // Cantidad de productos
        this.phone = phone; // Teléfono del contacto
        this.contact = contact; // Información del contacto como objeto
    }
}

// Clase para el contacto (opcional)
export class Contact {
    constructor(phone, address, email, ruc, wineType, paymentMethod, deliveryDate) {
        this.phone = phone; // Teléfono del contacto
        this.address = address; // Dirección del contacto
        this.email = email; // Correo electrónico del contacto
        this.ruc = ruc; // RUC del negocio o contacto
        this.wineType = wineType; // Tipo de vino pedido
        this.paymentMethod = paymentMethod; // Método de pago utilizado
        this.deliveryDate = deliveryDate; // Fecha de entrega
    }
}