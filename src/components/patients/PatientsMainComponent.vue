<script setup>

import CustomFlowStepper from "@/components/patients/globals/CustomFlowStepper.vue";
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!--        <FlowStepper/>-->
        <CustomFlowStepper/>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <router-view/>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

  </div>
</template>

<style scoped>

</style>