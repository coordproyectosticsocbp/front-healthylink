<script setup>
import {onMounted, ref} from 'vue'
import PatientService from '@/services/patients/Patient.service.js'
import {getError} from "@/utils/helpers/getError.js";
import {useLoading} from "vue-loading-overlay";

const headers = [
  {text: 'Fecha', value: 'created_at'},
  {text: 'Codigo muestra', value: 'id'},
  {text: 'Codigo paciente', value: 'code_paciente'},
  {text: 'Sede', value: 'sede_toma_muestra'},
  {text: 'Estado actual', value: 'ultimo_estado'},
  {text: 'Acciones', value: 'actions', sortable: false},
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
  try {
    const response = await PatientService.getfollowup()
    patients.value = response.data.data
    loader.hide()
  } catch (error) {
    loader.hide()
    errors.value = getError(error)
  }
}

const showDetailStatus = (item) => {

  console.log(item);

}

onMounted(getPatientsFullList)

</script>

<template>
  <div class="container-fluid" ref="fullPageContainer">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <EasyDataTable :headers="headers" :items="patients">
              <template #item-actions="item">
                <button @click="showDetailStatus(item.id)"  class="btn btn-primary btn-sm"> <font-awesome-icon :icon="['fas', 'eye']" /> Ver estados</button>
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
