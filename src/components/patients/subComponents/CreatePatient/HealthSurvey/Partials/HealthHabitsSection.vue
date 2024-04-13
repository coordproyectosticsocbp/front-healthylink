<script setup>

import {
  alcoholConsumptionFrequency,
  highBloodPressure,
  highCholesterolLevels,
  motherWithChronicIllness,
  smokerType
} from "@/utils/const/patientHealthSurvey.js";
import {ref} from "vue";
import useLocalStorage from "@/composables/useLocalStorage.js";

const healthHabitsVariables = useLocalStorage({
  es_fumador: null,
  presion_arterial: null,
  medicamento_para_presion_arterial: null,
  alto_nivel_colesterol: null,
  frecuencia_bebidas_alcoholicas: null,
  afeccion_o_enfermededad_cronica__madre: false,
  cual_afeccion_o_enfermededad_cronica__madre: [],
  afeccion_o_enfermededad_cronica__padre: false,
  cual_afeccion_o_enfermededad_cronica__padre: [],
  afeccion_o_enfermededad_cronica__hermanos: false,
  cual_afeccion_o_enfermededad_cronica__hermanos: [],
}, 'HealthHabitsInformation')
const cualEnfermedad = ref(null)

const patientHasHighBloodPressure = ref(false)
const onHighBloodPressureSelected = (event) => {
  patientHasHighBloodPressure.value = event.target.value === 'Si';
}

const addIllnessToArray = (variableArray) => {
  if (variableArray === 1) healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__madre.push(cualEnfermedad.value)
  if (variableArray === 2) healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__padre.push(cualEnfermedad.value)
  if (variableArray === 3) healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__hermanos.push(cualEnfermedad.value)
  cualEnfermedad.value = null
}

const removeIllnessFromArray = (variableArray, item) => {
  if (variableArray === 1) {
    const index = healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__madre.indexOf(item)
    if (index > -1) healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__madre.splice(index, 1)
  } else if (variableArray === 2) {
    const index = healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__padre.indexOf(item)
    if (index > -1) healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__padre.splice(index, 1)
  } else if (variableArray === 3) {
    const index = healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__hermanos.indexOf(item)
    if (index > -1) healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__hermanos.splice(index, 1)
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
              <ol class="mb-0" start="2" type="A">
                <li>
                  <p class="fw-bold">HÁBITOS DE SALUD:</p>
                </li>
              </ol>
              <p class="text-justify">
                A continuación, te haremos una serie de preguntas orientadas a entender tus hábitos de salud. Todas sus
                respuestas serán confidenciales. Por favor, sea honesto.
              </p>

            </div>
          </div>

          <!-- Paciente es Fumador? -->
          <div class="row mb-3">
            <div class="col">
              <label class="form-label" for="formGroupExampleInput2">
                <font-awesome-icon :icon="['fas', 'smoking']"/>
                ¿Eres fumador o has sido fumador toda tu vida? UNICA
              </label>

              <select v-model="healthHabitsVariables.es_fumador" aria-label="One select"
                      class="form-select-sm form-select mb-3"
                      size="5"
              >
                <option disabled value="null">Seleccione una opcion</option>
                <option v-for="st in smokerType" :key="st" :value="st.value" v-text="st.label.toUpperCase()"/>
              </select>

            </div>
          </div>
          <!-- End Paciente es Fumador? -->

          <!-- Paciente es Fumador? -->
          <div class="row mb-3">
            <div class="col">
              <label class="form-label" for="formGroupExampleInput2">
                <font-awesome-icon :icon="['fas', 'heart-pulse']"/>
                ¿Tiene presión arterial alta? UNICA
              </label>

              <select v-model="healthHabitsVariables.presion_arterial" aria-label="One select"
                      class="form-select-sm form-select mb-3"
                      size="4"
                      @change.prevent="onHighBloodPressureSelected"
              >
                <option disabled value="null">Seleccione una opcion</option>
                <option v-for="st in highBloodPressure" :key="st" :value="st.value" v-text="st.label.toUpperCase()"/>
              </select>

              <div v-if="patientHasHighBloodPressure">
                <label class="form-label" for="exampleFormControlTextarea1">
                  Si respondiste afirmativamente a la presión arterial alta, ¿estás tomando algún medicamento para
                  controlarla?
                </label>
                <textarea id="exampleFormControlTextarea1" class="form-control" rows="2" v-model="healthHabitsVariables.medicamento_para_presion_arterial"  />
              </div>
            </div>
          </div>
          <!-- End Paciente es Fumador? -->

          <!-- Paciente Colesterol Alto -->
          <div class="row mb-3">
            <div class="col">
              <label class="form-label" for="formGroupExampleInput2">
                <font-awesome-icon :icon="['fas', 'heart']"/>
                ¿Tienes niveles altos de colesterol? UNICA
              </label>

              <select v-model="healthHabitsVariables.alto_nivel_colesterol" aria-label="One select"
                      class="form-select-sm form-select mb-3"
                      size="4"
              >
                <option disabled value="null">Seleccione una opcion</option>
                <option v-for="st in highCholesterolLevels" :key="st" :value="st.value"
                        v-text="st.label.toUpperCase()"/>
              </select>
            </div>
          </div>
          <!-- End Paciente Colesterol Alto -->

          <!-- Paciente Colesterol Alto -->
          <div class="row mb-3">
            <div class="col">
              <label class="form-label" for="formGroupExampleInput2">
                <font-awesome-icon :icon="['fas', 'champagne-glasses']"/>
                ¿Con qué frecuencia consumes bebidas alcohólicas? UNICA
              </label>

              <select v-model="healthHabitsVariables.frecuencia_bebidas_alcoholicas" aria-label="One select"
                      class="form-select-sm form-select mb-3"
                      size="6"
              >
                <option disabled value="null">Seleccione una opcion</option>
                <option v-for="st in alcoholConsumptionFrequency" :key="st" :value="st.value"
                        v-text="st.label.toUpperCase()"/>
              </select>
            </div>
          </div>
          <!-- End Paciente Colesterol Alto -->

          <!-- Enfermedades cronicas de la madre -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                ¿Alguno de sus parientes cercanos (por ejemplo, padres, hermanos) tiene una afección o enfermedad
                crónica no transmisible (Hipertensión Arterial, Diabetes Mellitus, Cáncer, Enfermedad Renal Crónica,
                etc.? UNICA
              </p>

              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <ul>
                    <li>
                      <fieldset class="row mb-3">
                        <legend class="col-form-label col-4 pt-0 fw-bold">MADRE:</legend>
                        <div class="col-8">
                          <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                            <input :id="`gridRadiosMadre-${index}`"
                                   v-model="healthHabitsVariables.afeccion_o_enfermededad_cronica__madre"
                                   :name="`gridRadiosMadre-${index}`"
                                   :value="mci.value" class="form-check-input" type="radio">
                            <label :for="`gridRadiosMadre-${index}`" class="form-check-label">
                              {{ mci.label }}
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </li>
                  </ul>
                </div>
                <div v-if="healthHabitsVariables.afeccion_o_enfermededad_cronica__madre === 'Si'"
                     class="col-xl-4 col-md-4 col-sm-12">
                  <p>Cuales Enfermedades?</p>
                  <div class="row mb-3">
                    <input
                        v-model="cualEnfermedad"
                        class="form-control form-control-sm"
                        placeholder="Escriba la enfermedad" type="text"
                        @keyup.prevent.enter="addIllnessToArray(1)"
                    />
                  </div>
                  <div class="row">
                    <div class="col">
                      <h6 v-for="ill in healthHabitsVariables.cual_afeccion_o_enfermededad_cronica__madre"
                          :key="ill" class="d-inline-block"
                          @click.prevent="removeIllnessFromArray(1,ill)"
                      >
                        <span class="badge text-bg-primary me-1">
                          {{ ill }}
                          <font-awesome-icon :icon="['fas', 'x']" class="ms-2"/>
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <!-- End Enfermedades cronicas de la madre -->

          <!-- Enfermedades cronicas del padre -->
          <div class="row mb-3">
            <div class="col-xl-8 col-md-8 col-sm-12">
              <ul>
                <li>
                  <fieldset class="row mb-3">
                    <legend class="col-form-label col-4 pt-0 fw-bold">PADRE:</legend>
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosPadre-${index}`"
                               v-model="healthHabitsVariables.afeccion_o_enfermededad_cronica__padre"
                               :name="`gridRadiosPadre-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosPadre-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </li>
              </ul>
            </div>
            <div v-if="healthHabitsVariables.afeccion_o_enfermededad_cronica__padre === 'Si'"
                 class="col-xl-4 col-md-4 col-sm-12">
              <p>Cuales Enfermedades?</p>
              <div class="row mb-3">
                <input
                    v-model="cualEnfermedad"
                    class="form-control form-control-sm"
                    placeholder="Escriba la enfermedad" type="text"
                    @keyup.prevent.enter="addIllnessToArray(2)"
                />
              </div>
              <div class="row">
                <div class="col">
                  <h6 v-for="ill in healthHabitsVariables.cual_afeccion_o_enfermededad_cronica__padre"
                      :key="ill" class="d-inline-block"
                      @click.prevent="removeIllnessFromArray(2, ill)"
                  >
                        <span class="badge text-bg-primary me-1">
                          {{ ill }}
                          <font-awesome-icon :icon="['fas', 'x']" class="ms-2"/>
                        </span>
                  </h6>
                </div>
              </div>
            </div>

          </div>
          <!-- End Enfermedades cronicas del padre -->

          <!-- Enfermedades cronicas de los Hermanos -->
          <div class="row mb-3">
            <div class="col-xl-8 col-md-8 col-sm-12">
              <ul>
                <li>
                  <fieldset class="row mb-3">
                    <legend class="col-form-label col-4 pt-0 fw-bold">HERMANOS:</legend>
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosHermanos-${index}`"
                               v-model="healthHabitsVariables.afeccion_o_enfermededad_cronica__hermanos"
                               :name="`gridRadiosHermanos-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosHermanos-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </li>
              </ul>
            </div>
            <div v-if="healthHabitsVariables.afeccion_o_enfermededad_cronica__hermanos === 'Si'"
                 class="col-xl-4 col-md-4 col-sm-12"
            >
              <p>Cuales Enfermedades?</p>
              <div class="row mb-3">
                <input
                    v-model="cualEnfermedad"
                    class="form-control form-control-sm"
                    placeholder="Escriba la enfermedad" type="text"
                    @keyup.prevent.enter="addIllnessToArray(3)"
                />
              </div>
              <div class="row">
                <div class="col">
                  <h6 v-for="ill in healthHabitsVariables.cual_afeccion_o_enfermededad_cronica__hermanos"
                      :key="ill" class="d-inline-block"
                      @click.prevent="removeIllnessFromArray(3, ill)"
                  >
                        <span class="badge text-bg-primary me-1">
                          {{ ill }}
                          <font-awesome-icon :icon="['fas', 'x']" class="ms-2"/>
                        </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <!-- End Enfermedades cronicas de los Hermanos -->
          
        </div>
      </div>
    </div>
  </div>
  <!-- End Health Habits Section -->
</template>

<style scoped>

</style>