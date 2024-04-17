<script setup>

import CreatePatientComponent
  from "@/components/patients/subComponents/CreatePatient/CreatePatientForm/CreatePatientComponent.vue";
import {computed, ref} from "vue";
import InformedConsentComponent
  from "@/components/patients/subComponents/CreatePatient/InformedConsent/InformedConsentComponent.vue";
import PatientHealthSurvey
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/PatientHealthSurvey.vue";

const wizard = ref(null)
const createPatientComponentRef = ref(null)
const patientHealthSurveyRef = ref(null)

const currentFormStepIndexVal = computed(() => {
  const index = window.localStorage.getItem('currentFormStepIndex')
  if (index) {
    return JSON.parse(index)
  }
})

const isLastStep = () => {
  if (wizard.value) {
    return wizard.value.isLastStep
  }
  return false
}

async function validateStep(props) {
  const currentFormStepIndex = window.localStorage.getItem('currentFormStepIndex')
  if (!currentFormStepIndex) window.localStorage.setItem('currentFormStepIndex', JSON.stringify(0))

  if (props.activeTabIndex === 0) {

    const submitState = await createPatientComponentRef.value.handleSubmit()
    if (submitState) {
      //console.log('hay un error')
      window.localStorage.setItem('currentFormStepIndex', JSON.stringify(1))
      return props.nextTab()
    }

  } else if (props.activeTabIndex === 1) {

    const patientSignatureExists = window.localStorage.getItem('patientSignature')
    if (patientSignatureExists) {
      window.localStorage.setItem('currentFormStepIndex', JSON.stringify(2))
      return props.nextTab()
    } else {
      alert('No se puede Continuar, falta firma consentimiento')
    }

  }
}

const validatePrevStep = (props) => {
  if (props.activeTabIndex > 0) {
    if (props.activeTabIndex === 2) {
      window.localStorage.setItem('currentFormStepIndex', JSON.stringify(1))
      props.prevTab()
    } else if (props.activeTabIndex === 1) {
      window.localStorage.setItem('currentFormStepIndex', JSON.stringify(0))
      props.prevTab()
    }
  }
}

async function onComplete () {
  await patientHealthSurveyRef.value.testEvent()
  /*if (!demographicSubmitState) {
    alert('Yay!!')
  }*/
  //console.log(demographicSubmitState)
  //return true
}


</script>

<template>
  <form-wizard ref="wizard"
               :start-index="currentFormStepIndexVal"
               step-size="xs"
               @on-complete="onComplete"
  >

    <!-- Fisrt Step -->
    <tab-content title="Datos Personales">
      <CreatePatientComponent ref="createPatientComponentRef"/>
    </tab-content>
    <!-- End Fisrt Step -->

    <!-- Second Step -->
    <tab-content title="Consentimiento">
      <InformedConsentComponent />
    </tab-content>
    <!-- End Second Step -->

    <!-- Third Step -->
    <tab-content title="Encuesta">
      <PatientHealthSurvey ref="patientHealthSurveyRef" />
    </tab-content>
    <!-- End Third Step -->

    <!-- Fourth Step -->
    <!--    <tab-content title="Historía Clínica">
          <p>Ups!</p>
        </tab-content>-->
    <!-- End Fourth Step -->

    <template v-slot:footer="props">
      <div class="wizard-footer-left">
        <wizard-button v-if="props.activeTabIndex > 0" :style="props.fillButtonStyle" class="btn btn-global-color"
                       @click="validatePrevStep(props)">
          Atrás
        </wizard-button>
      </div>
      <div class="wizard-footer-right">
        <wizard-button v-if="!props.isLastStep" :style="props.fillButtonStyle"
                       class="wizard-footer-right btn btn-global-color" @click="validateStep(props)">
          Continuar
        </wizard-button>

        <wizard-button v-else :style="props.fillButtonStyle" class="wizard-footer-right btn btn-aqua-color"
                       @click="onComplete"> {{ props.isLastStep ? 'Finalizar' : 'Continuar' }}
        </wizard-button>
      </div>
    </template>

    <!--    <template #custom-buttons-left>
          <button class="btn btn-global-color">Atrás</button>
        </template>

        <template #custom-buttons-right>
          <button class="btn btn-global-color">Seguir</button>
        </template>-->

    <!--    <template #prev>
          <button class="btn btn-global-color">Atrás</button>
        </template>

        <template #next>
          <button class="btn btn-global-color">Seguir</button>
        </template>-->

    <template #finish>
      <button class="btn btn-aqua-color">Finalizar</button>
    </template>

  </form-wizard>
</template>

<style scoped>

</style>