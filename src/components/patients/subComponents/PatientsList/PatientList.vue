<script setup>

import {onMounted, ref} from 'vue'
import PatientService from '@/services/patients/Patient.service.js'
import {getError} from "@/utils/helpers/getError.js";
import {useLoading} from "vue-loading-overlay";
import CRFModal from "@/components/patients/subComponents/PatientsList/Modals/CRFModal.vue";

const headers = [
  {text: 'Tipo Doc', value: 'tipo_doc'},
  {text: 'Documento', value: 'numero_documento'},
  {text: 'P. Nombre', value: 'primer_nombre'},
  {text: 'S. Nombre', value: 'segundo_nombre"'},
  {text: 'P. Apellido', value: 'primer_apellido'},
  {text: 'S. Apellido', value: 'segundo_apellido'},
  {text: 'Fech. Nacimiento', value: 'fecha_nacimiento'},
  {text: 'País', value: 'pais_residencia'},
  {text: 'Departamento', value: 'departamento_residencia'},
  {text: 'Ciudad', value: 'ciudad_residencia'},
  {text: 'Teléfono', value: 'telefono_celular'},
  {text: 'Acciones', value: 'actions'},
]

const patients = ref([])
const fullPage = ref(true)
const errors = ref(null)

const $loading = useLoading({
  loader: 'dots',
  isFullPage: fullPage,
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
})
const getPatientsFullList = async () => {

  const loader = $loading.show()

  await PatientService.getPatientsFullList()
      .then((response) => {
        patients.value = response.data.data
        loader.hide()
      })
      .catch((error) => {
        loader.hide()
        errors.value = getError(error)
      })
}


onMounted(
    getPatientsFullList
)

</script>

<template>

  <div ref="fullPageContainer" class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">

            <EasyDataTable :headers="headers" :items="patients">
              <template #item-actions="item">
                <CRFModal :itemInformation="item"/>
              </template>
            </EasyDataTable>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>