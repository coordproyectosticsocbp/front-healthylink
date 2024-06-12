<script setup>

import useLocalStorage from "@/composables/useLocalStorage.js";
import {cie10Diseases} from "@/utils/const/cie10Diseases.js";
import {ref} from "vue";

const props = defineProps({
  itemIndexVal: Number
})

const pathology = ref('')
const pathologicalInfo = useLocalStorage([], `pathologicalInfo`)

const addItemToArray = () => {
  pathologicalInfo.value.push(pathology.value)
  pathology.value = ''
}

const removeDrugFromArray = (index) => {
  pathologicalInfo.value.splice(index, 1)
}

function clearFields() {
  pathologicalInfo.value = []
}

defineExpose({
  clearFields
})

</script>

<template>
  <div :id="`v-pills-patologicos-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-patologicos-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Patologicos (CIE 10)
        </h6>
      </div>
    </div>

    <hr>

    <div class="row mb-4">
      <div class="col">
        <form autocomplete="off" @submit.prevent="addItemToArray">
          <div class="row mb-5">
            <div class="col">
              <label class="form-label" for="pathologicalTextArea">Hallazgos:</label>
              <VueMultiselect
                  id="input-select-pathology"
                  v-model="pathology"
                  :close-on-select="true"
                  :options="cie10Diseases"
                  label="ci10"
                  placeholder="Selecciones una patología"
                  searchable
                  track-by="ci10"
              />
            </div>
            <!-- /.col -->
            <div class="col d-flex align-items-center">
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
      <h5 class="fw-bolder">Listado de patologías</h5>

      <ol v-if="pathologicalInfo.length">
        <li v-for="(item, index) in pathologicalInfo" :key="item.ci10">
          <div class="d-flex justify-content-between align-items-center">

            <p>{{ item.ci10 }}</p>

            <div>
              <button class="btn btn-sm rounded btn-outline-danger"
                      @click="removeDrugFromArray(index)"
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