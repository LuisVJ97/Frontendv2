<script>
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "pressing-create-and-edit",
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
      this.$emit('cancel-requested-pressing');
    },

    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested-pressing', this.item);
    }
  },

  created() {
    console.log('Pressing Create and Edit Dialog component created');
  }

}
</script>

<template>

  <div>
    <create-and-edit :entity="item" :visible="visible" entity-name="Pressing"
                     @canceled-shared="onCancelRequested" @saved-shared="onSaveRequested">

      <template #content>
        <pv-float-label class="mt-5">
          <label for="pressing_date">Pressing date</label>
          <pv-input-text id="pressing_date" v-model="item.pressing_date" :class="{ 'p-invalid': submitted && !item.pressing_date}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="must_volume">Must volume</label>
          <pv-input-text id="must_volume" v-model="item.must_volume" :class="{ 'p-invalid': submitted && !item.must_volume}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="press_type">Press type</label>
          <pv-input-text id="press_type" v-model="item.press_type" :class="{ 'p-invalid': submitted && !item.press_type}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="applied_pressure">Applied pressure</label>
          <pv-input-text id="applied_pressure" v-model="item.applied_pressure" :class="{ 'p-invalid': submitted && !item.applied_pressure}"/>
        </pv-float-label>

      </template>

    </create-and-edit>

  </div>



</template>

<style scoped>

</style>