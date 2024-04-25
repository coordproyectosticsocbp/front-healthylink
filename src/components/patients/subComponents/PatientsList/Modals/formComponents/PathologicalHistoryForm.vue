<script setup>

import useLocalStorage from "@/composables/useLocalStorage.js";

const props = defineProps({
  itemIndexVal: Number
})

const pathologicalInfo = useLocalStorage(
    {
      patientPathologicalHistory: ''
    }, `pathologicalInfo-${props.itemIndexVal}`
)

/*const infoArray = ref([])
const savingButtonStatus = ref(false)
const pathologicalStorage = window.localStorage.getItem(`pathologicalInfo-${props.itemIndexVal}`)

const savePathologicalInfo = async () => {

  savingButtonStatus.value = true

  if (pathologicalStorage) {
    infoArray.value.push({
      fecha: dayjs().format('YYYY-MM-DD'),
      respuesta: JSON.parse(pathologicalStorage).patientPathologicalHistory,
      pregunta_id: 1
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
function clearFields() {
  pathologicalInfo.value.patientPathologicalHistory = ''
}

defineExpose({
  clearFields
})

</script>

<template>
  <div :id="`v-pills-patologicos-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-patologicos-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Antecedentes Patológicos
        </h6>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col">
        <form autocomplete="off">

          <div class="mb-3">
            <label class="form-label" for="pathologicalTextArea">Antecedentes:</label>
            <textarea id="pathologicalTextArea" v-model="pathologicalInfo.patientPathologicalHistory"
                      class="form-control"
                      placeholder="Antecedentes Patológicos"
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

    <!--    <div class="row">
          <div class="col">
            <textarea id="pathologicalTextArea" v-model="pathologicalInfo.patientPathologicalHistory"
                      class="form-control"
                      placeholder="Antecedentes Patológicos"
                      rows="5"
            />
          </div>
        </div>-->

  </div>
</template>

<style scoped>

</style>