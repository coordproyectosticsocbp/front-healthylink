<script setup>

import {computed, ref} from "vue";
import {toast} from "vue3-toastify";
import useLocalStorage from "@/composables/useLocalStorage.js";
import {useStore} from "vuex";

const store = useStore()
const clinicalSamples = useLocalStorage([], 'validateBatchObject')
const codeSampleInput = ref("")
const validateBatchStorage = window.localStorage.getItem('validateBatchObject')
const mainClinicalSamples = computed(() => store.state.clinicalSamples.clinicalSamples)

const addBatchItemToArray = () => {
  if (clinicalSamples.value.includes(codeSampleInput.value)) {
    toast.error('Ya existe un elemento con este código')
    //codeSampleInput.value = ""
    return false;
  }
  clinicalSamples.value.push(codeSampleInput.value)
  codeSampleInput.value = ""
  toast.success('Ítem agregado correctamente')
}

const saveBatchesToDB = () => {
  let arrayBatches = []
  if (validateBatchStorage) arrayBatches = JSON.parse(validateBatchStorage)

  const equalsValues = arrayBatches.every((obj, index) => compareObjects(obj, mainClinicalSamples.value[index]))
  if (equalsValues) {
    console.log('Los arrays contienen objetos iguales');
  } else {
    console.log('Los arrays contienen objetos diferentes');
  }
}

const compareObjects = (obj1, obj2) => {
  const prefixText = "MU"
  return obj1 === prefixText
      .concat(obj2.minv_formulario_id, "-", obj2.code_paciente, "-", obj2.sede_id, "-", obj2.user_id)
}

</script>

<template>
  <div>
    <button class="btn btn-outline-success rounded"
            data-bs-target="#validateBatchModal"
            data-bs-toggle="modal"
    >
      <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
      Crear Lote
    </button>
    <!-- Modal -->
    <div id="validateBatchModal"
         aria-hidden="true"
         aria-labelledby="exampleModalLabel"
         class="modal fade"
         data-bs-backdrop="static"
         data-bs-keyboard="false"
         tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="exampleModalLabel"
                class="modal-title fs-5"
            >
              Validación de Lote de Muestras
            </h1>
            <button aria-label="Close" class="btn" data-bs-dismiss="modal" type="button">
              <font-awesome-icon :icon="['fas', 'times']"/>
            </button>
          </div>
          <div class="modal-body">

            <div class="row mb-3">
              <div class="col">
                <form autocomplete="off" autofocus @submit.prevent="addBatchItemToArray">
                  <input v-model="codeSampleInput"
                         autofocus
                         class="form-control"
                         placeholder="Ingrese el código de la muestra"
                  />
                </form>

              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->

            <hr>

            <div class="row">
              <div class="col">
                <button v-for="(item, index) in clinicalSamples"
                        :key="item"
                        class="btn btn-outline-primary me-2 mb-2"
                >
                  {{ item }}<!---{{ item.code_paciente }}-1-{{ authUser.id }}-->

                  <font-awesome-icon :icon="['fas', 'times']" class="ms-2 text-danger"/>

                </button>
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->


          </div>
          <div class="modal-footer">
            <button class="btn btn-danger" data-bs-dismiss="modal" type="button">
              <font-awesome-icon :icon="['fas', 'times']"/>
              Cerrar
            </button>
            <button class="btn btn-success"
                    type="button"
                    @click.prevent="saveBatchesToDB"
            >
              <font-awesome-icon :icon="['fas', 'vial-virus']"/>
              Registrar Lote
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>