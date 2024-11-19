<script>
import { ClientsService } from "../services/clients.service.js";
import { Clients } from "../model/clients.entity.js";

export default {
  name: 'ClientCreateAndEdit',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    client: {
      type: Object,
      default: () => new Clients({}),
    },
    edit: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      clientItem: new Clients({}),
      clientsService: new ClientsService(),
    };
  },
  watch: {
    client: {
      immediate: true,
      handler(newVal) {
        this.clientItem = new Clients(newVal || {});
      }
    },
    visible: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.clientItem = new Clients(this.client || {});
        }
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false);
      this.$emit('canceled');
    },
    async saveClient() {
      try {
        if (this.edit && this.clientItem.id) {
          await this.clientsService.update(this.clientItem.id, this.clientItem);
        } else {
          const response = await this.clientsService.create(this.clientItem);
          this.$emit('client-created', response.data);
        }
        this.$emit('saved');
        this.closeDialog();
      } catch (error) {
        console.error("Error saving client:", error);
      }
    },
  },
};
</script>

<template>
  <pv-dialog :visible="visible" @update:visible="closeDialog" :header="edit ? 'Edit Client' : 'Create Client'">
    <div class="form-group">
      <label for="person_name">Name:</label>
      <pv-input-text id="person_name" v-model="clientItem.person_name" required />
    </div>

    <div class="form-group">
      <label for="dni">DNI:</label>
      <pv-input-text id="dni" v-model="clientItem.dni" required />
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <pv-input-text id="email" v-model="clientItem.email" required />
    </div>

    <div class="form-group">
      <label for="business_name">Business Name:</label>
      <pv-input-text id="business_name" v-model="clientItem.business_name" required />
    </div>

    <div class="form-group">
      <label for="phone">Phone:</label>
      <pv-input-text id="phone" v-model="clientItem.phone" required />
    </div>

    <div class="form-group">
      <label for="address">Address:</label>
      <pv-input-text id="address" v-model="clientItem.address" />
    </div>

    <div class="form-group">
      <label for="country">Country:</label>
      <pv-input-text id="country" v-model="clientItem.country" />
    </div>

    <div class="form-group">
      <label for="city">City:</label>
      <pv-input-text id="city" v-model="clientItem.city" />
    </div>

    <div class="form-group">
      <label for="ruc">RUC:</label>
      <pv-input-text id="ruc" v-model="clientItem.ruc" />
    </div>

    <template #footer>
      <pv-button label="Cancel" @click="closeDialog" />
      <pv-button label="Save" severity="success" @click="saveClient" />
    </template>
  </pv-dialog>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>