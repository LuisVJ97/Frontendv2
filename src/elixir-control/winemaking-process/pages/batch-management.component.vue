<script>
import {Batch} from "../model/batch.entity.js";
import {winemakingProcessApiService} from "../services/winemaking-process-api.service.js";
import DataManager from "../../../shared/components/data-manager.component.vue";
import BatchesCreateAndEdit from "../components/batch-create-and-edit.component.vue";
import WinemakingProcessManagement from "./winemaking-process-management.component.vue";


export default {
  name: "batch-management",
  components: {WinemakingProcessManagement, BatchesCreateAndEdit, DataManager},

  data() {
    return {
      title: { singular: 'Batch', plural: 'Batches' },
      batches: [],
      batch: new Batch({}),
      selectedBatches: [],
      batchApiService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    }
  },

  methods: {

    //#region Utility Methods
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.batches.findIndex(batch => batch.id === id);
    },
    //#endregion

    //#region Event Handlers
    onNewItem() {
      this.batch = new Batch({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      this.batch = new Batch(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.batch = new Batch(item);
      this.deleteBatch();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedBatches = selectedItems;
      this.deleteSelectedBatches();
    },

    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested(item) {

      console.log('onSaveRequestedManagement', item);
      this.submitted = true;

      if (item.id) {
        this.updateBatch();
      } else {
        this.createBatch();
      }

      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },
    //#endregion

    //#region CRUD Operations
    createBatch() {
      this.batchApiService.create(this.batch).then(response => {
        let newBatch = new Batch(response.data);
        this.batches.push(newBatch);
        this.notifySuccessfulAction('Batch created successfully');
      }).catch(error => {
        console.error("Error creating a batch",error);
      });
    },

    updateBatch() {
      this.batchApiService.update(this.batch.id, this.batch).then(response => {
       let index = this.findIndexById(this.batch.id);
        this.batches[index] = new Batch(response.data);
        this.notifySuccessfulAction('Batch updated successfully');
      }).catch(error => {
        console.error("Error updating a batch",error);
      });
    },

    deleteBatch() {
      this.batchApiService.delete(this.batch.id).then(() => {
       let index = this.findIndexById(this.batch.id);
        this.batches.splice(index, 1);
        this.notifySuccessfulAction('Batch deleted successfully');
      }).catch(error => {
        console.error("Error deleting a batch",error);
      });
    },

    deleteSelectedBatches() {
      this.selectedBatches.forEach((variable) => {
        this.batchApiService.delete(variable.id).then(() => {
          this.batches = this.batches.filter((b) => b.id !== variable.id);
        }).catch(error => {
          console.error("Error deleting a batch", error);
        });
      });

      this.notifySuccessfulAction('Batches deleted successfully');
    },
    //#endregion

    getAllBatches() {

      this.batchApiService.getAllResources().then(response => {
        this.batches = response.data.map(batch => new Batch(batch));

        console.log("Batch resources", this.batches);
      }).catch(error => {
        console.error("Error getting batches",error);
      });
    }
  },



  //#region Lifecycle Hooks
  created() {
    this.batchApiService = new winemakingProcessApiService('/batches');

    this.getAllBatches();
    console.log('Batch Management component created');
  }
  //#endregion

}
</script>

<template>

  <winemaking-process-management></winemaking-process-management>

  <div>

    <data-manager :title="title"
                  v-bind:items="batches"
                  v-on:new-item-requested-manager="onNewItem"
                  v-on:edit-item-requested-manager="onEditItem($event)"
                  v-on:delete-item-requested-manager="onDeleteItem($event)"
                  v-on:delete-selected-items-requested-manager="onDeleteSelectedItems($event)">

      <template #custom-columns-manager >
        <pv-column :sortable="true" field="id"           header="Id" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="grape_variety"      header="Grape variety" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="harvest_date"       header="Harvest date" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="grape_quantity"     header="Grape quantity" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="vineyard_origin"    header="Vineyard origin" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="current_status"     header="Status" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="process_start_date" header="Process start date" style="min-width: 14rem"/>
        <pv-column :sortable="true" field="final_volume"       header="Final volume" style="min-width: 12rem"/>
      </template>
    </data-manager>

    <batches-create-and-edit
        :edit = "isEdit"
        :itemBatch="batch"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested-batches="onCancelRequested"
        v-on:save-requested-batches="onSaveRequested($event)">
    </batches-create-and-edit>

  </div>

</template>

<style scoped>

</style>