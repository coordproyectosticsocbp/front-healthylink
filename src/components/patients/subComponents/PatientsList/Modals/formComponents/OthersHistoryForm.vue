<script setup>
import useLocalStorage from "@/composables/useLocalStorage.js";

const props = defineProps({
  itemIndexVal: Number
})

const othersInfo = useLocalStorage(
    {
      patientOtherInfo: ''
    }, `othersInfo`
)

function clearFields() {
  othersInfo.value.patientOtherInfo = ''
}

defineExpose({
  clearFields
})

</script>

<template>
  <div :id="`v-pills-otros-${props.itemIndexVal}`" :aria-labelledby="`v-pills-otros-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Otros Antecedentes
        </h6>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col">
        <form autocomplete="off">

          <div class="mb-3">
            <label class="form-label" for="EvolutionTextArea">Antecedentes:</label>

            <textarea id="othersTextArea" v-model="othersInfo.patientOtherInfo"
                      class="form-control"
                      placeholder="Otros Antecedentes"
                      required
                      rows="5"
            />
          </div>

          <!--          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button :disabled="savingButtonStatus"
                              class="btn btn-sm btn-outline-success"
                              type="button"
                      >
                        <span v-if="savingButtonStatus" aria-hidden="true" class="spinner-grow spinner-grow-sm"/>
                        <font-awesome-icon v-else :icon="['fas', 'floppy-disk']"/>
                        {{ savingButtonStatus ? 'Guardando...' : 'Guardar' }}
                      </button>
                    </div>-->

        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>