<script setup>

import useLocalStorage from "@/composables/useLocalStorage.js";

const props = defineProps({
  itemIndexVal: Number
})

const pathologicalInfo = useLocalStorage(
    {
      patientPathologicalHistory: ''
    }, `pathologicalInfo-${props.itemIndexVal}`
)

function clearFields() {
  pathologicalInfo.value.patientPathologicalHistory = ''
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
          Hallazgos eCRF
        </h6>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col">
        <form autocomplete="off">

          <div class="mb-3">
            <label class="form-label" for="pathologicalTextArea">Hallazgos:</label>
            <textarea id="pathologicalTextArea" v-model="pathologicalInfo.patientPathologicalHistory"
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