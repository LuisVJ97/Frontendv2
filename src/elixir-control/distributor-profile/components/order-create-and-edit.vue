<script>
import OrderProcessApiService from "../services/order-history-process-api.service.js"; // Asegúrate de que la ruta sea correcta
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';

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
    order: {
      type: Object,
      default: () => ({
        business: '',
        date: '',
        quantity: 0,
        phone: '',
        contact: {
          phone: '',
          address: '',
          email: '',
          ruc: '',
          wineType: '',
          paymentMethod: '',
          deliveryDate: ''
        }
      }),
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      orderItem: { ...this.order }, // Inicializa con una copia del pedido
    };
  },
  watch: {
    order(newVal) {
      this.orderItem = { ...newVal }; // Actualiza orderItem cuando order cambia
    }
  },
  methods: {
    closeDialog() {
      this.$emit('canceled'); // Emitir evento cancelado al padre
    },
    async saveOrder() {
      try {
        if (this.edit) {
          // Actualizar pedido existente
          await OrderProcessApiService.update(this.orderItem.id, this.orderItem);
        } else {
          // Crear nuevo pedido
          await OrderProcessApiService.create(this.orderItem);
        }
        this.$emit('saved'); // Emitir evento guardado al padre
        this.closeDialog(); // Cerrar el diálogo
      } catch (error) {
        console.error("Error saving order:", error);
      }
    },
  },
};
</script>

<template>
  <div>
    <pv-dialog :visible="visible" @hide="closeDialog" header="Create/Edit Order">
      <div class="form-group">
        <label for="business">Business:</label>
        <pv-input-text id="business" v-model="orderItem.business" required />
      </div>

      <div class="form-group">
        <label for="date">Date:</label>
        <pv-calendar id="date" v-model="orderItem.date" dateFormat="mm/dd/yy" required />
      </div>

      <div class="form-group">
        <label for="quantity">Quantity:</label>
        <pv-input-number id="quantity" v-model="orderItem.quantity" required />
      </div>

      <div class="form-group">
        <label for="phone">Phone:</label>
        <pv-input-text id="phone" v-model="orderItem.phone" required />
      </div>

      <h3>Contact Details</h3>

      <div class="form-group">
        <label for="contactPhone">Contact Phone:</label>
        <pv-input-text
            id="contactPhone"
            v-model="orderItem.contact.phone"
            @update:modelValue="$emit('update:modelValue', $event)"
            required
        />
      </div>

      <div class="form-group">
        <label for="contactAddress">Contact Address:</label>
        <pv-input-text
            id="contactAddress"
            v-model="orderItem.contact.address"
            @update:modelValue="$emit('update:modelValue', $event)"
            required
        />
      </div>

      <div class="form-group">
        <label for="contactEmail">Contact Email:</label>
        <pv-input-text
            id="contactEmail"
            v-model="orderItem.contact.email"
            @update:modelValue="$emit('update:modelValue', $event)"
            required
        />
      </div>

      <div class="form-group">
        <label for="contactRUC">Contact RUC:</label>
        <pv-input-text
            id="contactRUC"
            v-model="orderItem.contact.ruc"
            @update:modelValue="$emit('update:modelValue', $event)"
            required
        />
      </div>


      <!-- Agrega más campos según sea necesario -->

      <template #footer>
        <pv-button label="Cancel" @click="closeDialog" />
        <pv-button label="Save" severity="success" @click="saveOrder" />
      </template>
    </pv-dialog>
  </div>

</template>

<style scoped>

</style>