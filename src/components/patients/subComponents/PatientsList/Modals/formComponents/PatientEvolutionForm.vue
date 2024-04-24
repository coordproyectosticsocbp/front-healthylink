<script setup>

import useLocalStorage from "@/composables/useLocalStorage.js";
import dayjs from "dayjs";
import PatientService from "@/services/patients/Patient.service.js";
import {ref} from "vue";

const props = defineProps({
  itemIndexVal: Number
})

const evolutionInfo = useLocalStorage(
    {
      patientEvolution: ''
    }, `evolutionInfo-${props.itemIndexVal}`
)
const infoArray = ref([])
const evolutionStorage = window.localStorage.getItem(`evolutionInfo-${props.itemIndexVal}`)

const saveEvolutionInfo = async () => {

  let infoObject = null

  if (evolutionStorage) {
    infoObject = JSON.parse(evolutionStorage)
    infoArray.value.push({
      fecha: dayjs().format('YYYY-MM-DD'),
      respuesta: infoObject.patientEvolution,
      pregunta_id: 7
    })
  }
  //console.log(infoArray)

  const payload = {
    encuesta_id: props.itemIndexVal,
    user_id: 1,
    datos: infoArray.value
  }

  console.log(payload)
  PatientService.saveComplementaryInformation(payload)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

}

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

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-sm btn-outline-success"
                    type="button"
                    @click.prevent="saveEvolutionInfo(props.itemIndexVal)"
            >
              <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
              Guardar
            </button>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>