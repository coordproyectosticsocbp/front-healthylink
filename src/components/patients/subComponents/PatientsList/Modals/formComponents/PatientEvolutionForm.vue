<script setup>

import useLocalStorage from "@/composables/useLocalStorage.js";

const props = defineProps({
  itemIndexVal: Number
})

const evolutionInfo = useLocalStorage(
    {
      patientEvolution: ''
    }, `evolutionInfo-${props.itemIndexVal}`
)

function clearFields() {
  evolutionInfo.value.patientEvolution = ''
}

defineExpose({
  clearFields
})

/*const infoArray = ref([])
const savingButtonStatus = ref(false)
const evolutionStorage = window.localStorage.getItem(`evolutionInfo-${props.itemIndexVal}`)

const saveEvolutionInfo = async () => {

  savingButtonStatus.value = true

  if (evolutionStorage) {
    infoArray.value.push({
      fecha: dayjs().format('YYYY-MM-DD'),
      respuesta: JSON.parse(evolutionStorage).patientEvolution,
      pregunta_id: 7
    })
  }

  const payload = {
    encuesta_id: props.itemIndexVal,
    user_id: 1,
    datos: infoArray.value
  }

  console.log(payload)

  PatientService.saveComplementaryInformation(payload)
      .then((response) => {
        if (response.data.statusCode !== 201) {
          savingButtonStatus.value = false
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
        } else {
          savingButtonStatus.value = false
          Swal.fire({
            icon: 'success',
            text: response.data.message
          })
        }
      })
      .catch((error) => {
        console.log(error)
        savingButtonStatus.value = false
        Swal.fire({
          icon: 'error',
          text: getError(error)
        })
      })
}*/

</script>

<template>
  <div :id="`v-pills-evolucion-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-evolucion-tab-${props.itemIndexVal}`"
       class="tab-pane fade show active"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Evolución
        </h6>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col">
        <form autocomplete="off">

          <div class="mb-3">
            <label class="form-label" for="EvolutionTextArea">Evolución:</label>
            <textarea id="EvolutionTextArea" v-model="evolutionInfo.patientEvolution"
                      class="form-control"
                      placeholder="Evolución del Paciente"
                      required
                      rows="5"
            />
          </div>

          <!--          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button :disabled="savingButtonStatus"
                              class="btn btn-sm btn-outline-success"
                              type="submit"
                      >
                        <span v-if="savingButtonStatus" aria-hidden="true" class="spinner-grow spinner-grow-sm"/>
                        <font-awesome-icon v-else :icon="['fas', 'floppy-disk']"/>
                        {{ savingButtonStatus ? 'Guardando...' : 'Guardar' }}
                      </button>
                    </div>-->

        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>