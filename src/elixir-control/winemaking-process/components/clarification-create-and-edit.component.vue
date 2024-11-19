<script>
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "clarification-create-and-edit",
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
      this.$emit('cancel-requested-clarification');
    },

    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested-clarification', this.item);
    }
  },

  created() {
    console.log('Clarification Create and Edit Dialog component created');
  }


}
</script>

<template>

  <div class="p-fluid">
    <create-and-edit :entity="item" :visible="visible" entity-name="Clarification"
                     @canceled-shared="onCancelRequested" @saved-shared="onSaveRequested">

      <template #content>

        <pv-float-label class="mt-5">
          <label for="clarification_date">Clarification date </label>
          <pv-input-text id="clarification_date" v-model="item.clarification_date" :class="{ 'p-invalid': submitted && !item.clarification_date}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="products_used">Products used</label>
          <pv-input-text id="products_used" v-model="item.products_used" :class="{ 'p-invalid': submitted && !item.products_used}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="clarification_method">Clarification method</label>
          <pv-input-text id="clarification_method" v-model="item.clarification_method" :class="{ 'p-invalid': submitted && !item.clarification_method}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="filtration_date">Filtration date</label>
          <pv-input-text id="filtration_date" v-model="item.filtration_date" :class="{ 'p-invalid': submitted && !item.filtration_date}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="clarity_level">Clarity level</label>
          <pv-input-text id="clarity_level" v-model="item.clarity_level" :class="{ 'p-invalid': submitted && !item.clarity_level}"/>
        </pv-float-label>
      </template>

    </create-and-edit>
  </div>


</template>

<style scoped>

</style>