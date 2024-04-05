<script setup>

import Navbar from '@/components/globals/Navbar.vue'
import Footer from '@/components/globals/Footer.vue'
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()
const collapsedStatus = computed(() => store.getters["sidebar/collapsed"] )
</script>

<template>
  <!-- Content Wrapper -->
  <div id="content-wrapper" :class="`d-flex flex-column ${collapsedStatus ? 'content-collapsed' : 'content'} vh-100`">

    <!-- Main Content -->
    <div id="content">

      <!-- Topbar -->
      <Navbar />
      <!-- End of Topbar -->

      <!-- Begin Page Content -->
      <div class="container-fluid">

        <!-- Page Heading -->
        <router-view />

      </div>

    </div>

    <Footer />

  </div>
  <!-- End of Content Wrapper -->
</template>

<style>

</style>