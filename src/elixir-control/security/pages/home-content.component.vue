<script>
export default {
  name: "home-content",


  data() {
    return {
      items: [
        {label: 'Sing in', to: '/home/sign-in', icon: 'mdi-account'},
        {label: 'Sign up', to: '/home/sign-up', icon: 'mdi-account-plus'},
      ],
    };
  },

  created() {
    console.log('Home content created');
  }

}
</script>


<template>

  <div>
    <pv-toolbar class="w-full fixed top-0 left-0 pr-6 pl-6" style="background-color:#8B0000;">
      <template #center>
        <img src="../../../assets/img/logo-elixir-control.png" height="60"  alt="Logo Elixir Control"/>
      </template>

      <template #end>
        <language-switcher></language-switcher>
      </template>
    </pv-toolbar>
  </div>

  <div class="flex flex-row align-items-center" style="width: 100%; ">

    <div class="p-col-6" left-0>
      <h1>Desde la uva hasta la <br> botella, todo bajo control.</h1>
      <p>ElixirControl: Tú mejor aliado en el proceso productivo de vinos</p>


      <div class="mt-6">
        <router-link to="/productor/login" class="btn btn-primary">
          <pv-button class="mr-2" style="background-color: #CFAE75; color: #5D4037; border: solid #8B0000;">Sign
            in</pv-button>
        </router-link>
        <router-link to="/productor/login" class="btn btn-secondary">
          <pv-button class="ml-2" style="background-color: #F5F5DC; color: #5D4037; border: solid #8B0000; ">Sign up</pv-button>
        </router-link>
      </div>

    </div>

    <div class="p-col-6" right-0>
      <img src="../../../assets/img/fondo-home.png" width="460" max-widht="100%"/>
    </div>
  </div>

</template>



<style scoped>

</style>