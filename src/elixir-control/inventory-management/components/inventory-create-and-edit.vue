<script>
import InventoryProcessApiService from "../services/inventory-process-api.service.js";

import  Button  from 'primevue/button';
import  Calendar  from 'primevue/calendar';
import  InputText  from 'primevue/inputtext';
import  InputNumber  from 'primevue/inputnumber';
import  Dialog  from 'primevue/dialog';
export default {
  components: {
    'pv-dialog': Dialog,
    'pv-input-text': InputText,
    'pv-input-number': InputNumber,
    'pv-calendar': Calendar,
    'pv-button': Button,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    entity: {
      type: Object,
      default: () => ({}),
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inventoryItem: {...this.entity},
    };
  },
  watch: {
    entity: {
      handler(newValue) {
        this.inventoryItem = {...newValue};
      },
      deep: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('canceled');
    },
    async saveItem() {
      try {
        console.log("Saving item:", this.inventoryItem);
        if (this.edit) {
          await InventoryProcessApiService.update(this.inventoryItem.id, this.inventoryItem);
        } else {
          await InventoryProcessApiService.create(this.inventoryItem);
        }
        this.$emit('saved');
        this.closeDialog();
      } catch (error) {
        console.error("Error saving item:", error);
      }
    },
  },
};
</script>

<template>
  <div>
    <pv-dialog :visible="visible" @hide="closeDialog" :header="edit ? 'Edit Inventory Item' : 'Add New Inventory Item'">
      <div class="form-group">
        <label for="name">Name:</label>
        <pv-input-text id="name" v-model="inventoryItem.name" required/>
      </div>

      <div class="form-group">
        <label for="quantity">Quantity:</label>
        <pv-input-number id="quantity" v-model="inventoryItem.quantity" required/>
      </div>

      <div class="form-group">
        <label for="unit">Unit:</label>
        <pv-input-text id="unit" v-model="inventoryItem.unit" placeholder="Enter unit (e.g., Kg, Units)" required/>
      </div>

      <div class="form-group">
        <label for="supplier">Supplier:</label>
        <pv-input-text id="supplier" v-model="inventoryItem.supplier" required/>
      </div>

      <div class="form-group">
        <label for="costPerUnit">Cost Per Unit:</label>
        <pv-input-number id="costPerUnit" v-model="inventoryItem.costPerUnit" required/>
      </div>

      <div class="form-group">
        <label for="expiration">Expiration Date:</label>
        <pv-calendar id="expiration" v-model="inventoryItem.expiration" dateFormat="mm/dd/yy" required/>
      </div>

      <div class="form-group">
        <label for="lastUpdated">Last Updated:</label>
        <pv-calendar id="lastUpdated" v-model="inventoryItem.lastUpdated" dateFormat="mm/dd/yy" required/>
      </div>

      <div class="form-group">
        <label for="type">Type:</label>
        <select class="button-type" id="type" v-model="inventoryItem.type" required>
          <option value="">Select Type</option>
          <option value="Raw Material">Raw Material</option>
          <option value="Equipment">Equipment</option>
          <option value="Consumable">Consumable</option>
        </select>
      </div>

      <template #footer>
        <pv-button label="Cancel" @click="closeDialog"/>
        <pv-button label="Save" severity="success" @click="saveItem"/>
      </template>
    </pv-dialog>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 15px;
}
.button-type{
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  padding: 5px;
}
</style>