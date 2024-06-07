<script setup>

import {ref, toRefs} from "vue";

/* Getting Props */
const props = defineProps({
  itemIndexVal: Number
})
const {itemIndexVal} = toRefs(props)
/*
const localStorageKey = `evolutionInfo-${itemIndexVal.value}`
*/

/* Form Refs */
const patientEvolution = ref('')

/*
/!*const evolutionInfo = useLocalStorage(
    {
      patientEvolution: ''
    }, localStorageKey
)*!/

const saveTemporaryRecord = () => {

  if (patientEvolution.value.length > 1)
    window.localStorage.setItem(localStorageKey, JSON.stringify({patientEvolution: patientEvolution.value}))

}
*/

function clearFields() {
  patientEvolution.value = ''
}

defineExpose({
  clearFields
})

</script>

<template>
  <div :id="`v-pills-evolucion-${itemIndexVal}`"
       :aria-labelledby="`v-pills-evolucion-tab-${itemIndexVal}`"
       class="tab-pane fade show active"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Evolución
        </h6>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col">
        <form autocomplete="off" @keyup.prevent="saveTemporaryRecord">

          <div class="mb-3">
            <label class="form-label" for="EvolutionTextArea">Evolución:</label>
            <textarea id="EvolutionTextArea" v-model="patientEvolution"
                      :placeholder="`Evolución del Paciente--${itemIndexVal}`"
                      class="form-control"
                      required
                      rows="5"
            />
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>