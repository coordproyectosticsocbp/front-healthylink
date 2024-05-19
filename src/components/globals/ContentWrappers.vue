<script setup>
import Navbar from '@/components/globals/Navbar.vue'
import Footer from '@/components/globals/Footer.vue'
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import DashboardGraphicsAdmin from '@/components/Dashboard/DashboardGraphicsAdmin.vue'
import ReportsDashboard from "@/services/Reports/Reports.services.js";
import { getError } from "@/utils/helpers/getError.js";
import { useLoading } from "vue-loading-overlay";

const store = useStore();
const collapsedStatus = computed(() => store.getters["sidebar/collapsed"]);
const dataDash = ref([]);
const fullPage = ref(true);
const errors = ref(null);
//
const $loading = useLoading({
  loader: 'dots',
  isFullPage: fullPage,
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
});

const dataDashboard = async () => {
  const loader = $loading.show();
  try {
    const response = await ReportsDashboard.getDataDashboard();
    dataDash.value = response.data.data;
    loader.hide();
  } catch (error) {
    loader.hide();
    errors.value = getError(error);
  }
};

onMounted(dataDashboard);

const fetchData = dataDashboard;

</script>

<template>

  <div id="content-wrapper" :class="`d-flex flex-column ${collapsedStatus ? 'content-collapsed' : 'content'} vh-100`">

    <div id="content">

      <Navbar />



      <div class="container-fluid">

        <router-view />

        <!--<DashboardGraphicsAdmin :dataDashboard="dataDash" :fetchData="fetchData"/>-->
      </div>

    </div>

    <Footer />

  </div>

</template>

<style>

</style>
