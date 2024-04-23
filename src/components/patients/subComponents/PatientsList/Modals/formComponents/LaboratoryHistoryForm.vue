<script setup>
import {laboratoriesOptions} from "@/utils/const/patientComplementaryInfo.js";

const props = defineProps({
  itemIndexVal: Number
})
</script>

<template>
  <div :id="`v-pills-laboratorios-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-laboratorios-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Antecedentes de Laboratorios
        </h6>
      </div>
    </div>

    <hr>

    <div class="row mb-5">
      <div class="col">
        <form autocomplete="off">

          <div class="row">

            <div class="col-3">
              <div class="mb-3">
                <label class="form-label" for="inputLabDate">Fecha:</label>
                <input id="inputLabDate"
                       class="form-control"
                       type="date"
                >
              </div>
            </div>
            <div class="col-8 d-flex align-items-center">
              <div v-for="(item, index) in laboratoriesOptions" :key="index" class="form-check form-check-inline">
                <input :id="`inlineCheckbox-${index}`"
                       :value="item.value"
                       class="form-check-input"
                       type="checkbox"
                >
                <label :for="`inlineCheckbox-${index}`" class="form-check-label">{{ item.label }}</label>
              </div>
            </div>
            <div class="col-1">

            </div>
          </div>


        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>