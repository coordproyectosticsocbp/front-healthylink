<script setup>

import {
  digestiveDiseases,
  motherWithChronicIllness,
  personalConditions,
  vaccineTypes
} from "@/utils/const/patientHealthSurvey.js";
import useLocalStorage from "@/composables/useLocalStorage.js";

const personalHealthVariables = useLocalStorage({
  enfermedades_cronicas: null,
  enfermedades_pulmonares: null,
  enfermedades_endocrinas_metabolicas: null,
  enfermedades_digestivas: null,
  enfermedades_renales: null,
  enfermedades_neurologicas: null,
  enfermedades_dermatologicas: null,
  enfermedades_reumaticas: null,
  diagnosticado_cancer_ultimos_cinco_anos: null,
  cancer_diagnosticado: null,
  afecciones_diagnosticadas: [],
  analisis_sangre_ultimos_seis_meses: null,
}, 'PersonalHealthInformation')


</script>

<template>
  <!-- Personal Health Section -->
  <div class="row mb-3">
    <div class="col">

      <div class="card">
        <div class="card-body">

          <div class="row mb-3">
            <div class="col">
              <ol class="mb-0" start="3" type="A">
                <li>
                  <p class="fw-bold">INFORMACIÓN PERSONAL DE SALUD:</p>
                </li>
              </ol>
            </div>
          </div>

          <!-- Enfermedades cardiacas -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                ¿Alguna vez su médico le ha diagnosticado enfermedades cardíacas y/o cardiovasculares (por ejemplo,
                enfermedades cardíacas, como ataques cardíacos, accidentes cerebrovasculares o insuficiencia cardíaca)?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosCronicas-${index}`"
                               v-model="personalHealthVariables.enfermedades_cronicas"
                               :name="`gridRadiosCronicas-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosCronicas-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

              </div>
            </div>
          </div>
          <!-- End Enfermedades cardiacas -->

          <!-- Enfermedades pulmonares -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                ¿Alguna vez su médico le ha diagnosticado enfermedades pulmonares?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosPulmonares-${index}`"
                               v-model="personalHealthVariables.enfermedades_pulmonares"
                               :name="`gridRadiosPulmonares-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosPulmonares-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

              </div>
            </div>
          </div>
          <!-- End Enfermedades pulmonares -->

          <!-- Enfermedades endocrinas -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                ¿Alguna vez su médico le ha diagnosticado enfermedades endocrinas o metabólicas (por ejemplo, diabetes,
                trastornos del colesterol, enfermedades de la tiroides, etc.)?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosEndocrinas-${index}`"
                               v-model="personalHealthVariables.enfermedades_endocrinas_metabolicas"
                               :name="`gridRadiosEndocrinas-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosEndocrinas-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

              </div>
            </div>
          </div>
          <!-- End Enfermedades endocrinas -->

          <!-- Enfermedades digestivas -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                ¿Alguna vez le han diagnosticado enfermedades digestivas y/o hepáticas (estómago y/o intestinos; y/o
                hígado)?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in digestiveDiseases" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosDigestivas-${index}`"
                               v-model="personalHealthVariables.enfermedades_digestivas"
                               :name="`gridRadiosDigestivas-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosDigestivas-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

              </div>
            </div>
          </div>
          <!-- End Enfermedades digestivas -->

          <!-- Enfermedades renales -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                ¿Alguna vez le han diagnosticado enfermedades renales?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosRenales-${index}`"
                               v-model="personalHealthVariables.enfermedades_renales"
                               :name="`gridRadiosRenales-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosRenales-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

              </div>
            </div>
          </div>
          <!-- End Enfermedades renales -->

          <!-- Enfermedades neurologicas -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                ¿Alguna vez le han diagnosticado enfermedades neurológicas (por ejemplo, esclerosis múltiple, alzheimer,
                Parkinson) y/o mentales (por ejemplo, depresión)?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosNeurologicas-${index}`"
                               v-model="personalHealthVariables.enfermedades_neurologicas"
                               :name="`gridRadiosNeurologicas-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosNeurologicas-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

              </div>
            </div>
          </div>
          <!-- End Enfermedades neurologicas -->

          <!-- Enfermedades dermatologicas -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                ¿Alguna vez te han diagnosticado enfermedades dermatológicas (de la piel)?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosDermatologicas-${index}`"
                               v-model="personalHealthVariables.enfermedades_dermatologicas"
                               :name="`gridRadiosDermatologicas-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosDermatologicas-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

              </div>
            </div>
          </div>
          <!-- End Enfermedades dermatologicas -->

          <!-- Enfermedades reumaticas -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                ¿Alguna vez le han diagnosticado enfermedades reumáticas (por ejemplo, artritis)?
              </p>
              <div class="row">
                <div class="col-xl-8 col-md-8 col-sm-12">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosReumaticas-${index}`"
                               v-model="personalHealthVariables.enfermedades_reumaticas"
                               :name="`gridRadiosReumaticas-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosReumaticas-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

              </div>
            </div>
          </div>
          <!-- End Enfermedades reumaticas -->

          <!-- Enfermedades de cancer -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                ¿Ha recibido un diagnóstico de cáncer de su médico en los últimos 5 años?
              </p>
              <div class="row">
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                    <input :id="`gridRadiosDxCancer-${index}`"
                           v-model="personalHealthVariables.diagnosticado_cancer_ultimos_cinco_anos"
                           :name="`gridRadiosDxCancer-${index}`"
                           :value="mci.value" class="form-check-input" type="radio">
                    <label :for="`gridRadiosDxCancer-${index}`" class="form-check-label">
                      {{ mci.label }}
                    </label>
                  </div>
                </div>
                <div v-if="personalHealthVariables.diagnosticado_cancer_ultimos_cinco_anos === 'Si'"
                     class="col-xl-6 col-md-6 col-sm-12">
                  <p>De que tipo?</p>
                  <div class="row mb-3">
                    <textarea id="exampleFormControlTextarea1" v-model="personalHealthVariables.cancer_diagnosticado"
                              class="form-control form-control-sm"
                              placeholder="Escriba la enfermedad"
                              rows="3"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
          <!-- End Enfermedades de cancer -->

          <!-- Enfermedades afecciones -->
          <div class="row mb-3">
            <div class="col">
              <label class="form-label" for="selectPacienteConAfecciones">
                ¿Alguna vez tu médico te ha diagnosticado alguna de las siguientes afecciones? Puede marcar más de una
                respuesta.
              </label>
              <select v-model="personalHealthVariables.afecciones_diagnosticadas" aria-label="Multiple select example"
                      class="form-select form-select-sm" multiple
                      size="7"
                      id="selectPacienteConAfecciones"
              >
                <option disabled value="null">Seleccione una o varias opciones</option>
                <option v-for="mci in personalConditions" :key="mci.value" :value="mci.value">
                  {{ mci.label }}
                </option>
              </select>
            </div>
          </div>
          <!-- End Enfermedades afecciones -->

          <!-- Analisis de sangre ultimos 6 meses -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                ¿Te has hecho análisis de sangre en los últimos 6 meses?
              </p>
              <div class="row">
                <div class="col">
                  <fieldset class="row mb-3">
                    <div class="col-8">
                      <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                        <input :id="`gridRadiosAnalisisSangre-${index}`"
                               v-model="personalHealthVariables.analisis_sangre_ultimos_seis_meses"
                               :name="`gridRadiosAnalisisSangre-${index}`"
                               :value="mci.value" class="form-check-input" type="radio">
                        <label :for="`gridRadiosAnalisisSangre-${index}`" class="form-check-label">
                          {{ mci.label }}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <!-- End Analisis de sangre ultimos 6 meses -->

        </div>
      </div>

    </div>
  </div>
  <!-- End Personal Health Section -->
</template>

<style scoped>

</style>