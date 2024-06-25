<script setup>

import useLocalStorage from "@/composables/useLocalStorage.js";
import {ref} from "vue";
import {toast} from "vue3-toastify";
import {LaboratoriesList} from "@/utils/const/LaboratoriesList.js";

const props = defineProps({
  itemIndexVal: Number
})

const initialValue = ref({
  laboratoryDate: '',
  laboratoryName: '',
  laboratoryValue: ''
})
const laboratoriesInfo = useLocalStorage([], `othersLaboratoriesInfo`)

const addItemToArray = () => {

  if (!initialValue.value.laboratoryDate || !initialValue.value.laboratoryName || !initialValue.value.laboratoryValue) {
    toast.error('Debe completar las variables del formulario!')
    return
  }

  laboratoriesInfo.value.push({
    laboratoryDate: initialValue.value.laboratoryDate,
    laboratoryName: initialValue.value.laboratoryName.laboratorios,
    laboratoryValue: initialValue.value.laboratoryValue
  })
  initialValue.value = {
    laboratoryDate: '',
    laboratoryName: '',
    laboratoryValue: ''
  }
}

const removeLabFromArray = (index) => {
  laboratoriesInfo.value.splice(index, 1)
}

function clearFields() {
  laboratoriesInfo.value = []
}

defineExpose({
  clearFields
})

</script>

<template>
  <div :id="`v-pills-otrosLabs-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-otrosLabs-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          OTROS LABORATORIOS
        </h6>
      </div>
    </div>

    <hr>

    <div class="row mb-4">
      <div class="col">
        <form autocomplete="off" @submit.prevent="addItemToArray">
          <div class="row mb-5">

            <div class="col-2">
              <label class="form-label" for="OthersLaboratoriesDate">Fecha:</label>
              <input id="OthersLaboratoriesDate" v-model="initialValue.laboratoryDate" class="form-control"
                     type="date"/>
            </div>
            <!-- /.col -->

            <div class="col-6">
              <label class="form-label" for="OthersLaboratoriesSelect">Laboratorio:</label>
              <VueMultiselect
                  id="OthersLaboratoriesSelect"
                  v-model="initialValue.laboratoryName"
                  :close-on-select="true"
                  :options="LaboratoriesList"
                  label="laboratorios"
                  placeholder="Selecciones el laboratorio"
                  searchable
                  track-by="laboratorios"
              />
            </div>
            <!-- /.col -->
            <div class="col-3">
              <label class="form-label" for="OthersLaboratoriesValue">Resultado:</label>
              <input id="OthersLaboratoriesValue" v-model="initialValue.laboratoryValue" class="form-control"
                     placeholder="Valor Resultado"
                     type="text"/>
            </div>
            <!-- /.col -->
            <div class="col-1 d-flex justify-content-center align-items-center">
              <button
                  class="btn btn-sm btn-outline-secondary rounded-pill"
                  type="submit"
              >
                <font-awesome-icon :icon="['fas', 'plus']"/>
              </button>
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->

        </form>
      </div>
    </div>

    <div class="mb-3">
      <h5 class="fw-bolder">Listado de laboratorios</h5>

      <ol v-if="laboratoriesInfo.length">
        <li v-for="(item, index) in laboratoriesInfo" :key="item.ci10">

          <div class="row">
            <div class="col-6 fw-bolder">LABORATORIO</div>
            <div class="col-2 fw-bolder">FECHA</div>
            <div class="col-2 text-center fw-bolder">VALOR</div>
            <div class="col-2 text-end fw-bolder">OPCIONES</div>
          </div>

          <div class="row mb-3">
            <div class="col-6">
              <p class="mb-0">{{ item.laboratoryName }}</p>
            </div>
            <div class="col-2">
              <p class="mb-0">{{ item.laboratoryDate }}</p>
            </div>
            <div class="col-2 text-center">
              <p class="mb-0">{{ item.laboratoryValue }}</p>
            </div>
            <div class="col-2 text-end">
              <button class="btn btn-sm rounded btn-outline-danger"
                      @click="removeLabFromArray(index)"
              >
                <font-awesome-icon :icon="['fas', 'trash']"/>
              </button>
            </div>
          </div>
        </li>
      </ol>

    </div>

  </div>
</template>

<style scoped>

</style>