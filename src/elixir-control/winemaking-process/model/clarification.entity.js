
 export class Clarification {

    constructor({id='', batch_id='', clarification_date='', products_used='',
                    clarification_method='', filtration_date='', clarity_level=''
    }) {
        this.id = id;
        this.batch_id = batch_id;
        this.clarification_date = clarification_date;
        this.products_used = products_used;
        this.clarification_method = clarification_method;
        this.filtration_date = filtration_date;
        this.clarity_level = clarity_level;
    }
 }