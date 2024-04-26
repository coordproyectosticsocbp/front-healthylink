<script setup>

import {onMounted, ref} from 'vue'
import PatientService from '@/services/patients/Patient.service.js'
import {getError} from "@/utils/helpers/getError.js";
import {useLoading} from "vue-loading-overlay";
import CRFModal from "@/components/patients/subComponents/PatientsList/Modals/CRFModal.vue";
import dayjs from "dayjs";

const headers = [
  {text: 'Código Paciente', value: 'code_paciente'},
  {text: 'Tipo Doc', value: 'tipo_doc'},
  {text: 'Documento Paciente', value: 'numero_documento'},
  {text: 'Codigo muestra', value: 'id'},
  {text: 'Sede Toma Muestra', value: 'sede_toma_muestra'},
  {text: 'Fecha Creación', value: 'created_at'},
  {text: 'Estado Actual', value: 'ultimo_estado'},
  {text: 'Acciones', value: 'actions'},
]

const patients = ref([])
const fullPage = ref(true)
const errors = ref(null)
const searchField = ref(["code_paciente", "sede_toma_muestra", "ultimo_estado"])
const searchValue = ref("")

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

            <div class="row mb-3">
              <div class="col">
                <div class="form-floating">
                  <input id="floatingInput3" v-model="searchValue"
                         autocomplete="off"
                         class="form-control"
                         placeholder="Escriba Aquí Para Buscar"
                         type="text"
                  >
                  <label for="floatingInput3">
                    Escriba Aquí Para Buscar (Código, Sede, Estado)
                  </label>
                </div>
              </div>
              <div class="col d-flex align-items-center justify-content-end">
                <button
                    class="btn btn-sm btn-warning rounded"
                    @click.prevent="getPatientsFullList"
                >
                  <font-awesome-icon :icon="['fas', 'sync']"/>
                  Recargar
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <EasyDataTable :headers="headers"
                               :items="patients"
                               :rows-items="[10, 20, 30]"
                               :rows-per-page="10"
                               :search-field="searchField"
                               :search-value="searchValue"
                               buttons-pagination
                               show-index
                >

                  <template #item-created_at="item">
                    {{ dayjs(item.created_at).format('DD-MM-YYYY') }}
                  </template>

                  <template #item-actions="item">
                    <CRFModal :itemInformation="item" @onSubmit="getPatientsFullList"/>
                  </template>
                </EasyDataTable>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>