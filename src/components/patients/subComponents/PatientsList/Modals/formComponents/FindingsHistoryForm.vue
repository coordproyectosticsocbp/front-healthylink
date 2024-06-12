<script setup>

import useLocalStorage from "@/composables/useLocalStorage.js";

const props = defineProps({
  itemIndexVal: Number
})

const findingsInfo = useLocalStorage(
    {
      patientFindingsHistory: ''
    }, `findingsInfo`
)

function clearFields() {
  findingsInfo.value.patientFindingsHistory = ''
}

defineExpose({
  clearFields
})

</script>

<template>
  <div :id="`v-pills-findings-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-findings-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Hallazgos eCRF
        </h6>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col">
        <form autocomplete="off">

          <div class="mb-3">
            <label class="form-label" for="findingsTextArea">Hallazgos:</label>
            <textarea id="findingsTextArea" v-model="findingsInfo.patientFindingsHistory"
                      class="form-control"
                      placeholder="Hallazgos eCRF"
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
