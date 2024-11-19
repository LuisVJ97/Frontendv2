
export class Product {

    constructor({id = '', name  = '', grape_variety  = '', wine_type  = '',
        origin  = '', alcohol_content  = '', price  = '', food_pairing  = '',
        quantity = 0, image = ''
    }) {
        this.id = id;
        this.name = name;
        this.grape_variety = grape_variety;
        this.wine_type = wine_type;
        this.origin = origin;
        this.alcohol_content = alcohol_content;
        this.price = price;
        this.food_pairing = food_pairing;
        this.quantity = quantity;
        this.image = image;
    }
}