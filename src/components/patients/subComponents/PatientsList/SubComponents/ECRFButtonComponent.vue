<script setup>
import {ref} from "vue";
import {Modal} from "bootstrap";
import {patientComplementayTabOption} from "@/utils/const/patientComplementaryInfo.js";
import PathologicalHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/PathologicalHistoryForm.vue";
import BiochemicalBackgroundForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/BiochemicalBackgroundForm.vue";
import AttachedDocumentsForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/AttachedDocumentsForm.vue";
import PharmacologicalHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/PharmacologicalHistoryForm.vue";
import OthersHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/OthersHistoryForm.vue";
import DiagnosticImagingForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/DiagnosticImagingForm.vue";
import LaboratoryHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/LaboratoryHistoryForm.vue";
import HormonalHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/HormonalHistoryForm.vue";
import PatientEvolutionForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/PatientEvolutionForm.vue";

const props = defineProps({
  itemInformation: Number
})

// Refs
const crfModalRef = ref(null)

const showECRFModal = () => {
  console.log(props.itemInformation)
  new Modal(`#crfModal-${props.itemInformation}`, {
    keyboard: false
  }).show()
}

const closeECRFModal = () => {
  Swal.fire({
    icon: 'warning',
    title: 'Estas seguro?',
    text: 'Al cerrar perderas la información registrada previamente :(',
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Si, Cerrar',
    cancelButtonText: 'Regresar al Formulario',
    cancelButtonColor: "#0d6efd",
    confirmButtonColor: '#dc3545'
  }).then((result) => {
    if (result.isConfirmed) {
      Modal.getInstance(crfModalRef.value)?.hide()
    }
  })
}


</script>

<template>
  <button class="btn btn-global-color btn-sm rounded"
          title="Completar CRF"
          type="button"
          @click="showECRFModal"
  >
    <font-awesome-icon :icon="['fas', 'list-check']"/>
    completar
  </button>

  <div :id="`crfModal-${props.itemInformation}`"
       ref="crfModalRef"
       aria-hidden="true"
       aria-labelledby="exampleModalLabel"
       class="modal fade"
       data-bs-backdrop="static"
       data-bs-keyboard="false"
       tabindex="-1"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="exampleModalLabel" class="modal-title fs-5">
            2. Recolección de información por Historia clínica {{ props.itemInformation }}
          </h1>
          <button
              aria-label="Close"
              class="btn-close"
              type="button"
              @click="closeECRFModal"
          />
        </div>

        <!-- Modal Body -->
        <div class="modal-body">

          <!-- Form Fields -->
          <div class="d-flex align-items-start">

            <div :id="`v-pills-tab-${props.itemInformation}`"
                 aria-orientation="vertical"
                 class="nav flex-column nav-pills me-3 border-end p-1"
                 role="tablist"
            >
              <button v-for="(option, index) in patientComplementayTabOption"
                      :id="`v-pills-${option.value}-tab-${props.itemInformation}`"
                      :key="option.value"
                      :aria-controls="`v-pills-${option.value}-${props.itemInformation}`"
                      :aria-selected="`${(index === 0)}`"
                      :class="`nav-link text-start ${index === 0 ? 'active' : ''}`"
                      :data-bs-target="`#v-pills-${option.value}-${props.itemInformation}`"
                      :disabled="option.value === 'antecedentes' || option.value === 'laboratorios' || option.value === 'imagenes' || option.value === 'anexoss'"
                      data-bs-toggle="pill"
                      role="tab"
                      type="button"
              >
                {{ option.name }}
              </button>
            </div>

            <div :id="`v-pills-tabContent-${props.itemInformation}`" class="tab-content w-100">

              <PatientEvolutionForm ref="PatientEvolutionFormRef" :itemIndexVal="props.itemInformation"/>

              <PathologicalHistoryForm ref="PathologicalHistoryFormRef" :itemIndexVal="props.itemInformation"/>

              <PharmacologicalHistoryForm ref="PharmacologicalHistoryFormRef" :itemIndexVal="props.itemInformation"/>

              <OthersHistoryForm ref="OthersHistoryFormRef" :itemIndexVal="props.itemInformation"/>

              <LaboratoryHistoryForm ref="LaboratoryHistoryFormRef" :itemIndexVal="props.itemInformation"/>

              <BiochemicalBackgroundForm ref="BiochemicalBackgroundFormRef" :itemIndexVal="props.itemInformation"/>

              <HormonalHistoryForm ref="HormonalHistoryFormRef" :itemIndexVal="props.itemInformation"/>

              <DiagnosticImagingForm ref="DiagnosticImagingFormRef" :itemIndexVal="props.itemInformation"/>

              <AttachedDocumentsForm ref="AttachedDocumentsFormRef" :itemIndexVal="props.itemInformation"/>

            </div>

          </div>

          <!-- End Form Fields -->

        </div>
        <!-- End Modal Body -->

      </div>
    </div>
  </div>

</template>

<style scoped>

</style>