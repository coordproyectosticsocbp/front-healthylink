<script setup>

import {
  covidSymptoms,
  hospitalizationByCovid,
  hospitalizationTime,
  motherWithChronicIllness,
  vaccineTypes
} from "@/utils/const/patientHealthSurvey.js";
import useLocalStorage from "@/composables/useLocalStorage.js";

const covidVariables = useLocalStorage({
  prueba_positiva_covid_19: null,
  vacunacion_covid_19: null,
  tipo_vacuna_recibida: [],
  cantidad_dosis_vacunacion_recibida: null,
  presento_sintomas_por_covid: null,
  sintomas_tenidos_por_covid: [],
  hospitalizado_por_covid_19: null,
  tiempo_recuperacion_covid_19: null,
  sintomas_q_persisten_por_covid_19: [],
}, 'covid19Information')

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
                ¿Alguna vez ha tenido un resultado positivo en la prueba del virus que causa el COVID-19 (p. ej., PCR o
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
                </div>
              </div>
            </div>
          </div>
          <!-- End Resultado positivo -->

          <!-- te has vacunado -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                ¿Te has vacunado contra el virus COVID-19?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosVacunaCovid-${index}`"
                               v-model="covidVariables.vacunacion_covid_19"
                               :name="`gridRadiosVacunaCovid-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosVacunaCovid-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <!-- End te has vacunado -->

          <!-- cuantas dosis -->
          <div class="row mb-3">
            <div class="col-6">
              <label class="form-label" for="exampleFormControlInput1">Cuantas Dosis?</label>
              <input id="exampleFormControlInput1" v-model="covidVariables.cantidad_dosis_vacunacion_recibida"
                     class="form-control form-control-sm"
                     placeholder="Escriba # de dosis"
                     type="number"
              >
            </div>
          </div>
          <!-- End cuantas dosis -->

          <!-- Tipo de Vacuna -->
          <div class="row mb-3">
            <div class="col">
              <label class="form-label" for="exampleFormControlInput1">
                Si se ha vacunado, ¿qué vacuna recibió?
              </label>
              <select v-model="covidVariables.tipo_vacuna_recibida" aria-label="Multiple select example"
                      class="form-select form-select-sm" multiple
                      size="7"
              >
                <option disabled value="null">Seleccione una o varias opciones</option>
                <option v-for="vaccine in vaccineTypes" :key="vaccine" :value="vaccine.value">
                  {{ vaccine.label }}
                </option>
              </select>
            </div>
          </div>
          <!-- End cuantas dosis -->

          <!-- experimento sintomas -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                Si tuvo un resultado positivo para COVID-19, ¿experimentó síntomas de esta afección?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosPresentoSintomas-${index}`"
                               v-model="covidVariables.presento_sintomas_por_covid"
                               :name="`gridRadiosPresentoSintomas-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosPresentoSintomas-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <!-- End experimento sintomas -->

          <!-- que sintomas tuvo -->
          <div v-if="covidVariables.presento_sintomas_por_covid === 'Si'" class="row mb-3">
            <div class="col">
              <label class="form-label" for="exampleFormControlInput1">
                Si su respuesta es afirmativa, ¿qué síntomas tuvo? (tenga en cuenta en el diagrama a continuación todos
                los que se aplican de los 50 más comunes, o agregue cualquier síntoma adicional que haya experimentado
                personalmente) MULTIPLE:
              </label>
              <select v-model="covidVariables.sintomas_tenidos_por_covid" aria-label="Multiple select example"
                      class="form-select form-select-sm" multiple
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
                ¿Alguna vez ha sido hospitalizado debido al COVID-19?
              </p>
              <div class="row">
                <div class="col">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in hospitalizationByCovid" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosHospCovid-${index}`"
                               v-model="covidVariables.hospitalizado_por_covid_19"
                               :name="`gridRadiosHospCovid-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosHospCovid-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <!-- End hospitalizacion por covid -->

          <!-- Tiempo de hospitalizacion por covid -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                Si tuvo un resultado positivo para COVID-19, ¿cuánto tiempo tardó o está tardando en recuperarse desde
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
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosHospTime-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <!-- End Tiempo de hospitalizacion por covid -->

          <!-- sintomas que aún persisten -->
          <div v-if="covidVariables.tiempo_recuperacion_covid_19 === 'Más de 12 semanas'" class="row mb-3">
            <div class="col">
              <label class="form-label" for="exampleFormControlInput1">
                Si respondió con la opción e. (más de 12 semanas); anote en el diagrama cuáles de los síntomas aún
                persisten o persisten después de 12 semanas desde que se enteró de su diagnóstico de COVID-19 (todos los
                que se aplican de los 50 más comunes, o agregue cualquier síntoma adicional que haya experimentado
                personalmente)
              </label>
              <select v-model="covidVariables.sintomas_q_persisten_por_covid_19" aria-label="Multiple select example"
                      class="form-select form-select-sm" multiple
                      size="10"
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