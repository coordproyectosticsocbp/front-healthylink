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
import {computed, ref, toRefs} from "vue";
import structurePayloadForComplementaryInfo from "@/composables/patients/structurePayloadForComplementaryInfo.js";
import {useStore} from "vuex";
import AttachedDocumentsForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/AttachedDocumentsForm.vue";
import PatientService from "@/services/patients/Patient.service.js";
import {getError} from "@/utils/helpers/getError.js";
import {Modal} from "bootstrap";
import clearAllLocalStorage from "@/composables/patients/clearAllComplementaryLocalStorage.js";
//import {Modal} from "bootstrap";

const props = defineProps({
  itemInformation: Number
})

const {itemInformation} = toRefs(props)

/* Events */
const emit = defineEmits(['onSubmit'])

const store = useStore()
const authUser = computed(() => store.getters['auth/authUser'])
const savingButtonStatus = ref(false)
const crfModalRef = ref()

const PatientEvolutionFormRef = ref()
const PathologicalHistoryFormRef = ref()
const PharmacologicalHistoryFormRef = ref()
const OthersHistoryFormRef = ref()
const LaboratoryHistoryFormRef = ref()
const BiochemicalBackgroundFormRef = ref()
const HormonalHistoryFormRef = ref()
const DiagnosticImagingFormRef = ref()
const AttachedDocumentsFormRef = ref()

function executeAllExposeClearFields() {
  PatientEvolutionFormRef.value.clearFields()
  PathologicalHistoryFormRef.value.clearFields()
  PharmacologicalHistoryFormRef.value.clearFields()
  OthersHistoryFormRef.value.clearFields()
  LaboratoryHistoryFormRef.value.clearFields()
  BiochemicalBackgroundFormRef.value.clearFields()
  HormonalHistoryFormRef.value.clearFields()
  DiagnosticImagingFormRef.value.clearFields()
}

const cancelComplementaryInfo = async () => {
  await executeAllExposeClearFields()
  await clearAllLocalStorage()
}

const saveComplementaryInfoForm = (patientID, userID) => {

  Swal.fire({
    icon: "question",
    title: 'Deseas REALMENTE registrar la información complementaria del paciente?',
    showCancelButton: true,
    confirmButtonText: "Guardar",
  })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          savingButtonStatus.value = true
          const payload = structurePayloadForComplementaryInfo(patientID, userID)

          //console.log(payload)

          PatientService.saveComplementaryInformation(payload)
              .then((response) => {
                if (response.data.statusCode !== 201) {
                  savingButtonStatus.value = false
                  Swal.fire({
                    icon: 'error',
                    text: response.data.message
                  })
                } else {
                  emit('onSubmit')
                  savingButtonStatus.value = false
                  cancelComplementaryInfo()
                  Swal.fire({
                    icon: 'success',
                    text: response.data.message
                  })
                  Modal.getInstance(crfModalRef.value)?.hide()
                }
              })
              .catch((error) => {
                console.log(error)
                savingButtonStatus.value = false
                Swal.fire({
                  icon: 'error',
                  text: getError(error)
                })
              })

        }
      })

}

</script>

<template>

  <button :data-bs-target="`#crfModal-${itemInformation}`"
          class="btn btn-global-color btn-sm rounded"
          data-bs-toggle="modal"
          title="Completar CRF"
          type="button"
  >
    <font-awesome-icon :icon="['fas', 'list-check']"/>
    completar
  </button>

  <!-- Modal -->
  <div :id="`crfModal-${itemInformation}`"
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
            2. Recolección de información por Historia clínica {{ itemInformation }}
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

            <div :id="`v-pills-tab-${itemInformation}`"
                 aria-orientation="vertical"
                 class="nav flex-column nav-pills me-3 border-end p-1"
                 role="tablist"
            >
              <button v-for="(option, index) in patientComplementayTabOption"
                      :id="`v-pills-${option.value}-tab-${itemInformation}`"
                      :key="option.value"
                      :aria-controls="`v-pills-${option.value}-${itemInformation}`"
                      :aria-selected="`${(index === 0)}`"
                      :class="`nav-link text-start ${index === 0 ? 'active' : ''}`"
                      :data-bs-target="`#v-pills-${option.value}-${itemInformation}`"
                      :disabled="option.value === 'antecedentes' || option.value === 'laboratorios' || option.value === 'imagenes' || option.value === 'anexoss'"
                      data-bs-toggle="pill"
                      role="tab"
                      type="button"
              >
                {{ option.name }}
              </button>
            </div>

            <div :id="`v-pills-tabContent-${itemInformation}`" class="tab-content w-100">

              <PatientEvolutionForm ref="PatientEvolutionFormRef" :itemIndexVal="itemInformation"/>

              <PathologicalHistoryForm ref="PathologicalHistoryFormRef" :itemIndexVal="itemInformation"/>

              <PharmacologicalHistoryForm ref="PharmacologicalHistoryFormRef" :itemIndexVal="itemInformation"/>

              <OthersHistoryForm ref="OthersHistoryFormRef" :itemIndexVal="itemInformation"/>

              <LaboratoryHistoryForm ref="LaboratoryHistoryFormRef" :itemIndexVal="itemInformation"/>

              <BiochemicalBackgroundForm ref="BiochemicalBackgroundFormRef" :itemIndexVal="itemInformation"/>

              <HormonalHistoryForm ref="HormonalHistoryFormRef" :itemIndexVal="itemInformation"/>

              <DiagnosticImagingForm ref="DiagnosticImagingFormRef" :itemIndexVal="itemInformation"/>

              <AttachedDocumentsForm ref="AttachedDocumentsFormRef" :itemIndexVal="itemInformation"/>

            </div>

          </div>

          <!-- End Form Fields -->

        </div>
        <!-- End Modal Body -->

        <!-- Modal Footer -->
        <div class="modal-footer">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-sm btn-outline-danger me-md-2"
                    data-bs-dismiss="modal"
                    type="button"
                    @click="cancelComplementaryInfo(itemInformation)"
            >
              <font-awesome-icon :icon="['fas', 'times']"/>
              Cancelar
            </button>
            <button :disabled="savingButtonStatus"
                    class="btn btn-sm btn-outline-success"
                    type="button"
                    @click.prevent="saveComplementaryInfoForm(itemInformation, authUser.id)"
            >
              <!--              @click.prevent="saveComplementaryInfoForm(itemInformation)"-->
              <span v-if="savingButtonStatus" aria-hidden="true" class="spinner-grow spinner-grow-sm"/>
              <font-awesome-icon v-else :icon="['fas', 'floppy-disk']"/>
              {{ savingButtonStatus ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </div>
        <!-- End Modal Footer -->

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>