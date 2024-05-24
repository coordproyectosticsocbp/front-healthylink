<script setup>
import {computed, ref} from "vue";
import BatchService from "@/services/batchs/Batch.service.js";
import {useStore} from "vuex";
import {toast} from "vue3-toastify";
import {getError} from "@/utils/helpers/getError.js";
import {useLoading} from "vue-loading-overlay";

const fullPage = ref(true)
const regex = /^CM[0-9]{1,9}-\w{1,11}-\d-\d$/
const authUser = computed(() => store.getters["auth/authUser"])
const clinicalCounterSamples = computed(() => store.state.clinicalCounterSamples.clinicalCounterSamples)
const counterSampleCode = ref("")
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
  const prefixText = "CM"
  return filter.value
      ? clinicalCounterSamples.value.filter(
          item => {
            return prefixText
                .concat(item.minv_formulario_id, "-", item.code_paciente, "-", item.sede_id, "-", item.user_id)
                .toLowerCase().includes(filter.value.toLowerCase());
          }) : clinicalCounterSamples.value
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
    store.dispatch('clinicalCounterSamples/getTemporalCounterSamplesBatches', payload)
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
const addItemToClinicalCounterSamplesArray = () => {
  if (!counterSampleCode.value.length) {
    alert('Código de la ContraMuestra vacía')
    return false;
  }
  if (!regex.test(counterSampleCode.value)) {
    alert('El código no cumple el patrón requerido para ContraMuestra')
    return false;
  }

  const loader = $loading.show()

  const payload = {
    user_id: authUser.value.id,
    codigo_muestra: counterSampleCode.value,
    tipo_muestra: 'CONTRAMUESTRA'
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
          counterSampleCode.value = ""
          document.getElementById('counterSampleCode').focus()
          toast.success(response.data.message)
          loader.hide()
        }
      })
      .catch((error) => {
        toast.error(getError(error))
        loader.hide()
      })
}
const removeItemToClinicalCounterSamplesArray = (id_encuesta, tipo_muestra) => {

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
            Registro de ContraMuestras para creación de lote
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

          <form autocomplete="off" @submit.prevent="addItemToClinicalCounterSamplesArray">

            <div class="mb-3">
              <label class="form-label" for="counterSampleCode">Código de la ContraMuestra:</label>
              <input id="counterSampleCode"
                     v-model="counterSampleCode"
                     autofocus
                     class="form-control"
                     placeholder="Código ContraMuestra, CM-XX"
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
                     placeholder="Buscar ContraMuestra por código..."
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
              <button v-for="(item, index) in filteredItems"
                      :key="item"
                      class="btn btn-outline-primary me-2 mb-2"
                      @click.prevent="removeItemToClinicalCounterSamplesArray(item.minv_formulario_id, 'CONTRAMUESTRA')"
              >
                CM{{ item.minv_formulario_id }}-{{ item.code_paciente }}-1-{{ authUser.id }}

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