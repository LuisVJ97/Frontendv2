<script>
import {Fermentation} from "../model/fermentation.entity.js";
import {winemakingProcessApiService} from "../services/winemaking-process-api.service.js";
import DataManager from "../../../shared/components/data-manager.component.vue";
import FermentationCreateAndEdit from "../components/fermentation-create-and-edit.component.vue";
import WinemakingProcessManagement from "./winemaking-process-management.component.vue";

export default {
  name: "fermentation-management",
  components: {WinemakingProcessManagement, FermentationCreateAndEdit, DataManager},

  data() {
    return {
      title: { singular: 'Fermentation', plural: 'Fermentation' + 's'},
      fermentationArray: [],
      fermentation: new Fermentation({}),
      selectedFermentation: [],
      fermentationApiService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    }
  },

  methods:{
    //#region Utility Methods
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.fermentationArray.findIndex(fermentation => fermentation.id === id);
    },
    //#endregion

    //#region Event Handlers
    onNewItem() {
      this.fermentation = new Fermentation({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      this.fermentation = new Fermentation(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.fermentation = new Fermentation(item);
      this.deleteFermentation();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedFermentation = selectedItems;
      this.deleteSelectedFermentation();
    },

    onCancelRequestedManagement() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequestedManagement(item) {
      console.log('onSaveRequestedManagement: ', item);
     this.submitted = true;

      if (item.id) {
        this.updateFermentation();
      } else {
        this.createFermentation();
      }
      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },
    //#endregion

    //#region Actions Methods
    createFermentation() {
      this.fermentationApiService.create(this.fermentation).then(response => {
          let fermentationVariable = new Fermentation(response.data);
          this.fermentationArray.push(fermentationVariable);
          this.notifySuccessfulAction('Fermentation created successfully');
        })
        .catch(error => {
          console.error(" Error creating fermentation data  ", error);
        });
    },

    updateFermentation() {
      this.fermentationApiService.update(this.fermentation.id, this.fermentation).then(response => {
          let index = this.findIndexById(this.fermentation.id);
          this.fermentationArray[index] = new Fermentation(response.data);
          this.notifySuccessfulAction('Fermentation updated successfully');
        })
        .catch(error => {
          console.error("Error updating fermentation data", error);
        });
    },

    deleteFermentation() {
      this.fermentationApiService.delete(this.fermentation.id).then(() => {
          let index = this.findIndexById(this.fermentation.id);
          this.fermentationArray.splice(index, 1);
          this.notifySuccessfulAction('Fermentation deleted successfully');
        })
        .catch(error => {
          console.error("Error deleting fermentation data", error);
        });
    },

    deleteSelectedFermentation() {
      this.selectedFermentation.forEach((fermentation) => {
        this.fermentationApiService.delete(fermentation.id).then(() => {
            this.fermentationArray= this.fermentationArray.filter((t) => t.id !== fermentation.id);
          })
          .catch(error => {
            console.error("Error deleting fermentation data", error);
          });
      });
      this.notifySuccessfulAction('Fermentation deleted successfully');
    },
    //#endregion

    getAllFermentation() {
      this.fermentationApiService = new winemakingProcessApiService('/fermentation');
      this.fermentationApiService.getAllResources().then(response => {
          this.fermentationArray = response.data.map(newFermentation => new Fermentation(newFermentation));
        })
        .catch(error => {
          console.error("Error fetching fermentation data", error);
        });
    }
  },

  //#region Lifecycle Hooks
  created() {
    this.getAllFermentation();
    console.log('Fermentation Management component created');
  }


}
</script>

<template>

  <winemaking-process-management></winemaking-process-management>

  <div class="w-full">
    <data-manager :title="title"
                  v-bind:items="fermentationArray"
                  v-on:new-item-requested-manager="onNewItem"
                  v-on:edit-item-requested-manager="onEditItem($event)"
                  v-on:delete-item-requested-manager="onDeleteItem($event)"
                  v-on:delete-selected-items-requested-manager="onDeleteSelectedItems($event)">

      <template #custom-columns-manager>
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="batch_id" header="Batch Id" style="min-width: 8rem"/>
        <pv-column :sortable="true" field="start_date" header="Start date" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="end_date" header="End date" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="average_temperature" header="Average temperature" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="initial_density" header="Initial_density" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="final_density" header="Final density" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="initial_ph" header="Initial ph" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="final_ph" header="Final ph" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="residual_sugar" header="Residual sugar" style="min-width: 12rem"/>
      </template>
    </data-manager>

    <fermentation-create-and-edit
        :edit="isEdit"
        :item="fermentation"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested-fermentation="onCancelRequestedManagement"
        v-on:save-requested-fermentation="onSaveRequestedManagement($event)">
    </fermentation-create-and-edit>
  </div>

</template>

<style scoped>

</style>