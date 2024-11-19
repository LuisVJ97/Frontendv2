<script>

import HeaderContent from "./public/component/header-content.component.vue";


export default {
  name: "app",
  components: {HeaderContent},


  title: 'Elixir Control',

  created() {
    console.log('App created');
  }
}

</script>

<template>


    <router-view></router-view>


</template>


<style scoped>

</style>
