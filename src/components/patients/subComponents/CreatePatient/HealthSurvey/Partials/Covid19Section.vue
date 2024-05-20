<script setup>

import {
  covidSymptoms,
  hospitalizationByCovid,
  hospitalizationTime,
  motherWithChronicIllness,
  vaccineTypes
} from "@/utils/const/patientHealthSurvey.js";
import useLocalStorage from "@/composables/useLocalStorage.js";
import useVuelidate from "@vuelidate/core";
import {toast} from "vue3-toastify";
import {computed} from "vue";
import {required} from "@vuelidate/validators";

const covidVariables = useLocalStorage({
  prueba_positiva_covid_19: null,
  vacunacion_covid_19: null,
  tipo_vacuna_recibida: [],
  cantidad_dosis_vacunacion_recibida: 0,
  presento_sintomas_por_covid: null,
  sintomas_tenidos_por_covid: [],
  hospitalizado_por_covid_19: null,
  tiempo_recuperacion_covid_19: null,
  sintomas_q_persisten_por_covid_19: [],
}, 'covid19Information')

const rules = computed(() => {
  return {
    prueba_positiva_covid_19: {required},
    vacunacion_covid_19: {required},
    presento_sintomas_por_covid: {required},
    hospitalizado_por_covid_19: {required},
    tiempo_recuperacion_covid_19: {required},
  }
})

const v$ = useVuelidate(rules, covidVariables)

const resetValuesIfNoOption = (key, event) => {
  const eventValue = event.target.value
  if (key === 'vacunacion_covid_19') {
    if (eventValue === 'No' || eventValue !== 'No Sé') {
      covidVariables.value.tipo_vacuna_recibida = []
      covidVariables.value.cantidad_dosis_vacunacion_recibida = 0
    }
  }
  if (key === 'tiempo_recuperacion_covid_19') {
    if (eventValue !== 'Más de 12 semanas') {
      covidVariables.value.sintomas_q_persisten_por_covid_19 = []
    }
  }
  if (key === 'presento_sintomas_por_covid') {
    if (eventValue !== 'No' || eventValue !== 'No Sé') {
      covidVariables.value.sintomas_tenidos_por_covid = []
    }
  }
}

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    window.localStorage.setItem('covid19InfoHasError', false)
    toast.error('datos sobre covid INCOMPLETOS')
    return false
  }
  // If the form is valid, perform some action with the form data
  window.localStorage.setItem('covid19InfoHasError', false)
  return true;
}

defineExpose({
  handleSubmit
})

</script>

<template>
  <!-- Covid 19 Section -->
  <div class="row mb-3">
    <div class="col">

      <div class="card">
        <div class="card-body">

          <div class="row mb-3">
            <div class="col">
              <ol class="mb-0" start="4" type="A">
                <li>
                  <p class="fw-bold text-uppercase">Información de salud relacionada con el COVID-19:</p>
                </li>
              </ol>
            </div>
          </div>

          <!-- Resultado positivo -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                33. ¿Alguna vez ha tenido un resultado positivo en la prueba del virus que causa el COVID-19 (p. ej.,
                PCR o
                prueba de antígenos)?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosPruebaCovid-${index}`"
                               v-model="covidVariables.prueba_positiva_covid_19"
                               :name="`gridRadiosPruebaCovid-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosPruebaCovid-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  <span v-if="v$.prueba_positiva_covid_19.$error"
                        class="text-danger"
                  >
                  {{ v$.prueba_positiva_covid_19.$errors[0]?.$message }}
                </span>
                </div>
              </div>
            </div>
          </div>
          <!-- End Resultado positivo -->

          <!-- te has vacunado -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                34. ¿Te has vacunado contra el virus COVID-19?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosVacunaCovid-${index}`"
                               v-model="covidVariables.vacunacion_covid_19"
                               :name="`gridRadiosVacunaCovid-${index}`"
                               :value="mci.value" class="form-check-input" type="radio"
                               @change="resetValuesIfNoOption('vacunacion_covid_19', $event)"
                        >
                        <label :for="`gridRadiosVacunaCovid-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  <span v-if="v$.vacunacion_covid_19.$error"
                        class="text-danger"
                  >
                  {{ v$.vacunacion_covid_19.$errors[0]?.$message }}
                </span>
                </div>
              </div>
            </div>
          </div>
          <!-- End te has vacunado -->

          <!-- cuantas dosis -->
          <div v-if="covidVariables.vacunacion_covid_19 === 'Si'" class="row mb-3">
            <div class="col-6">
              <label class="form-label" for="inputDosisVacunacion">Cuantas Dosis?</label>
              <input id="inputDosisVacunacion"
                     v-model="covidVariables.cantidad_dosis_vacunacion_recibida"
                     class="form-control form-control-sm"
                     placeholder="Escriba # de dosis"
                     type="number"
              >

              <!--              <span v-if="v$.cantidad_dosis_vacunacion_recibida.$error"
                                  class="text-danger"
                            >
                                {{ v$.cantidad_dosis_vacunacion_recibida.$errors[0]?.$message }}
                              </span>-->
            </div>
          </div>
          <!-- End cuantas dosis -->

          <!-- Tipo de Vacuna -->
          <div v-if="covidVariables.vacunacion_covid_19 === 'Si'" class="row mb-3">
            <div class="col">
              <label class="form-label" for="selectTipoVacuna">
                Si se ha vacunado, ¿qué vacuna recibió?
              </label>
              <select id="selectTipoVacuna" v-model="covidVariables.tipo_vacuna_recibida"
                      aria-label="Multiple select example" class="form-select form-select-sm"
                      multiple
                      size="7"
              >
                <option disabled value="null">Seleccione una o varias opciones</option>
                <option v-for="vaccine in vaccineTypes" :key="vaccine" :value="vaccine.value">
                  {{ vaccine.label }}
                </option>
              </select>

              <!--              <span v-if="v$.tipo_vacuna_recibida.$error"
                                  class="text-danger"
                            >
                                {{ v$.tipo_vacuna_recibida.$errors[0]?.$message }}
                              </span>-->
            </div>
          </div>
          <!-- End cuantas dosis -->

          <!-- experimento sintomas -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                35. Si tuvo un resultado positivo para COVID-19, ¿experimentó síntomas de esta afección?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosPresentoSintomas-${index}`"
                               v-model="covidVariables.presento_sintomas_por_covid"
                               :name="`gridRadiosPresentoSintomas-${index}`"
                               :value="mci.value" class="form-check-input" type="radio"
                               @change="resetValuesIfNoOption('presento_sintomas_por_covid', $event)"
                        >
                        <label :for="`gridRadiosPresentoSintomas-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  <span v-if="v$.presento_sintomas_por_covid.$error"
                        class="text-danger"
                  >
                  {{ v$.presento_sintomas_por_covid.$errors[0]?.$message }}
                </span>
                </div>
              </div>
            </div>
          </div>
          <!-- End experimento sintomas -->

          <!-- que sintomas tuvo -->
          <div v-if="covidVariables.presento_sintomas_por_covid === 'Si'" class="row mb-3">
            <div class="col">
              <label class="form-label" for="selectSintomasCovid">
                Si su respuesta es afirmativa, ¿qué síntomas tuvo? (tenga en cuenta en el diagrama a continuación todos
                los que se aplican de los 50 más comunes, o agregue cualquier síntoma adicional que haya experimentado
                personalmente) MULTIPLE:
              </label>
              <select id="selectSintomasCovid" v-model="covidVariables.sintomas_tenidos_por_covid"
                      aria-label="Multiple select example" class="form-select form-select-sm"
                      multiple
                      size="10"
              >
                <option disabled value="null">Seleccione una o varias opciones</option>
                <option v-for="vaccine in covidSymptoms" :key="vaccine" :value="vaccine.value">
                  {{ vaccine.label }}
                </option>
              </select>
            </div>
          </div>
          <!-- End que sintomas tuvo -->

          <!-- hospitalizacion por covid -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                36. ¿Alguna vez ha sido hospitalizado debido al COVID-19?
              </p>
              <div class="row">
                <div class="col">
                  <fieldset class="row mb-3">
                    <div class="col-12">
                      <div v-for="(mci, index) in hospitalizationByCovid" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosHospCovid-${index}`"
                               v-model="covidVariables.hospitalizado_por_covid_19"
                               :name="`gridRadiosHospCovid-${index}`"
                               :value="mci.value" class="form-check-input" type="radio"
                        >
                        <label :for="`gridRadiosHospCovid-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  <span v-if="v$.hospitalizado_por_covid_19.$error"
                        class="text-danger"
                  >
                  {{ v$.hospitalizado_por_covid_19.$errors[0]?.$message }}
                </span>
                </div>
              </div>
            </div>
          </div>
          <!-- End hospitalizacion por covid -->

          <!-- Tiempo de hospitalizacion por covid -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                37. Si tuvo un resultado positivo para COVID-19, ¿cuánto tiempo tardó o está tardando en recuperarse
                desde
                el momento en que se enteró de su diagnóstico de COVID-19?
              </p>
              <div class="row">
                <div class="col">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in hospitalizationTime" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosHospTime-${index}`"
                               v-model="covidVariables.tiempo_recuperacion_covid_19"
                               :name="`gridRadiosHospTime-${index}`"
                               :value="mci.value" class="form-check-input" type="radio"
                               @change="resetValuesIfNoOption('tiempo_recuperacion_covid_19',$event)"
                        >
                        <label :for="`gridRadiosHospTime-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  <span v-if="v$.tiempo_recuperacion_covid_19.$error"
                        class="text-danger"
                  >
                  {{ v$.tiempo_recuperacion_covid_19.$errors[0]?.$message }}
                </span>
                </div>
              </div>
            </div>
          </div>
          <!-- End Tiempo de hospitalizacion por covid -->

          <!-- sintomas que aún persisten -->
          <div v-if="covidVariables.tiempo_recuperacion_covid_19 === 'Más de 12 semanas'" class="row mb-3">
            <div class="col">
              <label class="form-label" for="selectSintomasCovidPersisten">
                Si respondió con la opción e. (más de 12 semanas); anote en el diagrama cuáles de los síntomas aún
                persisten o persisten después de 12 semanas desde que se enteró de su diagnóstico de COVID-19 (todos los
                que se aplican de los 50 más comunes, o agregue cualquier síntoma adicional que haya experimentado
                personalmente)
              </label>
              <select id="selectSintomasCovidPersisten" v-model="covidVariables.sintomas_q_persisten_por_covid_19"
                      aria-label="Multiple select example" class="form-select form-select-sm"
                      multiple
                      size="10"
                      @change.prevent="resetValuesIfNoOption('sintomas_q_persisten_por_covid_19', $event)"
              >
                <option disabled value="null">Seleccione una o varias opciones</option>
                <option v-for="vaccine in covidSymptoms" :key="vaccine" :value="vaccine.value">
                  {{ vaccine.label }}
                </option>
              </select>
            </div>
          </div>
          <!-- End sintomas que aún persisten -->

        </div>
      </div>
    </div>
  </div>
  <!-- End Covid 19 Section -->
</template>

<style scoped>

</style>