<script setup>

const props = defineProps({
  itemIndexVal: Number
})

</script>

<template>
  <div :id="`v-pills-evolucion-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-evolucion-tab-${props.itemIndexVal}`"
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
                    <textarea id="EvolutionTextArea" class="form-control"
                              placeholder="Evolución del Paciente"
                              rows="5"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>