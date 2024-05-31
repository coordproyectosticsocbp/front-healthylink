<script setup>
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import {useLoading} from "vue-loading-overlay";
import shelfAssignmentService from "@/services/shelfAssignment/shelfAssignment.service.js";
import {getError} from "@/utils/helpers/getError.js";

const tempBoxSponsor = ref([]);

const errors = ref(null);
const store = useStore()
const authUser = computed(() => store.getters["auth/authUser"])
const sampleCode = ref("")
//const shelfCode = ref("")
const fullPage = ref(true)

/**
 * Expresiones regulares de validaciones
 * */
const regexSamples = /^MU([0-9]{1,9})?-\w{1,20}-\d-\d$/

const $loading = useLoading({
  loader: 'dots',
  isFullPage: fullPage,
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
})

const loadTempBoxSponsor = async () => {
  const loader = $loading.show();
  try {
    const response = await shelfAssignmentService.getTempSponsorBox([], 1);
    console.log(response.data.data);
    tempBoxSponsor.value = response.data.data;
    loader.hide();
  } catch (error) {
    loader.hide();
    errors.value = getError(error);
  }
};


onMounted(loadTempBoxSponsor);

const shelfSampleAssignment = () => {

  const loader = $loading.show()

  //CM5-FKHMMPLT-1-7
  //CM6-1RUJFAWI-1-7
  //samplesArray.value.push(payload)

  //if (!sampleCode.value.length || !shelfCode.value.length) {
  if (!sampleCode.value.length) {
    Swal.fire({
      icon: 'error',
      title: 'Verifica!',
      text: 'El campo de Muestras o de Ubicación No puede estar vacío'
    })
    loader.hide()
    return false
  }

  if (!regexSamples.test(sampleCode.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Ooops!',
      text: 'El Código de Muestra NO cumple con el coincide con el patron'
    })
    loader.hide()
    return false
  } else {

    const payload = {
      user_id: authUser.value.id,
      codigo_muestra: sampleCode.value,
      ubicacion_bio_bancos: 1
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
}

const sendBoxSponsor = () => {

  const payload = {
    user_id: authUser.value.id,
    ubicacionbiobanco_id: 1
  }


  Swal.fire({
    title: "¿Desea enviar las muestras al sponsor?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Si",
    denyButtonText: `No`
  }).then((result) => {

    if (result.isConfirmed) {

      const loader = $loading.show()

      shelfAssignmentService.sendBoxSponsor(payload)
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
              tempBoxSponsor.value = [];
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
    } /*else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }*/
  });
  /*


*/
}

</script>

<template>
  <div>

    <div class="row mb-3">
      <div class="col text-center">
        <h5 class="text-uppercase fw-bolder">Asignación de Muestra a Estante</h5>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <form autocomplete="off" @submit.prevent="shelfSampleAssignment">

          <div class="mb-3">
            <label class="form-label" for="inputSamplesCode">Código de Muestra:</label>
            <input id="inputSamplesCode"
                   v-model="sampleCode"
                   autofocus
                   class="form-control"
                   placeholder="Código de Muestra"
                   required
                   type="text"
            >
          </div>

          <!--          <div class="mb-3">
                      <label class="form-label" for="inputShelfCode">Seleccionar Ubicación de Asignación:</label>
                      <input id="inputShelfCode"
                             v-model="shelfCode"
                             class="form-control"
                             placeholder="Código de ubicación ContraMuestra"
                             type="text"
                      >
                    </div>-->

          <hr>

          <div class="row">
            <div class="col text-end">
              <button :disabled="!sampleCode.length"
                      class="btn btn-sm btn-outline-success"
                      type="submit"
              >
                <font-awesome-icon :icon="['fas', 'box']"/>
                Asignar Muestra
              </button>
            </div>
          </div>

        </form>
        <hr>
        <form autocomplete="off" @submit.prevent="sendBoxSponsor">
          <div class="row">
            <div class="col">
              <button v-if="tempBoxSponsor.length > 0" class="btn btn-sm btn-outline-success  me-2 mb-2"
                      type="submit"
              >
                <font-awesome-icon :icon="['fas', 'plane-departure']"/>
                Enviar muestras a sponsor
              </button>

              <button v-for="(sponsor, index) in tempBoxSponsor" :key="index" class="btn btn-outline-primary me-2 mb-2">
                {{ sponsor }}
                <!--<font-awesome-icon :icon="['fas', 'times']" class="ms-2 text-danger"/> -->
              </button>
              <br>
            </div>
          </div>
        </form>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>