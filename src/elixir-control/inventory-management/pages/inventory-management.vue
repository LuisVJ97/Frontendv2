<script>

import InventoryCreateAndEdit from '../components/inventory-create-and-edit.vue';
import InventoryProcessApiService from "../services/inventory-process-api.service.js";
import HeaderContent from "../../../public/component/header-content.component.vue";
export default {
  components: {
    HeaderContent,
    InventoryCreateAndEdit,
  },
  data() {
    return {
      inventoryList: [],
      filteredInventoryList: [],
      selectedType: '',
      selectedUnit: '',
      selectedItems: [],
      dialogVisible: false,
      currentItem: null,
      isEditMode: false,
    };
  },
  created() {
    this.fetchInventory();
  },
  methods: {
    async fetchInventory() {
      try {
        const items = await InventoryProcessApiService.getAllResources();
        this.inventoryList = items;
        this.filteredInventoryList = items;
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    },

    viewDetails(id) {
      this.$router.push({ name: 'InventoryDetail', params: { id } });
    },

    applyFilter() {
      this.filteredInventoryList = this.inventoryList.filter(item => {
        const matchesType = this.selectedType ? item.type === this.selectedType : true;
        const matchesUnit = this.selectedUnit ? item.unit === this.selectedUnit : true;

        const matchesName = this.searchName.length >= 3
            ? item.name.toLowerCase().includes(this.searchName.toLowerCase())
            : true;

        return matchesType && matchesUnit && matchesName;
      });
    },

    openCreateDialog() {
      this.currentItem = {};
      this.isEditMode = false;
      this.dialogVisible = true;
    },

    editItem(item) {
      this.currentItem = { ...item };
      this.isEditMode = true;
      this.dialogVisible = true;
    },

    confirmDeleteItem(item) {
      if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        console.log("Deleting item with ID:", item.id);
        this.deleteItem(item.id)
      }
    },

    async deleteItem(id) {
      try {
        await InventoryProcessApiService.delete(id);
        await this.fetchInventory();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },

    closeDialog() {
      this.dialogVisible = false;
    }
  }
}
</script>

<template>

  <header-content></header-content>


  <div class="inventory-management">
    <h1>Inventory Management</h1>

    <div class="filter-container">

      <div class="filter-item">
        <label for="nameFilter">Search by Name:</label>
        <input type="text" id="nameFilter" v-model="searchName" @input="applyFilter" placeholder="Enter item name (min 3 characters)" />
      </div>
      <div class="filter-item">
        <label for="typeFilter">Filter by Type:</label>
        <select v-model="selectedType" @change="applyFilter" id="typeFilter">
          <option value="">All</option>
          <option value="Raw Material">Raw Material</option>
          <option value="Equipment">Equipment</option>
          <option value="Consumable">Consumable</option>
        </select>
      </div>

      <div class="filter-item">
        <label for="unitFilter">Filter by Unit:</label>
        <select v-model="selectedUnit" @change="applyFilter" id="unitFilter">
          <option value="">All</option>
          <option value="kg">kg</option>
          <option value="units">units</option>
        </select>
      </div>
    </div>

    <div class="table-container">
      <pv-data-table
          v-model:selection="selectedItems"
          :value="filteredInventoryList"
          :paginator="true"
          :rows="10"
          :rows-per-page-options="[5, 10, 15]"
          current-page-report-template="Showing {first} to {last} of {totalRecords} items">

        <pv-column field="name" header="Name" />
        <pv-column field="quantity" header="Quantity" />
        <pv-column field="unit" header="Unit" />
        <pv-column field="supplier" header="Supplier" />
        <pv-column field="costPerUnit" header="Cost Per Unit" />
        <pv-column field="expiration" header="Expiration Date" />
        <pv-column field="lastUpdated" header="Last Updated" />
        <pv-column field="type" header="Type" />

        <pv-column headerStyle="width: 8rem">
          <template #body="{data}">
            <pv-button icon="pi pi-pencil" @click="editItem(data)" />
            <pv-button icon="pi pi-trash" @click="confirmDeleteItem(data)" severity="danger" />
            <pv-button
                icon="pi pi-info-circle"
                label="View Details"
                @click="viewDetails(data.id)"
                class="view-details-button" />
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <!-- Centered Add New Button -->
    <div class="add-new-button-container">
      <pv-button icon="pi pi-plus" label="Add New" severity="success" @click="openCreateDialog" />
    </div>

    <!-- Dialog for create and edit -->
    <inventory-create-and-edit
        v-model:visible="dialogVisible"
        :entity="currentItem"
        :edit="isEditMode"
        @saved="fetchInventory"
        @canceled="closeDialog"
    />
  </div>
</template>

<style scoped>
.inventory-management {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.filter-item label {
  margin-bottom: 5px;
  font-weight: bold;
}

.filter-item input,
.filter-item select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.filter-item input:focus,
.filter-item select:focus {
  border-color: #007bff;
}

.table-container {
  max-width: 100%;
  overflow-x: auto;
}

.add-new-button-container {
  text-align: center;
  margin: 20px 0;
}

.pv-button {
  margin-right: 10px;
}
.view-details-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.3em 0.8em;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  margin-top: 10px;
}

.view-details-button:hover {
  background-color: #0056b3;
}
</style>