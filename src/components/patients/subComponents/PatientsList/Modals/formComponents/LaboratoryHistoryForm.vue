<script setup>
import {laboratoriesOptions} from "@/utils/const/patientComplementaryInfo.js";
import {ref} from "vue";
import useLocalStorage from "@/composables/useLocalStorage.js";
import dayjs from "dayjs";

const props = defineProps({
  itemIndexVal: Number
})

const initialValue = ref({
  labDate: null,
  labType: null
})

const laboratoryHistory = useLocalStorage([], `laboratoryHistory-${props.itemIndexVal}`)

const addItemToLabArray = () => {
  laboratoryHistory.value.push({...initialValue.value})
  initialValue.value = {
    labDate: null,
    labType: null
  }
}

const removeLabFromArray = (index) => {
  laboratoryHistory.value.splice(index, 1)
}

function clearFields() {
  laboratoryHistory.value = []
}

defineExpose({
  clearFields
})

</script>

<template>
  <div :id="`v-pills-hematologicos-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-hematologicos-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Antecedentes de Laboratorios Hematológicos
        </h6>
      </div>
    </div>

    <hr>

    <div class="row mb-5">
      <div class="col">
        <form autocomplete="off" @submit.prevent="addItemToLabArray">

          <div class="row">

            <div class="col-3">
              <!--              <div class="mb-3">-->
              <!--                <label class="form-label" for="inputLabDate">Fecha:</label>-->
              <input id="inputLabDate"
                     v-model="initialValue.labDate"
                     :max="dayjs().format('YYYY-MM-DD')"
                     class="form-control"
                     required
                     type="date"
              >
              <!--              </div>-->
            </div>
            <div class="col-8 d-flex align-items-center">

              <div v-for="(item, index) in laboratoriesOptions" :key="index" class="form-check form-check-inline">
                <input :id="`inlineRadio1-${index}`" v-model="initialValue.labType"
                       :value="item.value"
                       class="form-check-input"
                       name="inlineRadioOptions"
                       required
                       type="radio"
                >
                <label :for="`inlineRadio1-${index}`" class="form-check-label">
                  {{ item.label }}
                </label>
              </div>

              <!--              <div v-for="(item, index) in laboratoriesOptions" :key="index" class="form-check form-check-inline">
                              <input :id="`inlineCheckbox-${index}`"
                                     v-model="initialValue[item.model]"
                                     class="form-check-input"
                                     type="checkbox"
                              >
                              <label :for="`inlineCheckbox-${index}`" class="form-check-label">{{ item.label }}</label>
                            </div>-->
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

    <!-- Laboratories List -->
    <div class="row">
      <div class="col">

        <h6 class="fw-bold mb-4">Listado de Laboratorios: {{ laboratoryHistory.length }}</h6>

        <ul v-for="(item, index) in laboratoryHistory" :key="index">

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
                          <span>{{ item.labDate }}</span>
                        </p>
                      </li>
                      <li>
                        <p class="mb-0">
                          Tipo:
                          <span>{{ item.labType }}</span>
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

    <!-- End Laboratories List -->

  </div>
</template>

<style scoped>

</style>