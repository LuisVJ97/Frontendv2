export class Clients {
    /**
     * Creates an instance of Clients.
     * @param {Object} [params={}] - The parameters to create a Clients instance
     * @param {number} [params.id=0] - The unique identifier of the Clients
     * @param {string} [params.person_name=''] - The name of the person
     * @param {string} [params.dni=''] - The DNI (identification number)
     * @param {string} [params.email=''] - The email of the Clients
     * @param {string} [params.business_name=''] - The business name
     * @param {string} [params.phone=''] - The phone number
     * @param {string} [params.address=''] - The address
     * @param {string} [params.country=''] - The country
     * @param {string} [params.city=''] - The city
     * @param {string} [params.ruc=''] - The RUC (tax identification number)
     * @returns {Clients} - An instance of Clients
     */
    constructor({
                    id = 0,
                    person_name = '',
                    dni = '',
                    email = '',
                    business_name = '',
                    phone = '',
                    address = '',
                    country = '',
                    city = '',
                    ruc = ''
                } = {}) {
        this.id = id;
        this.person_name = person_name;
        this.dni = dni;
        this.email = email;
        this.business_name = business_name;
        this.phone = phone;
        this.address = address;
        this.country = country;
        this.city = city;
        this.ruc = ruc;
    }
}