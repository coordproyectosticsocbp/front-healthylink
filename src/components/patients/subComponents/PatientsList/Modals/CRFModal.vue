<script setup>

import {patientComplementayTabOption} from "@/utils/const/patientComplementaryInfo.js";
import PathologicalHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/PathologicalHistoryForm.vue";
import PharmacologicalHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/PharmacologicalHistoryForm.vue";
import OthersHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/OthersHistoryForm.vue";
import LaboratoryHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/LaboratoryHistoryForm.vue";
import HormonalHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/HormonalHistoryForm.vue";
import BiochemicalBackgroundForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/BiochemicalBackgroundForm.vue";
import PatientEvolutionForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/PatientEvolutionForm.vue";
import DiagnosticImagingForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/DiagnosticImagingForm.vue";

const props = defineProps({
  itemInformation: Object
})

const evolutionInfo = window.localStorage.getItem('evolutionInfo')
/*const pathologicalInfo = window.localStorage.getItem('pathologicalInfo')
const othersInfo = window.localStorage.getItem('othersInfo')
const pharmacologicalHistory = window.localStorage.getItem('pharmacologicalHistory')
const laboratoryHistory = window.localStorage.getItem('laboratoryHistory')
const biochemicalHistory = window.localStorage.getItem('biochemicalHistory')
const hormonalHistory = window.localStorage.getItem('hormonalHistory')
const imagesHistory = window.localStorage.getItem('imagesHistory')*/

/*const dismissButtonEnabled = computed(() => {
  return evolutionInfo;

})*/

/*const saveComplementaryInfoForm = (patientId) => {
  alert('dd: ' + patientId)
}

const cancelComplementaryInfo = (patientId) => {
  window.localStorage.removeItem(`evolutionInfo-${patientId + 1}`)
  window.localStorage.removeItem(`pathologicalInfo-${patientId + 1}`)
  window.localStorage.removeItem(`othersInfo-${patientId + 1}`)
  window.localStorage.removeItem(`pharmacologicalHistory-${patientId + 1}`)
  window.localStorage.removeItem(`laboratoryHistory-${patientId + 1}`)
  window.localStorage.removeItem(`biochemicalHistory-${patientId + 1}`)
  window.localStorage.removeItem(`hormonalHistory-${patientId + 1}`)
  window.localStorage.removeItem(`imagesHistory-${patientId + 1}`)
}*/

</script>

<template>

  <button :data-bs-target="`#crfmodal-${props.itemInformation.id}`"
          class="btn btn-global-color btn-sm rounded"
          data-bs-toggle="modal"
          title="Completar CRF"
          type="button"
  >
    <font-awesome-icon :icon="['fas', 'list-check']"/>
  </button>

  <!-- Modal -->
  <div :id="`crfmodal-${props.itemInformation.id}`"
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
            2. Recolección de información por Historia clínica {{ props.itemInformation.id }}
          </h1>
          <button
              aria-label="Close"
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
          />
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <!-- Form Fields -->
          <div class="d-flex align-items-start">

            <div :id="`v-pills-tab-${props.itemInformation.id}`"
                 aria-orientation="vertical"
                 class="nav flex-column nav-pills me-3 border-end p-1"
                 role="tablist"
            >
              <button v-for="(option, index) in patientComplementayTabOption"
                      :id="`v-pills-${option.value}-tab-${props.itemInformation.id}`"
                      :key="option.value"
                      :aria-controls="`v-pills-${option.value}-${props.itemInformation.id}`"
                      :aria-selected="`${(index === 0)}`"
                      :class="`nav-link text-start ${index === 0 ? 'active' : ''}`"
                      :data-bs-target="`#v-pills-${option.value}-${props.itemInformation.id}`"
                      :disabled="option.value === 'antecedentes' || option.value === 'laboratorios' || option.value === 'imagenes'"
                      data-bs-toggle="pill"
                      role="tab"
                      type="button"
              >
                {{ option.name }}
              </button>
            </div>

            <div :id="`v-pills-tabContent-${props.itemInformation.id}`" class="tab-content w-100">

              <PatientEvolutionForm :itemIndexVal="props.itemInformation.id"/>

              <PathologicalHistoryForm :itemIndexVal="props.itemInformation.id"/>

              <PharmacologicalHistoryForm :itemIndexVal="props.itemInformation.id"/>

              <OthersHistoryForm :itemIndexVal="props.itemInformation.id"/>

              <LaboratoryHistoryForm :itemIndexVal="props.itemInformation.id"/>

              <BiochemicalBackgroundForm :itemIndexVal="props.itemInformation.id"/>

              <HormonalHistoryForm :itemIndexVal="props.itemInformation.id"/>

              <DiagnosticImagingForm :itemIndexVal="props.itemInformation.id"/>

            </div>

          </div>

          <!-- End Form Fields -->


        </div>
        <!-- End Modal Body -->

        <!-- Modal Footer -->
        <!--        <div class="modal-footer">
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-sm btn-outline-danger me-md-2"
                            data-bs-dismiss="modal"
                            type="button"
                            @click="cancelComplementaryInfo(props.itemInformation.id)"
                    >
                      <font-awesome-icon :icon="['fas', 'times']"/>
                      Cancelar
                    </button>
                    <button class="btn btn-sm btn-outline-success"
                            type="button"
                            @click.prevent="saveComplementaryInfoForm(props.itemInformation.id)"
                    >
                      <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
                      Guardar
                    </button>
                  </div>
                </div>-->
        <!-- End Modal Footer -->

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>