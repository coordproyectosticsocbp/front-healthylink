<script setup>

import {ref} from "vue";
import useLocalStorage from "@/composables/useLocalStorage.js";
import {diagnosticImaging} from "@/utils/const/patientComplementaryInfo.js";
import dayjs from "dayjs";

const props = defineProps({
  itemIndexVal: Number
})

const initialValue = ref({
  imageDate: '',
  imageType: '',
  imageResult: ''
})

const imagesHistory = useLocalStorage([], `imagesHistory`)

const addItemToLabArray = () => {
  imagesHistory.value.push({...initialValue.value})
  initialValue.value = {
    imageDate: '',
    imageType: '',
    imageResult: ''
  }
}

const removeLabFromArray = (index) => {
  imagesHistory.value.splice(index, 1)
}

function clearFields() {
  imagesHistory.value = []
}

defineExpose({
  clearFields
})

</script>

<template>
  <div :id="`v-pills-imagen-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-imagen-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Imágenes Diagnósticas
        </h6>
      </div>
    </div>

    <hr>

    <div class="row mb-5">
      <div class="col">
        <!--        <textarea id="EvolutionTextArea" class="form-control"
                          placeholder="Evolución del Paciente"
                          rows="5"/>-->
        <form autocomplete="off" @submit.prevent="addItemToLabArray">
          <div class="row">
            <div class="col-11">
              <div class="row mb-2">
                <div class="col">
                  <label class="form-label" for="inputImageDate">Fecha:</label>
                  <input id="inputImageDate"
                         v-model="initialValue.imageDate"
                         :max="dayjs().format('YYYY-MM-DD')"
                         class="form-control"
                         required
                         type="date"
                  >
                </div>
                <div class="col">
                  <label class="form-label" for="inputImageType">Tipo:</label>
                  <!--                  diagnosticImaging-->
                  <select id="inputImageType"
                          v-model="initialValue.imageType"
                          class="form-select"
                          required
                  >
                    <option disabled selected value="">Seleccione una Opción</option>
                    <option v-for="item in diagnosticImaging" :key="item" :value="item.value">
                      {{ item.label }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <textarea id="diagnosticImagesTextArea" v-model="initialValue.imageResult"
                            class="form-control"
                            placeholder="Resultado de Imagen"
                            required
                            rows="3"
                  />
                </div>
              </div>
            </div>
            <div class="col-1 d-flex align-items-center">
              <button class="btn btn-sm rounded btn-outline-secondary"
                      title="Agregar nuevo registro"
                      type="submit"
              >
                <font-awesome-icon :icon="['fas', 'plus']"/>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Images List -->
    <div class="row">
      <div class="col">
        <h6 class="fw-bold mb-4">Listado de Imágenes: {{ imagesHistory.length }}</h6>
        <ul v-for="(item, index) in imagesHistory" :key="index">

          <li>
            <div class="row">
              <div class="col">
                <ul class="list-unstyled">
                  <li>
                    <p class="mb-0 fw-bold text-uppercase">
                      LABORATORIO # {{ index + 1 }}:
                    </p>

                    <ul class="list-unstyled">
                      <li>
                        <p class="mb-0">
                          Fecha:
                          <span>{{ item.imageDate }}</span>
                        </p>
                      </li>
                      <li>
                        <p class="mb-0">
                          Tipo:
                          <span>{{ item.imageType }}</span>
                        </p>
                      </li>
                      <li>
                        <p class="mb-0">
                          Resultado:
                          <span>{{ item.imageResult }}</span>
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="col text-end">
                <button class="btn btn-sm rounded btn-outline-danger" @click.prevent="removeLabFromArray(index)">
                  <font-awesome-icon :icon="['fas', 'trash']"/>
                </button>
              </div>
            </div>
          </li>

        </ul>

      </div>
    </div>
    <!-- End Images List -->

  </div>
</template>

<style scoped>

</style>