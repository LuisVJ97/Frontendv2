<script>
import {Pressing} from "../model/pressing.entity.js";
import {winemakingProcessApiService} from "../services/winemaking-process-api.service.js";
import DataManager from "../../../shared/components/data-manager.component.vue";
import PressingCreateAndEdit from "../components/pressing-create-and-edit.component.vue";
import WinemakingProcessManagement from "./winemaking-process-management.component.vue";


export default {
  name: "pressing-management",

  components: {WinemakingProcessManagement, PressingCreateAndEdit, DataManager},

  data() {
    return {
      title: { singular: 'Pressing', plural: 'Pressings' },
      pressingArray: [],
      pressing: new Pressing({}),
      selectedPressings: [],
      pressingApiService: null,
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
      return this.pressingArray.findIndex(pressing => pressing.id === id);
    },
    //#endregion

    //#region Event Handlers
    onNewItem() {
      this.pressing = new Pressing({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      this.pressing = new Pressing(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.pressing = new Pressing(item);
      this.deletePressing();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedPressings = selectedItems;
      this.deleteSelectedPressings();
    },

    onCanceledRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested(item) {
      console.log('onSaveRequestedManagement', item);
      this.submitted = true;

      if (item.id) {
        this.updatePressing();
      } else {
        this.createPressing();
      }

      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },
    //#endregion


    //#region CRUD Operations

    createPressing() {
      this.pressingApiService.create(this.pressing).then(response => {
          let newPressing = new Pressing(response.data);
          this.pressingArray.push(newPressing);
          this.notifySuccessfulAction('Pressing created successfully');
        }).catch(error => {
          console.error('Error creating pressing', error);
        });
    },


    updatePressing() {
      this.pressingApiService.update(this.pressing.id, this.pressing).then(response => {
          let index = this.findIndexById(this.pressing.id);
          this.pressingArray[index] = new Pressing(response.data);
          this.notifySuccessfulAction('Pressing updated successfully');
        }).catch(error => {
          console.error('Error updating pressing', error);
        });
    },

    deletePressing() {
      this.pressingApiService.delete(this.pressing.id).then(() => {
          let index = this.findIndexById(this.pressing.id);
          this.pressingArray.splice(index, 1);
          this.notifySuccessfulAction('Pressing deleted successfully');
        }).catch(error => {
          console.error('Error deleting pressing', error);
        });
    },

    deleteSelectedPressings() {
      this.selectedPressings.forEach(variable => {
        this.pressingApiService.delete(variable.id).then(() => {
          this.pressingArray = this.pressingArray.filter(p => p.id !== variable.id);
        }).catch(error => {
          console.error('Error deleting pressing', error);
        });
      });
      this.notifySuccessfulAction('Pressings deleted successfully');
    },
    //#endregion

    getAllPressings() {
      this.pressingApiService.getAllResources().then(response => {
        this.pressingArray = response.data.map(p => new Pressing(p));

        console.log("Pressing resources", this.pressingArray);
      }).catch(error => {
        console.error('Error getting pressings', error);
      });
    }

  },

  created() {
    this.pressingApiService = new winemakingProcessApiService('/pressing');
    this.getAllPressings();
    console.log('Pressing Management component created');
  }

}
</script>

<template>

  <winemaking-process-management></winemaking-process-management>

  <div class="w-full">
    <data-manager :title="title"
                  :items="pressingArray"
                  v-on:new-item-requested-manager="onNewItem"
                  v-on:edit-item-requested-manager="onEditItem($event)"
                  v-on:delete-item-requested-manager="onDeleteItem($event)"
                  v-on:delete-selected-items-requested-manager="onDeleteSelectedItems($event)">


      <template #custom-columns-manager>
        <pv-column :sortable="true" field="id"           header="Id" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="batch_id"     header="Batch Id" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="pressing_date" header="Pressing Date" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="must_volume"  header="Must Volume" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="press_type"   header="Press Type" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="applied_pressure" header="Applied Pressure" style="min-width: 6rem"/>
      </template>

    </data-manager>

    <pressing-create-and-edit
        :edit="isEdit"
        :item="pressing"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested-pressing="onCanceledRequested"
        @save-requested-pressing="onSaveRequested($event)">
    </pressing-create-and-edit>
  </div>



</template>

<style scoped>

</style>