<script setup>

import {ref} from "vue";

const props = defineProps({
  itemIndexVal: Number
})

const initialValue = ref({
  drugName: '',
  drugDosage: 0,
  drugPresentation: '',
  drugConcentration: '',
})
const pharmacologicalHistory = ref([])

const addItemToPharmArray = () => {
  pharmacologicalHistory.value.push({...initialValue.value})
  initialValue.value = {
    drugName: '',
    drugDosage: 0,
    drugPresentation: '',
    drugConcentration: '',
  }
}

const removeDrugFromArray = (index) => {
  pharmacologicalHistory.value.splice(index, 1)
}

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
          Antecedentes Farmacológicos
        </h6>
      </div>
    </div>

    <hr>

    <div class="row mb-5">
      <div class="col">
        <form autocomplete="off" @submit.prevent="addItemToPharmArray">
          <div class="row">
            <div class="col-5">

              <input id="input-drugName" v-model="initialValue.drugName"
                     aria-label="First name"
                     class="form-control"
                     placeholder="Nombre Medicamento"
                     required
                     type="text"
              >
            </div>
            <div class="col-2">
              <input id="input-dosage" v-model="initialValue.drugDosage"
                     aria-label="Last name"
                     class="form-control"
                     min="1"
                     placeholder="Dosis"
                     type="number"
              >
            </div>
            <div class="col-2">
              <input id="input-presentation" v-model="initialValue.drugPresentation"
                     aria-label="Last name"
                     class="form-control"
                     placeholder="Presentación"
                     required
                     type="text">
            </div>
            <div class="col-2">
              <input id="input-concentration" v-model="initialValue.drugConcentration"
                     aria-label="Last name"
                     class="form-control"
                     placeholder="Concentración"
                     required
                     type="text">
            </div>
            <div class="col-1">
              <button class="btn btn-sm rounded btn-outline-secondary"
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

            <div class="d-flex drug-item-flex justify-content-between align-items-center">
              <p class="mb-0">{{ item.drugName.toUpperCase() }}</p>
              <p class="mb-0">{{ item.drugDosage }}</p>
              <p class="mb-0">{{ item.drugPresentation.toUpperCase() }}</p>
              <p class="mb-0">{{ item.drugConcentration.toUpperCase() }}</p>
              <button class="btn btn-sm rounded btn-outline-danger"
                      @click="removeDrugFromArray(index)"
              >
                <font-awesome-icon :icon="['fas', 'trash']"/>
              </button>
            </div>

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
