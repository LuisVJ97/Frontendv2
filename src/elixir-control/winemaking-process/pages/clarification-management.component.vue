<script>
import {Clarification} from "../model/clarification.entity.js";
import {winemakingProcessApiService} from "../services/winemaking-process-api.service.js";
import DataManager from "../../../shared/components/data-manager.component.vue";
import ClarificationCreateAndEdit from "../components/clarification-create-and-edit.component.vue";
import WinemakingProcessManagement from "./winemaking-process-management.component.vue";


export default {
  name: "clarification-management",
  components: {WinemakingProcessManagement, ClarificationCreateAndEdit, DataManager},

  data() {
    return {
      title: {singular: 'Clarification', plural: 'Clarifications'},
      clarificationArray: [],
      clarification: new Clarification({}),
      selectedClarification: [],
      clarificationApiService: null,
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
      return this.clarificationArray.findIndex(clarification => clarification.id === id);
    },
    //#endregion


    //#region Event Handlers
    onNewItem() {
      this.clarification = new Clarification({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      console.log("Item: ", item);
      this.clarification = new Clarification(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.clarification = new Clarification(item);
      this.deleteClarification();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedClarification = selectedItems;
      this.deleteSelectedClarification();
    },

    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested(item) {
      console.log('onSaveRequestedManagement', item);
      this.submitted = true

      if (item.id) {
        this.updateClarification();
      } else {
        this.createClarification();
      }

      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },
    //#endregion


    //#region Actions Methods
    createClarification() {
      this.clarificationApiService.create(this.clarification).then(response => {
          let newClarification = new Clarification(response.data);
          this.clarificationArray.push(newClarification);
          this.notifySuccessfulAction('Clarification created successfully');
        }).catch(error => {
          console.error("Error creating a Clarification",error);
        });
    },

    updateClarification() {
      this.clarificationApiService.update(this.clarification.id, this.clarification).then(response => {
          let index = this.findIndexById(this.clarification.id);
          this.clarificationArray[index] = new Clarification(response.data);
          this.notifySuccessfulAction('Clarification updated successfully');
        }).catch(error => {
          console.error("Error updating a Clarification",error);
        });
    },

    deleteClarification() {
      this.clarificationApiService.delete(this.clarification.id).then(() => {
          let index = this.findIndexById(this.clarification.id);
          this.clarificationArray.splice(index, 1);
          this.notifySuccessfulAction('Clarification deleted successfully');
        }).catch(error => {
          console.error("Error deleting a Clarification",error);
        });
    },

    deleteSelectedClarification() {
      this.selectedClarification.forEach((variable) => {
        this.clarificationApiService.delete(variable.id).then(() => {
          let index = this.findIndexById(variable.id);
          this.clarificationArray.splice(index, 1);
        }).catch(error => {
          console.error("Error deleting a Clarification",error);
        });
      });

      this.notifySuccessfulAction('Clarifications deleted successfully');
    },
    //#endregion

    getAllClarifications() {

      this.clarificationApiService.getAllResources().then(response => {
        this.clarificationArray = response.data.map(newClarification => new Clarification(newClarification));

        console.log("Clarifications resources", this.batches);
      }).catch(error => {
        console.error("Error getting Clarifications",error);
      });
    }


  },

  created() {
    this.clarificationApiService = new winemakingProcessApiService('/clarification');

    this.getAllClarifications();

    console.log('Clarification Management component created');
  }



}
</script>

<template>

  <winemaking-process-management></winemaking-process-management>

  <div>

    <data-manager :title="title"
                  v-bind:items="clarificationArray"
                  v-on:new-item-requested-manager="onNewItem"
                  v-on:edit-item-requested-manager="onEditItem($event)"
                  v-on:delete-item-requested-manager="onDeleteItem($event)"
                  v-on:delete-selected-items-requested-manager="onDeleteSelectedItems($event)">


      <template #custom-columns-manager>
        <pv-column :sortable="true" field="id"                   header="Id" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="batch_id"             header="Batch Id" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="clarification_date"   header="Clarification Date" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="products_used"        header="Products Used" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="clarification_method" header="Clarification Method" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="filtration_date"      header="Filtration Date" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="clarity_level"        header="Clarity Level" style="min-width: 6rem"/>
      </template>

    </data-manager>

    <clarification-create-and-edit
        :edit = "isEdit"
        :item="clarification"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested-clarification="onCancelRequested"
        v-on:save-requested-clarification="onSaveRequested($event)">
    </clarification-create-and-edit>

  </div>
  
</template>

<style scoped>

</style>