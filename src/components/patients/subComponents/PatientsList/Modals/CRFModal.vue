<script setup>

import {defineProps} from "vue";
import PathologicalHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/PathologicalHistoryForm.vue";
import PharmacologicalHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/PharmacologicalHistoryForm.vue";
import OthersHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/OthersHistoryForm.vue";
import LaboratoryHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/LaboratoryHistoryForm.vue";
import {patientComplementayTabOption} from "@/utils/const/patientComplementaryInfo.js";
import HormonalHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/HormonalHistoryForm.vue";
import BiochemicalBackgroundForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/BiochemicalBackgroundForm.vue";
import PatientEvolutionForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/PatientEvolutionForm.vue";
import DiagnosticImagingForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/DiagnosticImagingForm.vue";

/*
const crfModalRef = ref()
const formIsDisplay = ref(false)
*/

const props = defineProps({
  itemInformation: Object
})

//console.log(props.itemInformation)
/*const toggleModal = () => {
  crfModalRef.value.show
}

const toggleForm = () => {
  formIsDisplay.value = !formIsDisplay.value
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
       tabindex="-1"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="exampleModalLabel" class="modal-title fs-5">
            2. Recolección de información por Historia clínica {{ props.itemInformation.id }}
          </h1>
          <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"/>
        </div>
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

          <!--          <div class="d-flex align-items-start">
                      <div id="v-pills-tab" aria-orientation="vertical" class="nav flex-column nav-pills me-3" role="tablist">
                        <button id="v-pills-home-tab" aria-controls="v-pills-home" aria-selected="true" class="nav-link active"
                                data-bs-target="#v-pills-home" data-bs-toggle="pill" role="tab" type="button">Home
                        </button>
                        <button id="v-pills-profile-tab" aria-controls="v-pills-profile" aria-selected="false" class="nav-link"
                                data-bs-target="#v-pills-profile" data-bs-toggle="pill" role="tab" type="button">Profile
                        </button>
                        <button id="v-pills-disabled-tab" aria-controls="v-pills-disabled" aria-selected="false"
                                class="nav-link" data-bs-target="#v-pills-disabled" data-bs-toggle="pill" disabled
                                role="tab" type="button">Disabled
                        </button>
                        <button id="v-pills-messages-tab" aria-controls="v-pills-messages" aria-selected="false"
                                class="nav-link" data-bs-target="#v-pills-messages" data-bs-toggle="pill" role="tab"
                                type="button">Messages
                        </button>
                        <button id="v-pills-settings-tab" aria-controls="v-pills-settings" aria-selected="false"
                                class="nav-link" data-bs-target="#v-pills-settings" data-bs-toggle="pill" role="tab"
                                type="button">Settings
                        </button>
                      </div>
                      <div id="v-pills-tabContent" class="tab-content">
                        <div id="v-pills-home" aria-labelledby="v-pills-home-tab" class="tab-pane fade show active"
                             role="tabpanel" tabindex="0"
                        >
                          This is some placeholder content the Home tab's associated content. Clicking another tab will toggle the
                          visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility
                          and styling. You can use it with tabs, pills, and any other .nav-powered navigation.
                        </div>
                        <div id="v-pills-profile" aria-labelledby="v-pills-profile-tab" class="tab-pane fade" role="tabpanel"
                             tabindex="0">...
                        </div>
                        <div id="v-pills-disabled" aria-labelledby="v-pills-disabled-tab" class="tab-pane fade" role="tabpanel"
                             tabindex="0">...
                        </div>
                        <div id="v-pills-messages" aria-labelledby="v-pills-messages-tab" class="tab-pane fade" role="tabpanel"
                             tabindex="0">...
                        </div>
                        <div id="v-pills-settings" aria-labelledby="v-pills-settings-tab" class="tab-pane fade" role="tabpanel"
                             tabindex="0">...
                        </div>
                      </div>
                    </div>-->

          <!-- End Form Fields -->


        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>