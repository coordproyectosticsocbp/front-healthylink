<script setup>

import SurveyHeader from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/SurveyHeader.vue";
import DemographicSurveySection
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/DemographicSurveySection.vue";
import HealthHabitsSection
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/HealthHabitsSection.vue";
import PersonalHealthInformation
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/PersonalHealthInformation.vue";
import Covid19Section from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/Covid19Section.vue";
</script>

<template>
  <div class="container">

    <SurveyHeader/>

    <DemographicSurveySection/>

    <HealthHabitsSection/>

    <PersonalHealthInformation/>

    <Covid19Section/>

  </div>
</template>

<style scoped>

</style>