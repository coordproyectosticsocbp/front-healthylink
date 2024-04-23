<script setup>
const props = defineProps({
  itemIndexVal: Number
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
                    <textarea id="othersTextArea" class="form-control"
                              placeholder="Otros Antecedentes"
                              rows="5"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>