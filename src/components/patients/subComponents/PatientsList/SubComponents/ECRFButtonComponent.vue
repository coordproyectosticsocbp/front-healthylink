<script setup>
import {computed, ref} from "vue";
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
import clearAllLocalStorage from "@/composables/patients/clearAllComplementaryLocalStorage.js";
import {useStore} from "vuex";
import structurePayloadForComplementaryInfo from "@/composables/patients/structurePayloadForComplementaryInfo.js";
import PatientService from "@/services/patients/Patient.service.js";
import {getError} from "@/utils/helpers/getError.js";
import FindingsHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/FindingsHistoryForm.vue";

const props = defineProps({
  itemInformation: Number
})

/* Events */
const emit = defineEmits(['onSubmit'])

const store = useStore()
const authUser = computed(() => store.getters['auth/authUser'])
const savingButtonStatus = ref(false)

// Refs
const crfModalRef = ref(null)

const PatientEvolutionFormRef = ref()
const FindingsHistoryFormRef = ref()
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
  FindingsHistoryFormRef.value.clearFields()
  PathologicalHistoryFormRef.value.clearFields()
  PharmacologicalHistoryFormRef.value.clearFields()
  OthersHistoryFormRef.value.clearFields()
  LaboratoryHistoryFormRef.value.clearFields()
  BiochemicalBackgroundFormRef.value.clearFields()
  HormonalHistoryFormRef.value.clearFields()
  DiagnosticImagingFormRef.value.clearFields()
}

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
      clearAllLocalStorage()
      Modal.getInstance(crfModalRef.value)?.hide()
    }
  })
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
                  executeAllExposeClearFields()
                  clearAllLocalStorage()
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
  <button class="btn btn-global-color btn-sm rounded"
          title="Completar CRF"
          type="button"
          @click.prevent="showECRFModal"
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
              @click.prevent="closeECRFModal"
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

              <FindingsHistoryForm ref="FindingsHistoryFormRef" :itemIndexVal="props.itemInformation"/>

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

        <!-- Modal Footer -->
        <div class="modal-footer">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-sm btn-outline-danger me-md-2"
                    type="button"
                    @click.prevent="closeECRFModal"
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