<script>
import { ClientsService } from '../services/clients.service.js';
import { Clients } from '../model/clients.entity.js';
import ClientCreateAndEditComponent from "../components/client-create-and-edit.component.vue";
import { FilterMatchMode} from "@primevue/core";
import HeaderContent from "../../../public/component/header-content.component.vue";

export default {
  name: "client-management",

  components: {
    HeaderContent,
    ClientCreateAndEditComponent,
  },

  data() {
    return {
      clients: [],
      editDialogVisible: false,
      selectedClient: null,
      clientsService: null,
      globalFilterValue: '',
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        person_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        business_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      loading: false,
    };
  },
  methods: {
    //#region Methods
    async fetchClients() {
      this.loading = true;
      try {
        const response = await this.clientsService.getAll();
        this.clients = response.data.map(client => new Clients(client));
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        this.loading = false;
      }
    },

    showDetails(client) {
      this.selectedClient = new Clients(client);
      this.editDialogVisible = true;
    },

    closeEditDialog() {
      this.editDialogVisible = false;
      this.selectedClient = null;
    },

    openNewClientDialog() {
      this.selectedClient = new Clients({});
      this.editDialogVisible = true;
    },

    async onClientSaved() {
      await this.fetchClients();
      this.closeEditDialog();
    },

    async onClientCreated(newClient) {
      await this.fetchClients();
      this.closeEditDialog();
    },

    async deleteClient(client) {
      if (confirm(`Are you sure you want to delete ${client.person_name}?`)) {
        try {
          await this.clientsService.delete(client.id);
          await this.fetchClients();
        } catch (error) {
          console.error("Error deleting client:", error);
        }
      }
    },

    viewClientDetails(client) {
      this.$router.push({ name: 'ClientDetails', params: { id: client.id } });
    },

    onGlobalFilterChange(e) {
      this.filters['global'].value = e.target.value;
    },

    clearFilter() {
      this.initFilters();
    },

    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        person_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        business_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      };
      this.globalFilterValue = '';
    },
    //#endregion
  },
  //#region Lifecycle Hooks
  created() {
    this.clientsService = new ClientsService();
    this.fetchClients();
  }
  //#endregion
};
</script>

<template>
  <header-content/>


  <div class="client-management">
    <pv-card class="mb-4">
      <template #title>
        <h1 class="text-3xl font-bold">Client Management</h1>
      </template>
      <template #content>
        <div class="card">
          <pv-toolbar class="mb-4">
            <template #start>
              <div class="p-input-icon-left">
                <i class="pi pi-search" />
                <pv-input-text v-model="globalFilterValue" placeholder="Search clients" @input="onGlobalFilterChange" />
              </div>
            </template>
            <template #end>
              <pv-button label="Add New Client" icon="pi pi-plus" @click="openNewClientDialog" class="p-button-success" />
            </template>
          </pv-toolbar>

          <pv-data-table
              :value="clients"
              :paginator="true"
              :rows="10"
              :rows-per-page-options="[5, 10, 15]"
              current-page-report-template="Showing {first} to {last} of {totalRecords} clients"
              :filters="filters"
              :global-filter-fields="['person_name', 'business_name', 'phone', 'email']"
              :loading="loading"
          >
            <pv-column field="person_name" header="Name" :sortable="true" :filter-field="'person_name'">
              <template #filter="{ filterModel }">
                <pv-input-text v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
              </template>
            </pv-column>
            <pv-column field="business_name" header="Business" :sortable="true" :filter-field="'business_name'">
              <template #filter="{ filterModel }">
                <pv-input-text v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by business" />
              </template>
            </pv-column>
            <pv-column field="phone" header="Phone" :sortable="true" :filter-field="'phone'">
              <template #filter="{ filterModel }">
                <pv-input-text v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by phone" />
              </template>
            </pv-column>
            <pv-column field="email" header="Email" :sortable="true" :filter-field="'email'">
              <template #filter="{ filterModel }">
                <pv-input-text v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by email" />
              </template>
            </pv-column>

            <pv-column headerStyle="width: 12rem">
              <template #body="{ data }">
                <pv-button icon="pi pi-eye" class="p-button-rounded p-button-info mr-2" @click="viewClientDetails(data)" />
                <pv-button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="showDetails(data)" />
                <pv-button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteClient(data)" />
              </template>
            </pv-column>
          </pv-data-table>
        </div>

        <ClientCreateAndEditComponent
            v-model:visible="editDialogVisible"
            :client="selectedClient"
            :edit="selectedClient && selectedClient.id"
            @canceled="closeEditDialog"
            @saved="onClientSaved"
            @client-created="onClientCreated"
        />
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.client-management {
  padding: 20px;
}

.card {
  background: var(--surface-card);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

:deep(.p-column-filter) {
  width: 100%;
}
</style>