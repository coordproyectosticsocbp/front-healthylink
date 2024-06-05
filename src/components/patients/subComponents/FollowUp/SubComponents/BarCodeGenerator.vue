<script setup>

import {toRefs} from "vue";

const props = defineProps({
  itemId: Number,
  sampleCode: String
})
const {sampleCode} = toRefs(props)

const generatePatientBarCodes = () => {
  window.open(`https://mibcode.com/codigomuestra.php?code=${sampleCode.value}`, '_blank');
}

</script>

<template>
  <button :id="`btnCodeBar-${itemId}`"
          class="btn btn-sm rounded-pill btn-warning me-1"
          type="button"
          @click.prevent="generatePatientBarCodes"
  >
    <font-awesome-icon :icon="['fas', 'barcode']"/>
    Bar
  </button>
</template>

<style scoped>

</style>