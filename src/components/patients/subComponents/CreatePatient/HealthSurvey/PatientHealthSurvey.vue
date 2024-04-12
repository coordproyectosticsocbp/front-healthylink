<script setup>

import SurveyHeader from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/SurveyHeader.vue";
import DemographicSurveySection
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/DemographicSurveySection.vue";
import HealthHabitsSection
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/HealthHabitsSection.vue";
</script>

<template>
  <div class="container">

    <SurveyHeader />

    <DemographicSurveySection />

    <HealthHabitsSection />

  </div>
</template>

<style scoped>

</style>