export class InventoryItem {
    constructor(
        id,
        name,
        quantity,
        unit,
        supplier,
        costPerUnit,
        expiration,
        lastUpdated,
        type
    ) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.supplier = supplier;
        this.costPerUnit = costPerUnit;
        this.expiration = expiration;
        this.lastUpdated = lastUpdated;
        this.type = type;
    }
}