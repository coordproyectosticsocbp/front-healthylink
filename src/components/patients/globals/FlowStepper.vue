<script setup>

import CreatePatientComponent from "@/components/patients/subComponents/CreatePatient/CreatePatientComponent.vue";
import {ref} from "vue";
import InformedConsentComponent from "@/components/patients/subComponents/CreatePatient/InformedConsentComponent.vue";

const wizard = ref(null)
const createPatientComponentRef = ref()

function isLastStep() {
  if (wizard.value) {
    return wizard.value.isLastStep
  }
  return false
}

async function validateStep(props) {

  if (props.activeTabIndex === 0) {
    const submitState = await createPatientComponentRef.value.handleSubmit()
    //console.log(submitState)
    if (submitState) {
      //console.log('hay un error')
      return props.nextTab()
    }
  } else if (props.activeTabIndex === 1) {
    const patientSignatureExists = window.localStorage.getItem('patientSignature')
    if (patientSignatureExists) {
      return props.nextTab()
    } else {
      alert('No se puede Continuar, falta firma consentimiento')
    }
  }


  //return props.nextTab()
}

function onComplete() {
  alert('Yay!!')
  return true
}

</script>

<template>
  <form-wizard @on-complete="onComplete" step-size="xs" ref="wizard">

    <!-- Fisrt Step -->
    <tab-content title="Datos Personales">
      <CreatePatientComponent ref="createPatientComponentRef" />
    </tab-content>
    <!-- End Fisrt Step -->

    <!-- Second Step -->
    <tab-content title="Consentimiento">
      <InformedConsentComponent />
    </tab-content>
    <!-- End Second Step -->

    <!-- Third Step -->
    <tab-content title="Encuesta">
      Yuhuuu! This seems pretty damn simple
    </tab-content>
    <!-- End Third Step -->

    <template v-slot:footer="props">
      <div class="wizard-footer-left">
        <wizard-button  v-if="props.activeTabIndex > 0" class="btn btn-global-color" @click="props.prevTab()" :style="props.fillButtonStyle">
          Atrás
        </wizard-button>
      </div>
      <div class="wizard-footer-right">
        <wizard-button v-if="!props.isLastStep" @click="validateStep(props)" class="wizard-footer-right btn btn-global-color" :style="props.fillButtonStyle">
          Continuar
        </wizard-button>

        <wizard-button v-else @click="onComplete" class="wizard-footer-right btn btn-aqua-color" :style="props.fillButtonStyle">  {{ props.isLastStep ? 'Finalizar' : 'Continuar'}}</wizard-button>
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