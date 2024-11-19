<script>
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "bottling-create-and-edit",
  components: {CreateAndEdit},

  props: {
    item: null,
  visible: Boolean
},

  data() {
    return {
      submitted: false
    }
  },

  methods: {

    onCancelRequested() {
      this.$emit('cancel-requested-bottling');
    },

    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested-bottling', this.item);
    }
  },

  created() {
    console.log('Bottling Create and Edit Dialog component created');
  }


}
</script>

<template>

  <div>
    <create-and-edit :entity="item" :visible="visible" entity-name="Bottling"
                     @canceled-shared="onCancelRequested" @saved-shared="onSaveRequested">

      <template #content>

        <pv-float-label class="mt-5">
          <label for="bottling_date">Bottling date </label>
          <pv-input-text id="bottling_date" v-model="item.bottling_date" :class="{ 'p-invalid': submitted && !item.bottling_date}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="bottle_size_ml">Bottle size (ml)</label>
          <pv-input-text id="bottle_size_ml" v-model="item.bottle_size_ml" :class="{ 'p-invalid': submitted && !item.bottle_size_ml}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="number_of_bottles">Number of bottles</label>
          <pv-input-text id="number_of_bottles" v-model="item.number_of_bottles" :class="{ 'p-invalid': submitted && !item.number_of_bottles}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="label_type">Label type</label>
          <pv-input-text id="label_type" v-model="item.label_type" :class="{ 'p-invalid': submitted && !item.label_type}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="cork_type">Cork type</label>
          <pv-input-text id="cork_type" v-model="item.cork_type" :class="{ 'p-invalid': submitted && !item.cork_type}"/>
        </pv-float-label>

      </template>

    </create-and-edit>
  </div>

</template>

<style scoped>

</style>