<script setup>

const props = defineProps({
  itemIndexVal: Number
})

</script>

<template>
  <div :id="`v-pills-patologicos-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-patologicos-tab-${props.itemIndexVal}`"
       class="tab-pane fade show active"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Antecedentes Patológicos
        </h6>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col">
                    <textarea id="pathologicalTextArea" class="form-control"
                              placeholder="Antecedentes Patológicos"
                              rows="5"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>