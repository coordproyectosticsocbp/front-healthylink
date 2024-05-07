<script setup>

import {computed, onMounted, ref} from "vue";
import BatchService from "@/services/batchs/Batch.service.js";
import {useStore} from "vuex";
import {toast} from "vue3-toastify";
import {getError} from "@/utils/helpers/getError.js";
import {useLoading} from "vue-loading-overlay";

//const regex = /^MU-[0-9]{1,9}$/ -- Original
const fullPage = ref(true)
const regex = /^MU[0-9]{1,9}-\w{1,11}-\d-\d$/
const clinicalSamples = ref([])
const sampleCode = ref("")
const filter = ref("")
const errors = ref(null)
const store = useStore()
const authUser = computed(() => store.getters["auth/authUser"])

const $loading = useLoading({
  loader: 'dots',
  isFullPage: fullPage,
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
})

const filteredItems = computed(() => {
  return filter.value
      ? clinicalSamples.value.filter(
          item => {
            return item.toLowerCase().includes(filter.value.toLowerCase());
          }) : clinicalSamples.value
})

const getTemporalBatches = async () => {
  const loader = $loading.show()
  try {
    const response = await BatchService.getTemporalBatches(authUser.value.id, 1)
    if (response) {
      clinicalSamples.value = response.data.data.temp_Muestras
      loader.hide()
    } else {
      toast.error(response.data.message)
      loader.hide()
    }
  } catch (error) {
    loader.hide()
    errors.value = getError(error)
  }
}
const addItemToClinicalSamplesArray = () => {
  if (!sampleCode.value.length) {
    alert('Código de la muestra vacía')
    return false;
  }
  if (!regex.test(sampleCode.value)) {
    alert('El código no cumple el patrón requerido')
    return false;
  }

  const payload = {
    user_id: authUser.value.id,
    codigo_muestra: sampleCode.value,
    tipo_muestra: 'MUESTRA'
  }

  BatchService.saveBatchTemporal(payload)
      .then((response) => {
        if (response.data.statusCode !== 201) {
          toast.error(response.data.message)
        } else {
          toast.success(response.data.message)
          clinicalSamples.value.push(sampleCode.value)
          sampleCode.value = ""
        }
      })
      .catch((error) => {
        toast.error(getError(error))
      })
}

const removeItemToClinicalSamplesArray = (index) => {
  console.log(index)
}

const saveRealBatch = async () => {

  if (!clinicalSamples.value.length) {
    toast.error('Objeto de muestras vacio, Valide')
    return false;
  }

  const loader = $loading.show()

  const payload = {
    user_id: authUser.value.id,
    muestras: []
  }

  clinicalSamples.value.map((item) => {
    payload.muestras.push({
      muestra_id: item.minv_formulario_id
    })
  })

  BatchService.saveRealBatch(payload)
      .then((response) => {
        if (response.data.statusCode !== 201) {
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
          loader.hide()
        } else {
          Swal.fire({
            icon: 'success',
            text: response.data.message
          })
          clinicalSamples.value = []
          loader.hide()
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          text: getError(error)
        })
        loader.hide()
      })

}

onMounted(getTemporalBatches)


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
            <div class="col-10 d-flex align-items-center">
              <input v-model="filter"
                     class="form-control me-5"
                     placeholder="Buscar código..."
                     type="text"
                     @keyup.prevent="filterValues"
              >
            </div>
            <div class="col-2 d-flex align-items-center">
              <button class="btn btn-outline-success rounded"
                      @click="saveRealBatch"
              >
                <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
                Crear Lote
              </button>
            </div>
          </div>

          <hr>

          <div class="row">
            <div class="col">
              <button v-for="(item, index) in filteredItems"
                      :key="item"
                      class="btn btn-outline-primary me-2 mb-2"
                      @click.prevent="removeItemToClinicalSamplesArray(index)"
              >
                MU{{ item.minv_formulario_id }}-{{ item.code_paciente }}-1-{{ authUser.id }}

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