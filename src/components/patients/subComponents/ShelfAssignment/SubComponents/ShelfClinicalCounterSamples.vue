<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {useLoading} from "vue-loading-overlay";
import shelfAssignmentService from "@/services/shelfAssignment/shelfAssignment.service.js";
import {getError} from "@/utils/helpers/getError.js";

const store = useStore()
const authUser = computed(() => store.getters["auth/authUser"])
const counterSampleCode = ref(null)
const fullPage = ref(true)

/**
 * Expresiones regulares de validaciones
 * */
const regexCounterSamples = /^CM[0-9]{1,9}-\w{1,11}-\d-\d$/

//const samplesArray = ref([])

const $loading = useLoading({
  loader: 'dots',
  isFullPage: fullPage,
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
})

const shelfCounterSampleAssignment = () => {

  const loader = $loading.show()

  const payload = {
    user_id: authUser.value.id,
    codigo_muestra: counterSampleCode.value,
    codigo_ubicacion: '1-1-2-A'
  }
  //CM5-FKHMMPLT-1-7
  //CM6-1RUJFAWI-1-7
  //samplesArray.value.push(payload)

  if (!counterSampleCode.value.length) {
    Swal.fire({
      icon: 'error',
      title: 'Verifica!',
      text: 'El campo de ContraMuestra No puede estar vacío'
    })
    return false;
  } else {

    if (regexCounterSamples.test(counterSampleCode.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Ooops!',
        text: 'El Código de ContraMuestra NO cumple con el coincide con el patron'
      })
      return false;
    }
  }


  shelfAssignmentService.saveShelfCounterSamplesAssignment(payload)
      .then((response) => {
        if (response.data.statusCode !== 201) {
          loader.hide()
          Swal.fire({
            icon: 'error',
            title: 'Oooops!',
            text: response.data.message
          })
        } else {
          loader.hide()
          counterSampleCode.value = ""
          Swal.fire({
            icon: 'success',
            title: 'Perfectooo!',
            text: response.data.message
          })
        }
      })
      .catch((error) => {
        loader.hide()
        Swal.fire({
          icon: 'error',
          title: 'Oooops!',
          text: getError(error)
        })
      })

}

</script>

<template>

  <div>
    <div class="row mb-5">
      <div class="col text-center">
        <h5 class="text-uppercase fw-bolder">Asignación de Muestra a Estante</h5>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <form autocomplete="off" @submit.prevent="shelfCounterSampleAssignment">

          <div class="mb-3">
            <label class="form-label" for="inputCounterSamplesCode">Código de Contramuestra:</label>
            <input id="inputCounterSamplesCode"
                   v-model="counterSampleCode"
                   autofocus
                   class="form-control"
                   placeholder="Código de Contramuestra"
                   type="text"
            >
          </div>

          <div class="mb-5">
            <label class="form-label" for="selectShelf">Seleccionar Ubicación de Asignación:</label>
            <select id="selectShelf" class="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>

          <hr>

          <div class="row">
            <div class="col text-end">
              <button class="btn btn-sm btn-outline-success"
                      type="submit"
              >
                <font-awesome-icon :icon="['fas', 'warehouse']"/>
                Asignar ContraMuestra a Estante
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>

  </div>

</template>

<style scoped>

</style>