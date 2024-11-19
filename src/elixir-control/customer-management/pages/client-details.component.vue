<script>
import { ClientsService } from '../services/clients.service.js';
import { useRouter } from 'vue-router';
import HeaderContent from "../../../public/component/header-content.component.vue";

export default {
  name: 'ClientDetails',
  components: {HeaderContent},

  data() {
    return {
      client: null,
      loading: true,
      error: false,
      clientsService: new ClientsService(),
      router: useRouter()
    };
  },

  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },

  methods: {
    async fetchClientDetails() {
      this.loading = true;
      this.error = false;
      try {
        const response = await this.clientsService.getById(this.id);
        this.client = response.data;
      } catch (error) {
        console.error("Error fetching client details:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      this.router.push({ name: 'Clients' });
    }
  },

  created() {
    this.fetchClientDetails();
  },

};
</script>

<template>
  <header-content>

  </header-content>
  <div class="p-4">
    <pv-card>
      <template #title>
        <h2 class="text-2xl font-bold mb-4">Customer details</h2>
      </template>
      <template #content>
        <pv-skeleton v-if="loading" width="100%" height="150px"></pv-skeleton>
        <div v-else-if="error" class="p-4">
          <pv-message severity="error" :closable="false">Error loading customer details. Please try again.</pv-message>
        </div>
        <div v-else-if="client">
          <pv-panel header="Data of the person responsible" :toggleable="true">
            <pv-divider />
            <div class="p-grid">
              <div class="p-col-12 p-md-4">
                <strong>Name and Surname:</strong>
                <p>{{ client.person_name }}</p>
              </div>
              <div class="p-col-12 p-md-4">
                <strong>DNI Number:</strong>
                <p>{{ client.dni }}</p>
              </div>
              <div class="p-col-12 p-md-4">
                <strong>E-mail:</strong>
                <p>{{ client.email }}</p>
              </div>
            </div>
          </pv-panel>

          <pv-panel header="Business data" :toggleable="true" class="mt-3">
            <pv-divider />
            <div class="p-grid">
              <div class="p-col-12 p-md-6">
                <strong>Business name:</strong>
                <p>{{ client.business_name }}</p>
              </div>
              <div class="p-col-12 p-md-6">
                <strong>Phone Number:</strong>
                <p>{{ client.phone }}</p>
              </div>
              <div class="p-col-12">
                <strong>Physical Address:</strong>
                <p>{{ client.address }}</p>
              </div>
              <div class="p-col-12 p-md-4">
                <strong>Country:</strong>
                <p>{{ client.country }}</p>
              </div>
              <div class="p-col-12 p-md-4">
                <strong>City:</strong>
                <p>{{ client.city }}</p>
              </div>
              <div class="p-col-12 p-md-4">
                <strong>RUC:</strong>
                <p>{{ client.ruc }}</p>
              </div>
            </div>
          </pv-panel>
        </div>
      </template>
      <template #footer>
        <pv-button label="Back" icon="pi pi-arrow-left" @click="goBack" class="p-button-secondary" />
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
:deep(.p-card) {
  background-color: var(--surface-card);
  color: var(--text-color);
}

:deep(.p-card-title) {
  color: var(--primary-color);
}

:deep(.p-panel-header) {
  background-color: var(--surface-section);
  color: var(--primary-color);
}

.p-grid {
  display: flex;
  flex-wrap: wrap;
}

.p-col-12 {
  width: 100%;
  padding: 0.5rem;
}

.p-md-4 {
  width: 33.3333%;
}

.p-md-6 {
  width: 50%;
}

@media screen and (max-width: 768px) {
  .p-md-4,
  .p-md-6 {
    width: 100%;
  }
}

strong {
  color: var(--text-color-secondary);
  font-weight: 600;
}

p {
  color: var(--text-color);
  margin-top: 0.25rem;
}
</style>