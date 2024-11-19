
export class Fermentation {
    constructor({ id='', batch_id='', start_date='', end_date='',
                    average_temperature='', initial_density='', final_density='',
                    initial_ph='', final_ph='', residual_sugar=''
    }) {
        this.id = id;
        this.batch_id = batch_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.average_temperature = average_temperature;
        this.initial_density = initial_density;
        this.final_density = final_density;
        this.initial_ph = initial_ph;
        this.final_ph = final_ph;
        this.residual_sugar = residual_sugar;
    }
}