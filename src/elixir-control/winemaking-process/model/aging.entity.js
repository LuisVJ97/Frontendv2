
export class Aging {

    constructor( {
                     id = '', batch_id='', barrel_type='',
                     start_date='', end_date='', aging_duration_months='',
                     inspections_performed='', inspection_result=''
    }) {
        this.id = id;
        this.batch_id = batch_id;
        this.barrel_type = barrel_type;
        this.start_date = start_date;
        this.end_date = end_date;
        this.aging_duration_months = aging_duration_months;
        this.inspections_performed = inspections_performed;
        this.inspection_result = inspection_result;
    }
}