<script>


import HeaderContent from "../../../public/component/header-content.component.vue";

export default {
  name: "winemaking-process-management",
  components: {HeaderContent},

  data() {
    return {
      activeTab: '/winemaking-process/batches', // Tab activo por defecto
      items: [
        { label: 'Batches',       route: '/vinicultor/winemaking-process/batches',       icon: 'pi-chevron-right'  },
        { label: 'Fermentation',  route: '/vinicultor/winemaking-process/fermentation',  icon: 'pi-chevron-right'  },
        { label: 'Clarification', route: '/vinicultor/winemaking-process/clarification', icon: 'pi-chevron-right'  },
        { label: 'Pressing',      route: '/vinicultor/winemaking-process/pressing',      icon: 'pi-chevron-right'  },
        { label: 'Aging',         route: '/vinicultor/winemaking-process/aging',         icon: 'pi-chevron-right'  },
        { label: 'Bottling',      route: '/vinicultor/winemaking-process/bottling',      icon: 'pi-chevron-right'  }
      ]
    }
  }

}
</script>

<template>

  <header-content></header-content>

  <div class="w-full">
    <header class="fixed top-0 left-0 z-1" style="margin-top:80px; ">
      <pv-tabs class="flex flex-row justify-content-center flex-nowrap">
        <pv-tab-list>
          <pv-tab v-for="tab in items" :key="tab.label" :value="tab.route">
            <router-link v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
              <a v-ripple :href="href" @click="navigate" class="flex font-medium items-center gap-2 text-inherit"
                 style="color:
              #708090">
                <i class="pi pi-expand " />
                <span>{{ tab.label }}</span>
              </a>
            </router-link>
          </pv-tab>
        </pv-tab-list>
      </pv-tabs>
    </header>

    <main style="margin-top: 14%; margin-left: 400px;">
      <router-view/>
    </main>
  </div>

</template>

<style scoped>

</style>