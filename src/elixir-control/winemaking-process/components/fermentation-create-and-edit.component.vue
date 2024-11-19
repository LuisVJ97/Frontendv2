<script>
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "fermentation-create-and-edit",

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
      this.$emit('cancel-requested-fermentation');
    },

    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested-fermentation', this.item);
    }
  },

  created() {
    console.log('Fermentation Create and Edit Dialog component created');
  }

}
</script>

<template>

  <div>
    <create-and-edit :entity="item" :visible="visible" entity-name="Fermentation"
    @canceled-shared="onCancelRequested" @saved-shared="onSaveRequested">

      <template #content>

        <pv-float-label class="mt-5">
          <label for="start_date">Start date</label>
          <pv-input-text id="start_date" v-model="item.start_date" :class="{ 'p-invalid': submitted && !item.start_date}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="end_date">End date</label>
          <pv-input-text id="end_date" v-model="item.end_date" :class="{ 'p-invalid': submitted && !item.end_date}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="average_temperature">Average temperature</label>
          <pv-input-text id="average_temperature" v-model="item.average_temperature" :class="{ 'p-invalid': submitted && !item.average_temperature}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="initial_density">Initial density</label>
          <pv-input-text id="initial_density" v-model="item.initial_density" :class="{ 'p-invalid': submitted && !item.initial_density}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="final_density">Final density</label>
          <pv-input-text id="final_density" v-model="item.final_density" :class="{ 'p-invalid': submitted && !item.final_density}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="initial_ph">Initial ph</label>
          <pv-input-text id="initial_ph" v-model="item.initial_ph" :class="{ 'p-invalid': submitted && !item.initial_ph}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="final_ph">Final ph</label>
          <pv-input-text id="final_ph" v-model="item.final_ph" :class="{ 'p-invalid': submitted && !item.final_ph}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="residual_sugar"> Residual sugar</label>
          <pv-input-text id="residual_sugar" v-model="item.residual_sugar" :class="{ 'p-invalid': submitted && !item.residual_sugar}"/>
        </pv-float-label>
      </template>

    </create-and-edit>
  </div>


</template>

<style scoped>

</style>