<script setup>

import {computed, ref} from "vue";

const regex = /^MU-[0-9]{1,9}$/
const clinicalSamples = ref([])
const sampleCode = ref("")
const filter = ref("")

const filteredItems = computed(() => {
  return filter.value
      ? clinicalSamples.value.filter(
          item => {
            return item.toLowerCase().includes(filter.value.toLowerCase());
          }) : clinicalSamples.value
})

const addItemToClinicalSamplesArray = () => {
  if (!sampleCode.value.length) {
    alert('Código de la muestra vacía')
    return false;
  }
  if (!regex.test(sampleCode.value)) {
    alert('El código no cumple el patrón requerido')
    return false;
  }
  clinicalSamples.value.push(sampleCode.value)
  sampleCode.value = ""
}

const removeItemToClinicalSamplesArray = (index) => {
  console.log(index)
}

</script>

<template>
  <div class="row">
    <div class="col">

      <div class="row mb-5">
        <div class="col">
          <h5 class="text-center text-uppercase fw-bold">
            Registro de muestras para creación de lote
          </h5>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-4 border-end">

          <form autocomplete="off">

            <div class="mb-3">
              <label class="form-label" for="sampleCode">Código de muestra:</label>
              <input id="sampleCode"
                     v-model="sampleCode"
                     autofocus
                     class="form-control"
                     placeholder="Código Muestra, MU-XX"
              />
            </div>

            <div class="d-grid gap-2 d-lg-flex justify-content-md-end">
              <button class="btn btn-primary btn-sm"
                      type="button"
                      @click="addItemToClinicalSamplesArray"
              >
                <font-awesome-icon :icon="['fas', 'plus']"/>
                Agregar
              </button>
            </div>

          </form>

        </div>
        <div class="col-xl-8">

          <div class="row mb-3">
            <div class="col">
              <input v-model="filter"
                     class="form-control"
                     placeholder="Buscar código..."
                     type="text"
                     @keyup.prevent="filterValues"
              >
            </div>
          </div>

          <hr>

          <div class="row">
            <div class="col">
              <button v-for="(item, index) in filteredItems"
                      :key="item"
                      class="btn btn-outline-primary me-2"
                      @click.prevent="removeItemToClinicalSamplesArray(index)"
              >
                {{ item }}

                <font-awesome-icon :icon="['fas', 'times']" class="ms-2 text-danger"/>

              </button>
            </div>
          </div>

        </div>
      </div>


    </div>


  </div>
</template>

<style scoped>

</style>