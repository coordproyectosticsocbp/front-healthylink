<script setup>

import SurveyHeader from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/SurveyHeader.vue";
import DemographicSurveySection
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/DemographicSurveySection.vue";
import HealthHabitsSection
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/HealthHabitsSection.vue";
import PersonalHealthInformation
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/PersonalHealthInformation.vue";
import Covid19Section from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/Covid19Section.vue";
import {ref} from "vue";

const demographicSurveySectionRef = ref(null)
const healthHabitsSectionRef = ref(null)
const personalHealthInformationRef = ref(null)
const covid19SectionRef = ref(null)

async function testEvent() {
  await demographicSurveySectionRef.value.handleSubmit()
  await healthHabitsSectionRef.value.handleSubmit()
  await personalHealthInformationRef.value.handleSubmit()
  await covid19SectionRef.value.handleSubmit()
}

defineExpose({
  testEvent
})

</script>

<template>
  <div class="container">

    <SurveyHeader/>

    <DemographicSurveySection ref="demographicSurveySectionRef" />

    <HealthHabitsSection ref="healthHabitsSectionRef" />

    <PersonalHealthInformation ref="personalHealthInformationRef" />

    <Covid19Section ref="covid19SectionRef" />

  </div>
</template>

<style scoped>

</style>