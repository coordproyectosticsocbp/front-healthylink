<script setup>
import {computed, ref} from "vue";
import BatchService from "@/services/batchs/Batch.service.js";
import {useStore} from "vuex";
import {toast} from "vue3-toastify";
import {getError} from "@/utils/helpers/getError.js";
import {useLoading} from "vue-loading-overlay";

const fullPage = ref(true)
const regex = /^MU([0-9]{1,9})?-\w{1,11}-\d{1,5}-\d{1,5}$/
const authUser = computed(() => store.getters["auth/authUser"])
const clinicalSamples = computed(() => store.state.clinicalSamples.clinicalSamples)
const sampleCode = ref("")
const filter = ref("")
const headquarter = ref(null)
//const errors = computed(() => store.state.clinicalSamples.error)
const store = useStore()

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
  const prefixText = "MU"
  return filter.value
      ? clinicalSamples.value.filter(
          item => {
            return prefixText
                .concat(item.code_paciente, "-", item.sede_id, "-", item.user_id)
                .toLowerCase().includes(filter.value.toLowerCase());
          }) : clinicalSamples.value
})
const headquartersList = computed(() => {
  const headquarterStorage = window.localStorage.getItem('headquartersList')
  let headquarterInfo = null
  if (headquarterStorage) headquarterInfo = JSON.parse(headquarterStorage)
  return headquarterInfo
})

const getTemporalBatches = () => {
  const loader = $loading.show()
  try {
    const payload = {
      user_id: authUser.value.id,
      sedes_toma_muestras_id: headquarter.value
    }

    store.dispatch('clinicalSamples/getTemporalBatches', payload)
        .then(() => loader.hide())
        .catch(() => loader.hide())
        .finally(() => loader.hide())
  } catch (e) {
    Swal.fire({
      icon: 'error',
      text: e
    })
    loader.hide()
  }
}
const addItemToClinicalSamplesArray = () => {
  if (!sampleCode.value.length) {
    alert('Código de la muestra vacía')
    return false;
  }
  if (!regex.test(sampleCode.value)) {
    alert('El código no cumple el patrón requerido para Muestra')
    return false;
  }

  const loader = $loading.show()

  const payload = {
    user_id: authUser.value.id,
    codigo_muestra: sampleCode.value,
    tipo_muestra: 'MUESTRA'
  }

  BatchService.saveBatchTemporal(payload)
      .then((response) => {
        if (response.data.statusCode !== 201) {
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
          loader.hide()
        } else {
          getTemporalBatches()
          sampleCode.value = ""
          document.getElementById('sampleCode').focus()
          toast.success(response.data.message)
          loader.hide()
        }
      })
      .catch((error) => {
        toast.error(getError(error))
        loader.hide()
      })
}
const removeItemToClinicalSamplesArray = (id_encuesta, tipo_muestra) => {

  const loader = $loading.show()
  const payload = {
    minv_formulario_id: id_encuesta,
    tipo_muestra: tipo_muestra.toString()
  }

  console.log(payload)

  BatchService.deleteBatchFromTemporal(payload)
      .then((response) => {
        if (response.data.statusCode !== 200) {
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
          loader.hide()
        } else {
          getTemporalBatches()
          Swal.fire({
            icon: 'success',
            text: response.data.message
          })
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

//onMounted(getTemporalBatches)
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
        <div class="col">
          <form autocomplete="off" @change.prevent="getTemporalBatches">
            <div class="mb-3">
              <label class="form-label" for="disabledSelect">
                Sede actual:
              </label>
              <select id="disabledSelect" v-model="headquarter" class="form-select">
                <option :value="null" disabled>Seleccione la sede</option>
                <option v-for="(item, index) in headquartersList"
                        :key="item.id"
                        :value="item.id"
                >
                  {{ index + 1 }}. {{ item.nombre }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->

      <hr>

      <div class="row">
        <div class="col-xl-4 border-end">

          <form autocomplete="off" @submit.prevent="addItemToClinicalSamplesArray">

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
                      type="submit"
              >
                <font-awesome-icon :icon="['fas', 'plus']"/>
                Agregar
              </button>
            </div>

          </form>

        </div>
        <div class="col-xl-8">

          <div class="row mb-3">
            <div class="col-12 d-flex align-items-center">
              <input v-model="filter"
                     class="form-control"
                     placeholder="Buscar Muestra por código..."
                     type="text"
              >
            </div>
            <!--            <div class="col-2 d-flex align-items-center">
                          <ValidateBatchModal/>
                        </div>-->
          </div>

          <hr>

          <div class="row">
            <div class="col">
              <button v-for="item in filteredItems"
                      :key="item.minv_formulario_id"
                      class="btn btn-outline-primary me-2 mb-2"
                      @click.prevent="removeItemToClinicalSamplesArray(item.minv_formulario_id, 'MUESTRA')"
              >
                MU-{{ item.code_paciente }}-{{ item.sede_id }}-{{ item.user_id }}

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