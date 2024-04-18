<script setup>

import {digestiveDiseases, motherWithChronicIllness, personalConditions,} from "@/utils/const/patientHealthSurvey.js";
import useLocalStorage from "@/composables/useLocalStorage.js";
import {computed, onMounted, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {toast} from "vue3-toastify";


const cie10Diagnosis = ref([])
const showCie10SearchOptions = ref(false)
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
  cancer_diagnosticado: [],
  afecciones_diagnosticadas: [],
  analisis_sangre_ultimos_seis_meses: null,
}, 'PersonalHealthInformation')

const rules = computed(() => {
  return {
    enfermedades_cronicas: {required},
    enfermedades_pulmonares: {required},
    enfermedades_endocrinas_metabolicas: {required},
    enfermedades_digestivas: {required},
    enfermedades_renales: {required},
    enfermedades_neurologicas: {required},
    enfermedades_dermatologicas: {required},
    enfermedades_reumaticas: {required},
    diagnosticado_cancer_ultimos_cinco_anos: {required},
    cancer_diagnosticado: {required},
    afecciones_diagnosticadas: {required},
    analisis_sangre_ultimos_seis_meses: {required},
  }
})

const v$ = useVuelidate(rules, personalHealthVariables)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    toast.error('datos de salud INCOMPLETOS')
    return false
  }
  // If the form is valid, perform some action with the form data
  toast.success('datos de salud completos')
  return true;
}

const storageCie10Diagnosis = () => {
  const storageVal = window.localStorage.getItem('cie10Diagnosis')
  if (!storageVal) toast.error('Error obteniendo Dx desde LocalStorage')
  cie10Diagnosis.value = JSON.parse(storageVal)
  //console.log(cie10Diagnosis.value)
}

const getDiagnosisFromList = (event) => {
  const eventHandler = event.target.value
  if (eventHandler.length >= 3) {
    cie10Diagnosis.value.filter((item) => item.codigo === eventHandler)
    showCie10SearchOptions.value = true
  } else {
    showCie10SearchOptions.value = false
  }
}

const cancerDiagnosisAddToArray = (diagnosis) => {
  personalHealthVariables.value.cancer_diagnosticado.push(diagnosis)
}

defineExpose({
  handleSubmit
})

onMounted(storageCie10Diagnosis)

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

                  <span v-if="v$.enfermedades_cronicas.$error"
                        class="text-danger"
                  >
                  {{ v$.enfermedades_cronicas.$errors[0]?.$message }}
                </span>
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

                  <span v-if="v$.enfermedades_pulmonares.$error"
                        class="text-danger"
                  >
                    {{ v$.enfermedades_pulmonares.$errors[0]?.$message }}
                  </span>
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

                  <span v-if="v$.enfermedades_endocrinas_metabolicas.$error"
                        class="text-danger"
                  >
                    {{ v$.enfermedades_endocrinas_metabolicas.$errors[0]?.$message }}
                  </span>
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

                  <span v-if="v$.enfermedades_digestivas.$error"
                        class="text-danger"
                  >
                    {{ v$.enfermedades_digestivas.$errors[0]?.$message }}
                  </span>
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

                  <span v-if="v$.enfermedades_renales.$error"
                        class="text-danger"
                  >
                    {{ v$.enfermedades_renales.$errors[0]?.$message }}
                  </span>
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

                  <span v-if="v$.enfermedades_neurologicas.$error"
                        class="text-danger"
                  >
                    {{ v$.enfermedades_neurologicas.$errors[0]?.$message }}
                  </span>
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

                  <span v-if="v$.enfermedades_dermatologicas.$error"
                        class="text-danger"
                  >
                    {{ v$.enfermedades_dermatologicas.$errors[0]?.$message }}
                  </span>
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

                  <span v-if="v$.enfermedades_reumaticas.$error"
                        class="text-danger"
                  >
                    {{ v$.enfermedades_reumaticas.$errors[0]?.$message }}
                  </span>
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

              <div class="row mb-3">
                <div class="col-12">
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
              </div>

              <div v-if="personalHealthVariables.diagnosticado_cancer_ultimos_cinco_anos === 'Si'" class="row">
                <div class="col-12">
                  <p>En Caso de Marcar <strong>SI</strong>, Selecciones de que tipo?</p>

                  <div class="row">
                    <div class="col">
                      <input id="exampleDataListCie10" v-model="personalHealthVariables.cancer_diagnosticado"
                             class="form-control"
                             list="datalistOptionsCie10"
                             placeholder="Type to search..."
                             @input="getDiagnosisFromList($event)"
                      >
                      <datalist v-if="showCie10SearchOptions" id="datalistOptionsCie10">
                        <option v-for="diagnosis in cie10Diagnosis" :key="diagnosis.id"
                                :value="diagnosis.descripcion"
                                @change="cancerDiagnosisAddToArray(diagnosis.descripcion)"
                        >
                          {{ diagnosis.codigo }}
                        </option>
                      </datalist>
                    </div>
                    <div class="col">
                      <textarea id="exampleFormControlTextarea1"
                                :value="personalHealthVariables.cancer_diagnosticado"
                                class="form-control form-control-sm"
                                placeholder="Escriba la enfermedad"
                                rows="3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <span v-if="v$.diagnosticado_cancer_ultimos_cinco_anos.$error"
                    class="text-danger"
              >
                    {{ v$.diagnosticado_cancer_ultimos_cinco_anos.$errors[0]?.$message }}
                  </span>
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
              <select id="selectPacienteConAfecciones" v-model="personalHealthVariables.afecciones_diagnosticadas"
                      aria-label="Multiple select example" class="form-select form-select-sm"
                      multiple
                      size="7"
              >
                <option disabled value="null">Seleccione una o varias opciones</option>
                <option v-for="mci in personalConditions" :key="mci.value" :value="mci.value">
                  {{ mci.label }}
                </option>
              </select>

              <span v-if="v$.afecciones_diagnosticadas.$error"
                    class="text-danger"
              >
                    {{ v$.afecciones_diagnosticadas.$errors[0]?.$message }}
                  </span>
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

                  <span v-if="v$.analisis_sangre_ultimos_seis_meses.$error"
                        class="text-danger"
                  >
                    {{ v$.analisis_sangre_ultimos_seis_meses.$errors[0]?.$message }}
                  </span>
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