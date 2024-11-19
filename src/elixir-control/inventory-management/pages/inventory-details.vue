<script>
import HeaderContent from "../../../public/component/header-content.component.vue";

export default {
  components: {HeaderContent},
  data() {
    return {
      item: null,
    };
  },
  created() {
    const id = this.$route.params.id;
    this.fetchItemDetails(id);
  },
  methods: {
    async fetchItemDetails(id) {
      const response = await fetch(`https://my-json-server.typicode.com/SV51-MetaSoft-App-Web/endpoint-inventory-management/inventoryList/${id}`);
      this.item = await response.json();
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString(undefined, options);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<template>
  <header-content></header-content>
  <div class="inventory-details">
    <h1>Inventory Item Details</h1>

    <div v-if="item" class="card">
      <div class="card-content">
        <h2>{{ item.name }}</h2>
        <p><strong>Quantity:</strong> {{ item.quantity }}</p>
        <p><strong>Unit:</strong> {{ item.unit }}</p>
        <p><strong>Supplier:</strong> {{ item.supplier }}</p>
        <p><strong>Cost Per Unit:</strong> {{ item.costPerUnit }}</p>
        <p><strong>Expiration Date:</strong> {{ formatDate(item.expiration) }}</p>
        <p><strong>Last Updated:</strong> {{ formatDate(item.lastUpdated) }}</p>
        <p><strong>Type:</strong> {{ item.type }}</p>
      </div>
      <button @click="goBack" class="back-button">Back</button>
    </div>

    <div v-else>No item details available.</div>
  </div>
</template>

<style scoped>
h1{
padding-bottom: 20px;
}
p,h2{
  color: white;
}
.inventory-details {
  padding: 20px;
}

.card {
  background: #8B0000;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.card-content h2 {
  margin-top: 0;
}

.back-button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}

</style>