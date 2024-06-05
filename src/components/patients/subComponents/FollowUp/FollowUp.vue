<script setup>
import {onMounted, ref} from 'vue'
import PatientService from '@/services/patients/Patient.service.js'
import {getError} from "@/utils/helpers/getError.js";
import {useLoading} from "vue-loading-overlay";
import dayjs from "dayjs";
import TreeDetailView from "@/components/patients/subComponents/FollowUp/SubComponents/TreeDetailView.vue";
import BarCodeGenerator from "@/components/patients/subComponents/FollowUp/SubComponents/BarCodeGenerator.vue";

const headers = [
  {text: 'Codigo paciente', value: 'code_paciente'},
  {text: 'Codigo muestra', value: 'id'},
  {text: 'Sede', value: 'sede_toma_muestra'},
  {text: 'Fecha Creación', value: 'created_at'},
  {text: 'Estado actual', value: 'ultimo_estado'},
  {text: 'Acciones', value: 'actions'},
]

const patients = ref([])
const fullPage = ref(true)
const errors = ref(null)
const searchField = ref(["code_paciente", "sede_toma_muestra", "ultimo_estado"])
const searchValue = ref("")
//const offCanvasComponent = ref();

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
  try {
    const response = await PatientService.getfollowup()
    patients.value = response.data.data
    loader.hide()
  } catch (error) {
    loader.hide()
    errors.value = getError(error)
  }
}

/*const showDetailStatus = async (patientId) => {
  await offCanvasComponent.value.getTrackingDetail(patientId)
}*/

onMounted(getPatientsFullList)

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

                    <BarCodeGenerator :itemId="item.id" :sampleCode="item.code_muestra"/>

                    <TreeDetailView :itemId="item.id" :patientCode="item.code_paciente"/>

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
