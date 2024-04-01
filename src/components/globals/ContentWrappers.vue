<script setup>

import Navbar from '@/components/globals/Navbar.vue'
import Footer from '@/components/globals/Footer.vue'
</script>

<template>
  <!-- Content Wrapper -->
  <div id="content-wrapper" class="d-flex flex-column">

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

<style scoped>

</style>