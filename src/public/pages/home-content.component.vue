<script>
import ToolbarHome from "../component/toolbar-home.component.vue";

export default {
  name: "home-content",
  components: {ToolbarHome},



  created() {
    console.log('HomeContent created');
  }
}
</script>

<template>

  <toolbar-home></toolbar-home>

  <div class="home-content" >

    <div class="information-content">
      <div style="width: 80%">
        <h1>{{ $t('title-home') }}</h1>
        <p>{{ $t('sub-title-home') }}</p>
      </div>
    </div>


    <div class="image-home">
      <img src="../../assets/img/home-image.png" height="677" width="405"/>
    </div>

  </div>

</template>

<style scoped>

.home-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;

}


.home-content .information-content {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  padding: 20px;

}

.home-content .image-home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  max-width: 100%;
  max-height: 100%;
}


</style>