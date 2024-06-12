<script setup>

import {ref} from "vue";
import useLocalStorage from "@/composables/useLocalStorage.js";
import {drugsList} from "@/utils/const/drugsList.js";
import {everyHowOften} from "@/utils/const/everyHowOften.js";

const props = defineProps({
  itemIndexVal: Number
})

const initialValue = ref({
  drugName: '',
  drugDosage: 0,
  drugPresentation: '',
  drugConcentration: '',
  everyHowOften: null
})
const pharmacologicalHistory = useLocalStorage([], `pharmacologicalHistory`)

const addItemToPharmArray = () => {
  //pharmacologicalHistory.value.push({...initialValue.value})
  pharmacologicalHistory.value.push({
    drugName: initialValue.value.drugName[0].DescripcionComercial,
    drugDosage: initialValue.value.drugDosage,
    everyHowOften: initialValue.value.everyHowOften,
    drugPresentation: '',
    drugConcentration: '',
  })
  initialValue.value = {
    drugName: '',
    drugDosage: 0,
    drugPresentation: '',
    drugConcentration: '',
    everyHowOften: '',
  }
}

const removeDrugFromArray = (index) => {
  pharmacologicalHistory.value.splice(index, 1)
}

function clearFields() {
  pharmacologicalHistory.value = []
}

defineExpose({
  clearFields
})

</script>

<template>
  <div :id="`v-pills-farmacologicos-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-farmacologicos-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Resultados Farmacológicos
        </h6>
      </div>
    </div>

    <hr>

    <div class="row mb-5">
      <div class="col">
        <form autocomplete="off" @submit.prevent="addItemToPharmArray">
          <div class="row">
            <div class="col-5">
              <label class="form-label" for="input-drug">Medicamento:</label>
              <VueMultiselect
                  id="input-drug"
                  v-model="initialValue.drugName"
                  :close-on-select="true"
                  :multiple="true"
                  :options="drugsList"
                  label="DescripcionComercial"
                  placeholder="Pick some"
                  track-by="DescripcionComercial"
              />
            </div>
            <div class="col-2">
              <label class="form-label" for="input-dosage">Dosis:</label>
              <input id="input-dosage" v-model="initialValue.drugDosage"
                     aria-label="Last name"
                     class="form-control"
                     placeholder="Dosis"
                     type="number"
              >
            </div>
            <div class="col-3">
              <label class="form-label" for="input7">Cada cuanto:</label>
              <select id="input7" v-model="initialValue.everyHowOften"
                      class="form-select"
                      required
              >
                <option :value="null" selected>Seleccione cada cuanto...</option>
                <option v-for="gender in everyHowOften"
                        :key="gender.value"
                        :value="gender.value"
                        v-text="gender.name"
                />
              </select>
            </div>
            <div class="col-2 d-flex align-items-center justify-content-end">
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

    <!-- Drugs List -->
    <div class="row">
      <div class="col">

        <h6 class="fw-bold">Listado de Medicamentos: {{ pharmacologicalHistory.length }}</h6>

        <ul>
          <li v-for="(item, index) in pharmacologicalHistory" :key="index" class="mb-1">

            <div class="row">
              <div class="col-6 fw-bolder">MEDICAMENTO</div>
              <div class="col-2 text-center fw-bolder">DOSIS</div>
              <div class="col-2 text-center fw-bolder">CADA CUANTO</div>
              <div class="col-2 text-center fw-bolder">OPCIONES</div>
            </div>

            <div class="row mb-3">
              <div class="col-6">
                <p class="mb-0">{{ item.drugName }}</p>
              </div>
              <div class="col-2 text-center">
                <p class="mb-0">{{ item.drugDosage }}</p>
              </div>
              <div class="col-2 text-center">
                <p class="mb-0">{{ item.everyHowOften }}</p>
              </div>
              <div class="col-2 text-center">
                <button class="btn btn-sm rounded btn-outline-danger"
                        @click="removeDrugFromArray(index)"
                >
                  <font-awesome-icon :icon="['fas', 'trash']"/>
                </button>
              </div>
            </div>

            <!--            <div class="d-flex drug-item-flex justify-content-between align-items-center">
                          <p class="mb-0">{{ item.drugName }}</p>
                          <p class="mb-0">{{ item.drugDosage }}</p>
                          &lt;!&ndash;              <p class="mb-0">{{ item.drugPresentation.toUpperCase() }}</p>
                                        <p class="mb-0">{{ item.drugConcentration.toUpperCase() }}</p>&ndash;&gt;
                          <button class="btn btn-sm rounded btn-outline-danger"
                                  @click="removeDrugFromArray(index)"
                          >
                            <font-awesome-icon :icon="['fas', 'trash']"/>
                          </button>
                        </div>-->

          </li>
        </ul>

      </div>
    </div>

    <!-- End Drugs List -->

  </div>
</template>

<style scoped>
.drug-item-flex {
  flex: 1 1 0;
}
</style>
