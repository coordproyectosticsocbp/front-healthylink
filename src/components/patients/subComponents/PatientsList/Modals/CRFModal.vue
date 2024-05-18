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
import {computed, ref} from "vue";
import clearAllLocalStorage from "@/composables/patients/clearAllComplementaryLocalStorage.js";
import structurePayloadForComplementaryInfo from "@/composables/patients/structurePayloadForComplementaryInfo.js";
import {useStore} from "vuex";
import {Modal} from "bootstrap";
import PatientService from "@/services/patients/Patient.service.js";
import {getError} from "@/utils/helpers/getError.js";
import AttachedDocumentsForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/AttachedDocumentsForm.vue";

const props = defineProps({
  itemInformation: Object
})

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

const cancelComplementaryInfo = async (patientId) => {
  await executeAllExposeClearFields()
  await clearAllLocalStorage(patientId)
}

const saveComplementaryInfoForm = (patientID, userID) => {

  savingButtonStatus.value = true
  const payload = structurePayloadForComplementaryInfo(patientID, userID)

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
          cancelComplementaryInfo(patientID)
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

</script>

<template>

  <button :data-bs-target="`#crfModal-${props.itemInformation.id}`"
          class="btn btn-global-color btn-sm rounded"
          data-bs-toggle="modal"
          title="Completar CRF"
          type="button"
  >
    <font-awesome-icon :icon="['fas', 'list-check']"/>
  </button>

  <!-- Modal -->
  <div :id="`crfModal-${props.itemInformation.id}`"
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
                      :disabled="option.value === 'antecedentes' || option.value === 'laboratorios' || option.value === 'imagenes' || option.value === 'anexoss'"
                      data-bs-toggle="pill"
                      role="tab"
                      type="button"
              >
                {{ option.name }}
              </button>
            </div>

            <div :id="`v-pills-tabContent-${props.itemInformation.id}`" class="tab-content w-100">

              <PatientEvolutionForm ref="PatientEvolutionFormRef" :itemIndexVal="props.itemInformation.id"/>

              <PathologicalHistoryForm ref="PathologicalHistoryFormRef" :itemIndexVal="props.itemInformation.id"/>

              <PharmacologicalHistoryForm ref="PharmacologicalHistoryFormRef" :itemIndexVal="props.itemInformation.id"/>

              <OthersHistoryForm ref="OthersHistoryFormRef" :itemIndexVal="props.itemInformation.id"/>

              <LaboratoryHistoryForm ref="LaboratoryHistoryFormRef" :itemIndexVal="props.itemInformation.id"/>

              <BiochemicalBackgroundForm ref="BiochemicalBackgroundFormRef" :itemIndexVal="props.itemInformation.id"/>

              <HormonalHistoryForm ref="HormonalHistoryFormRef" :itemIndexVal="props.itemInformation.id"/>

              <DiagnosticImagingForm ref="DiagnosticImagingFormRef" :itemIndexVal="props.itemInformation.id"/>

              <AttachedDocumentsForm ref="AttachedDocumentsFormRef" :itemIndexVal="props.itemInformation.id"/>

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
                    @click="cancelComplementaryInfo(props.itemInformation.id)"
            >
              <font-awesome-icon :icon="['fas', 'times']"/>
              Cancelar
            </button>
            <button :disabled="savingButtonStatus"
                    class="btn btn-sm btn-outline-success"
                    type="button"
                    @click.prevent="saveComplementaryInfoForm(props.itemInformation.id, authUser.id)"
            >
              <!--              @click.prevent="saveComplementaryInfoForm(props.itemInformation.id)"-->
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