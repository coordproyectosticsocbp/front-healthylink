<script setup>

import {etnias, highBloodPressure, smokerType} from "@/utils/const/patientHealthSurvey.js";
import {ref} from "vue";

const healthHabitsVariables = ref({
  es_fumador: null,
  presion_arterial: null,
  medicamento_para_presion_arterial: null
})

const patientHasHighBloodPressure = ref(false)
const onHighBloodPressureSelected = (event) => {
  if (event.target.value === 'Si') {
    patientHasHighBloodPressure.value = true
  } else {
    patientHasHighBloodPressure.value = false
  }
}



</script>

<template>
  <!-- Health Habits Section -->
  <div class="row mb-3">
    <div class="col">

      <div class="card">
        <div class="card-body">

          <div class="row mb-3">
            <div class="col">
              <ol type="A" start="2" class="mb-0">
                <li>
                  <p class="fw-bold">HÁBITOS DE SALUD:</p>
                </li>
              </ol>
              <p class="text-justify">
                A continuación, te haremos una serie de preguntas orientadas a entender tus hábitos de salud. Todas sus respuestas serán confidenciales. Por favor, sea honesto.
              </p>

            </div>
          </div>

          <!-- Paciente es Fumador? -->
          <div class="row mb-3">
            <div class="col">
                <label for="formGroupExampleInput2" class="form-label">
                  <font-awesome-icon :icon="['fas', 'smoking']"/>
                  ¿Eres fumador o has sido fumador toda tu vida? UNICA
                </label>

                <select class="form-select-sm form-select mb-3" aria-label="One select"
                        v-model="healthHabitsVariables.es_fumador"
                        size="5"
                >
                  <option selected value="null">Seleccione su etnia</option>
                  <option v-for="st in smokerType" :key="st" v-text="st.label.toUpperCase()" :value="st.value"/>
                </select>

            </div>
          </div>
          <!-- End Paciente es Fumador? -->

          <!-- Paciente es Fumador? -->
          <div class="row mb-3">
            <div class="col">
              <label for="formGroupExampleInput2" class="form-label">
                <font-awesome-icon :icon="['fas', 'heart-pulse']"/>
                ¿Tiene presión arterial alta? UNICA
              </label>

              <select class="form-select-sm form-select mb-3" aria-label="One select"
                      v-model="healthHabitsVariables.presion_arterial"
                      size="4"
                      @change.prevent="onHighBloodPressureSelected"
              >
                <option selected value="null">Seleccione su etnia</option>
                <option v-for="st in highBloodPressure" :key="st" v-text="st.label.toUpperCase()" :value="st.value"/>
              </select>

              <div v-if="patientHasHighBloodPressure">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Si respondiste afirmativamente a la presión arterial alta, ¿estás tomando algún medicamento para controlarla?
                </label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" />
              </div>
            </div>
          </div>
          <!-- End Paciente es Fumador? -->



        </div>
      </div>
    </div>
  </div>
  <!-- End Health Habits Section -->
</template>

<style scoped>

</style>