<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {useLoading} from "vue-loading-overlay";
import shelfAssignmentService from "@/services/shelfAssignment/shelfAssignment.service.js";
import {getError} from "@/utils/helpers/getError.js";

const store = useStore()
const authUser = computed(() => store.getters["auth/authUser"])
const sampleCode = ref(null)
const fullPage = ref(true)

/**
 * Expresiones regulares de validaciones
 * */
const regexSamples = /^MU[0-9]{1,9}-\w{1,11}-\d-\d$/

const $loading = useLoading({
  loader: 'dots',
  isFullPage: fullPage,
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
})

const shelfSampleAssignment = () => {

  const loader = $loading.show()

  const payload = {
    user_id: authUser.value.id,
    codigo_muestra: sampleCode.value,
    codigo_ubicacion: '1-1-2-A'
  }
  //CM5-FKHMMPLT-1-7
  //CM6-1RUJFAWI-1-7
  //samplesArray.value.push(payload)

  if (!sampleCode.value.length) {
    Swal.fire({
      icon: 'error',
      title: 'Verifica!',
      text: 'El campo de Muestras No puede estar vacío'
    })
    return false;
  } else {

    if (regexSamples.test(sampleCode.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Ooops!',
        text: 'El Código de Muestra NO cumple con el coincide con el patron'
      })
      return false;
    }
  }

  shelfAssignmentService.saveShelfSamplesAssignment(payload)
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
          sampleCode.value = ""
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
        <form autocomplete="off" @submit.prevent="shelfSampleAssignment">

          <div class="mb-5">
            <label class="form-label" for="inputSamplesCode">Código de Muestra:</label>
            <input id="inputSamplesCode"
                   v-model="sampleCode"
                   autofocus
                   class="form-control"
                   placeholder="Código de Muestra"
                   type="text"
            >
          </div>

          <hr>

          <div class="row">
            <div class="col text-end">
              <button class="btn btn-sm btn-outline-success"
                      type="submit"
              >
                <font-awesome-icon :icon="['fas', 'box']"/>
                Asignar Muestra
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