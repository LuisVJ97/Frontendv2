<script>
import OrderService from '../services/order-history-process-api.service.js';
import OrderCreateAndEdit from "../components/order-create-and-edit.vue";
import HeaderContent from "../../../public/component/header-content.component.vue";
export default {
  components: {
    HeaderContent,
    OrderCreateAndEdit,
  },
  data() {
    return {
      orders: [],
      editDialogVisible: false,
      selectedOrder: null,
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        this.orders = await OrderService.getAllOrders();
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Aquí podrías agregar una notificación al usuario si lo deseas
      }
    },

    showDetails(order) {
      this.selectedOrder = order; // Asigna la orden seleccionada
      console.log(this.selectedOrder); // Verifica que se asigne correctamente
      this.editDialogVisible = true; // Abre el diálogo para editar
    },

    closeEditDialog() {
      this.editDialogVisible = false;
      this.selectedOrder = null; // Limpia la selección
    },

    openNewOrderDialog() {
      // Inicializa selectedOrder con un objeto vacío para nuevo pedido
      this.selectedOrder = {
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
      };

      this.editDialogVisible = true; // Abre el diálogo para crear un nuevo pedido
    }
  },
};
</script>

<template>

  <header-content></header-content>


  <div class="order-history">
    <h1>Order History</h1>

    <pv-data-table
        :value="orders"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 15]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} items"
    >
      <pv-column field="business" header="Business" />
      <pv-column field="date" header="Date" />
      <pv-column field="quantity" header="Quantity" />
      <pv-column field="phone" header="Phone" />

      <pv-column headerStyle="width: 8rem">
        <template #body="{ data }">
          <pv-button icon="pi pi-info-circle" @click="showDetails(data)" />
        </template>
      </pv-column>
    </pv-data-table>

    <!-- Paginador -->
    <paginator :totalRecords="orders.length" :rows="10" @page="onPageChange"></paginator>

    <!-- Botón para agregar un nuevo pedido -->
    <pv-button label="Add New Order" @click="openNewOrderDialog" class="mt-3" />

    <!-- Dialog for order creation/editing -->
    <OrderCreateAndEdit
        v-model:visible="editDialogVisible"
        :order="selectedOrder"
        :edit="selectedOrder !== null"
    @canceled="closeEditDialog"
    @saved="fetchOrders"
    />
  </div>
</template>

<style scoped>

</style>