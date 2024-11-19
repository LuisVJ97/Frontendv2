
export class ProductionHistory {
    constructor({ id='', batch_id='', harvest_date='', fermentation_start_date='',
                    fermentation_end_date='', pressing_date='', clarification_date='',
                    aging_start_date='', aging_end_date='', bottling_date=''
    }) {
        this.id = id;
        this.batch_id = batch_id;
        this.harvest_date = harvest_date;
        this.fermentation_start_date = fermentation_start_date;
        this.fermentation_end_date = fermentation_end_date;
        this.pressing_date = pressing_date;
        this.clarification_date = clarification_date;
        this.aging_start_date = aging_start_date;
        this.aging_end_date = aging_end_date;
        this.bottling_date = bottling_date;
    }
}