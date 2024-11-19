<script>
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "product-create-and-edit",
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
      this.$emit('cancel-requested-product');
    },

    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested-product', this.item);
    }
  },

  created() {
    console.log('Product Create and Edit Dialog component created');
  }

}
</script>

<template>

  <create-and-edit :entity="item" :visible="visible" entity-name="Product" @canceled-shared="onCancelRequested"
                   @saved-shared="onSaveRequested">

    <template #content>

      <pv-float-label class="mt-5">
        <label for="photo">URL image</label>
        <pv-input-text id="photo" v-model="item.image" :class="{ 'p-invalid': submitted && !item.image}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="name">Name Product</label>
        <pv-input-text id="name" v-model="item.name" :class="{ 'p-invalid': submitted && !item.name}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="grape_variety">Grape Variety</label>
        <pv-input-text id="grape_variety" v-model="item.grape_variety" :class="{ 'p-invalid': submitted && !item.grape_variety}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="wine_type">Wine Type</label>
        <pv-input-text id="wine_type" v-model="item.wine_type" :class="{ 'p-invalid': submitted && !item.wine_type}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="origin">Origin</label>
        <pv-input-text id="origin" v-model="item.origin" :class="{ 'p-invalid': submitted && !item.origin}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="alcohol_content">Alcohol Content</label>
        <pv-input-text id="alcohol_content" v-model="item.alcohol_content" :class="{ 'p-invalid': submitted && !item.alcohol_content}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="price">Price</label>
        <pv-input-text id="price" v-model="item.price" :class="{ 'p-invalid': submitted && !item.price}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="food_pairing">Food Pairing</label>
        <pv-input-text id="food_pairing" v-model="item.food_pairing" :class="{ 'p-invalid': submitted && !item.food_pairing}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="quantity">Quantity</label>
        <pv-input-text id="quantity" v-model="item.quantity" :class="{ 'p-invalid': submitted && !item.quantity}"/>
      </pv-float-label>

    </template>
  </create-and-edit>

</template>

<style scoped>

</style>