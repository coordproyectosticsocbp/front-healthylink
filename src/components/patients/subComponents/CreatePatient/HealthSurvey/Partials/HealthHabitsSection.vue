<script setup>

import {
  alcoholConsumptionFrequency,
  highBloodPressure,
  highCholesterolLevels,
  motherWithChronicIllness,
  smokerType
} from "@/utils/const/patientHealthSurvey.js";
import {computed, ref} from "vue";
import useLocalStorage from "@/composables/useLocalStorage.js";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {toast} from "vue3-toastify";
import {cie10Diseases} from "@/utils/const/cie10Diseases.js";
import {drugsList} from "@/utils/const/drugsList.js";

const healthHabitsVariables = useLocalStorage({
  es_fumador: null,
  presion_arterial: null,
  medicamento_para_presion_arterial: [],
  alto_nivel_colesterol: null,
  frecuencia_bebidas_alcoholicas: null,
  afeccion_o_enfermededad_cronica__madre: null,
  cual_afeccion_o_enfermededad_cronica__madre: [],
  afeccion_o_enfermededad_cronica__padre: null,
  cual_afeccion_o_enfermededad_cronica__padre: [],
  afeccion_o_enfermededad_cronica__hermanos: null,
  cual_afeccion_o_enfermededad_cronica__hermanos: [],
}, 'HealthHabitsInformation')

const rules = computed(() => {
  return {
    es_fumador: {required},
    presion_arterial: {required},
    /*medicamento_para_presion_arterial: {required},*/
    alto_nivel_colesterol: {required},
    frecuencia_bebidas_alcoholicas: {required},
    afeccion_o_enfermededad_cronica__madre: {required},
    afeccion_o_enfermededad_cronica__padre: {required},
    afeccion_o_enfermededad_cronica__hermanos: {required},
  }
})

const cualEnfermedadMadre = ref("")
const cualEnfermedadPadre = ref("")
const cualEnfermedadHermanos = ref("")

const v$ = useVuelidate(rules, healthHabitsVariables)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    window.localStorage.setItem('healthHabitsHasError', JSON.stringify({
      value: true
    }))
    toast.error('Habitos de salud INCOMPLETOS')
    return false
  }
  // If the form is valid, perform some action with the form data
  if (window.localStorage.getItem('healthHabitsHasError')) window.localStorage.removeItem('healthHabitsHasError')
  return true;
}

const resetValuesIfNoOption = (key, event) => {
  const eventValue = event.target.value
  if (key === 'presion_arterial') {
    if (eventValue === 'No' || eventValue === 'No Sé') {
      healthHabitsVariables.value.medicamento_para_presion_arterial = []
    }
  }
  if (key === 'cual_afeccion_o_enfermededad_cronica__madre') {
    if (eventValue === 'No' || eventValue === 'No Sé') {
      healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__madre = []
    }
  }
  if (key === 'cual_afeccion_o_enfermededad_cronica__padre') {
    if (eventValue === 'No' || eventValue === 'No Sé') {
      healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__padre = []
    }
  }
  if (key === 'cual_afeccion_o_enfermededad_cronica__hermanos') {
    if (eventValue === 'No' || eventValue === 'No Sé') {
      healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__hermanos = []
    }
  }
}

/*const patientHasHighBloodPressure = ref(false)
const onHighBloodPressureSelected = (event) => {
  patientHasHighBloodPressure.value = event.target.value === 'Si';
}*/

const addIllnessToArray = (variableArray) => {
  if (variableArray === 1) {
    healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__madre.push(cualEnfermedadMadre.value)
  }

  if (variableArray === 2) {
    healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__padre.push(cualEnfermedadPadre.value)

  }
  if (variableArray === 3) {
    healthHabitsVariables.value.cual_afeccion_o_enfermededad_cronica__hermanos.push(cualEnfermedadHermanos.value)

  }
  cualEnfermedadMadre.value = null
  cualEnfermedadPadre.value = null
  cualEnfermedadHermanos.value = null
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

const ObtainDrugsDescription = () => {

  healthHabitsVariables.value.medicamento_para_presion_arterial.map(item => {
    healthHabitsVariables.value.medicamento_para_presion_arterial.push(item.DescripcionComercial)
  })


}

defineExpose({
  handleSubmit
})


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
              <label class="form-label" for="selectPacienteFumador">
                <font-awesome-icon :icon="['fas', 'smoking']"/>
                17. ¿Eres fumador o has sido fumador toda tu vida? UNICA
              </label>

              <select id="selectPacienteFumador" v-model="healthHabitsVariables.es_fumador"
                      aria-label="One select"
                      class="form-select-sm form-select"
                      size="5"
              >
                <option disabled value="null">Seleccione una opcion</option>
                <option v-for="st in smokerType" :key="st" :value="st.value" v-text="st.label.toUpperCase()"/>
              </select>

              <span v-if="v$.es_fumador.$error"
                    class="text-danger"
              >
                  {{ v$.es_fumador.$errors[0]?.$message }}
                </span>
            </div>
          </div>
          <!-- End Paciente es Fumador? -->

          <!-- Paciente es Fumador? -->
          <div class="row mb-3">
            <div class="col">
              <label class="form-label" for="presionArterial">
                <font-awesome-icon :icon="['fas', 'heart-pulse']"/>
                18. ¿Tiene presión arterial alta? UNICA
              </label>

              <select id="presionArterial" v-model="healthHabitsVariables.presion_arterial"
                      aria-label="One select"
                      class="form-select-sm form-select"
                      size="4"
                      @change="resetValuesIfNoOption('presion_arterial', $event)"
              >
                <option disabled value="null">Seleccione una opcion</option>
                <option v-for="st in highBloodPressure" :key="st" :value="st.value" v-text="st.label.toUpperCase()"/>
              </select>

              <span v-if="v$.presion_arterial.$error"
                    class="text-danger"
              >
                  {{ v$.presion_arterial.$errors[0]?.$message }}
                </span>

              <div v-if="healthHabitsVariables.presion_arterial === 'Si'" class="mt-3 mb-5">
                <label class="form-label" for="areaMedicamentoControl">
                  Si respondiste afirmativamente a la presión arterial alta, ¿estás tomando algún medicamento para
                  controlarla?
                </label>
                <VueMultiselect
                    id="areaMedicamentoControl"
                    v-model="healthHabitsVariables.medicamento_para_presion_arterial"
                    :close-on-select="true"
                    :multiple="true"
                    :options="drugsList"
                    label="DescripcionComercial"
                    placeholder="Selccione el o los medicamentos"
                    track-by="DescripcionComercial"
                    va
                />
                <!--                <textarea id="areaMedicamentoControl" v-model="healthHabitsVariables.medicamento_para_presion_arterial"
                                          class="form-control"
                                          rows="2"
                                />-->
              </div>

            </div>
          </div>
          <!-- End Paciente es Fumador? -->

          <!-- Paciente Colesterol Alto -->
          <div class="row mb-3">
            <div class="col">
              <label class="form-label" for="selectColesterolNivel">
                <font-awesome-icon :icon="['fas', 'heart']"/>
                19. ¿Tienes niveles altos de colesterol? UNICA
              </label>

              <select id="selectColesterolNivel" v-model="healthHabitsVariables.alto_nivel_colesterol"
                      aria-label="One select"
                      class="form-select-sm form-select"
                      size="4"
              >
                <option disabled value="null">Seleccione una opcion</option>
                <option v-for="st in highCholesterolLevels" :key="st" :value="st.value"
                        v-text="st.label.toUpperCase()"/>
              </select>

              <span v-if="v$.alto_nivel_colesterol.$error"
                    class="text-danger"
              >
                  {{ v$.alto_nivel_colesterol.$errors[0]?.$message }}
                </span>
            </div>
          </div>
          <!-- End Paciente Colesterol Alto -->

          <!-- Paciente Colesterol Alto -->
          <div class="row mb-3">
            <div class="col">
              <label class="form-label" for="selectBebidasAlcoholicas">
                <font-awesome-icon :icon="['fas', 'champagne-glasses']"/>
                20. ¿Con qué frecuencia consumes bebidas alcohólicas? UNICA
              </label>

              <select id="selectBebidasAlcoholicas" v-model="healthHabitsVariables.frecuencia_bebidas_alcoholicas"
                      aria-label="One select"
                      class="form-select-sm form-select"
                      size="6"
              >
                <option disabled value="null">Seleccione una opcion</option>
                <option v-for="st in alcoholConsumptionFrequency" :key="st" :value="st.value"
                        v-text="st.label.toUpperCase()"/>
              </select>

              <span v-if="v$.frecuencia_bebidas_alcoholicas.$error"
                    class="text-danger"
              >
                  {{ v$.frecuencia_bebidas_alcoholicas.$errors[0]?.$message }}
                </span>
            </div>
          </div>
          <!-- End Paciente Colesterol Alto -->

          <!-- Enfermedades cronicas de la madre -->
          <div class="row mb-3">
            <div class="col">
              <p class="text-justify">
                21. ¿Alguno de sus parientes cercanos (por ejemplo, padres, hermanos) tiene una afección o enfermedad
                crónica no transmisible (Hipertensión Arterial, Diabetes Mellitus, Cáncer, Enfermedad Renal Crónica,
                etc.? UNICA
              </p>

              <div class="row">
                <div class="col-xl col-md col-sm-12">
                  <ul>
                    <li>
                      <fieldset class="row mb-3">
                        <legend class="col-form-label col-2 pt-0 fw-bold">MADRE:</legend>
                        <div class="col-10">

                          <div class="row">

                            <div class="col-xl-2 col-sm-12">
                              <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                                <input :id="`gridRadiosMadre-${index}`"
                                       v-model="healthHabitsVariables.afeccion_o_enfermededad_cronica__madre"
                                       :name="`gridRadiosMadre-${index}`"
                                       :value="mci.value" class="form-check-input" type="radio"
                                       @change.prevent="resetValuesIfNoOption('cual_afeccion_o_enfermededad_cronica__madre', $event)"
                                >
                                <label :for="`gridRadiosMadre-${index}`" class="form-check-label">
                                  {{ mci.label }}
                                </label>
                              </div>
                            </div>

                            <div class="col-xl-10 col-sm-12">
                              <div v-if="healthHabitsVariables.afeccion_o_enfermededad_cronica__madre === 'Si'"
                                   class="col-xl col-md col-sm-12"
                              >
                                <label class="form-label" for="inputCualEnfermedadMadre">
                                  <font-awesome-icon :icon="['fas', 'hospital-user']"/>
                                  Cuales Enfermedades?
                                </label>
                                <!--                  <p>Cuales Enfermedades?</p>-->
                                <div class="row mb-3">
                                  <div class="col d-flex justify-content-around">
                                    <VueMultiselect
                                        id="inputCualEnfermedadMadre"
                                        v-model="cualEnfermedadMadre"
                                        :options="cie10Diseases"
                                        label="ci10"
                                        placeholder="Seleccione la Enfermedad"
                                        track-by="ci10"
                                    />
                                    <!--                      <input
                                                              id="inputCualEnfermedad"
                                                              v-model="cualEnfermedadMadre"
                                                              class="form-control form-control-sm me-2"
                                                              placeholder="Escriba la enfermedad" type="text"
                                                              @keyup.prevent.enter="addIllnessToArray(1)"
                                                          />-->
                                    <button class="btn btn-sm rounded-pill btn-outline-primary"
                                            @click.prevent="addIllnessToArray(1)">
                                      <font-awesome-icon :icon="['fas', 'plus']"/>
                                    </button>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col">
                                    <h6 v-for="ill in healthHabitsVariables.cual_afeccion_o_enfermededad_cronica__madre"
                                        :key="ill" class="d-inline-block"
                                        @click.prevent="removeIllnessFromArray(1,ill)"
                                    >
                        <span class="badge text-bg-primary me-1">
                          {{ ill.ci10 }}
                          <font-awesome-icon :icon="['fas', 'x']" class="ms-2"/>
                        </span>
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>

                        </div>
                      </fieldset>
                    </li>
                  </ul>
                </div>


                <span v-if="v$.afeccion_o_enfermededad_cronica__madre.$error"
                      class="text-danger"
                >
                  {{ v$.afeccion_o_enfermededad_cronica__madre.$errors[0]?.$message }}
                </span>
              </div>
            </div>
          </div>
          <!-- End Enfermedades cronicas de la madre -->

          <!-- Enfermedades cronicas del padre -->
          <div class="row mb-3">
            <div class="col-xl col-md col-sm-12">
              <ul>
                <li>
                  <fieldset class="row mb-3">
                    <legend class="col-form-label col-2 pt-0 fw-bold">PADRE:</legend>
                    <div class="col-10">

                      <div class="row">

                        <div class="col-xl-2 col-sm-12">
                          <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                            <input :id="`gridRadiosPadre-${index}`"
                                   v-model="healthHabitsVariables.afeccion_o_enfermededad_cronica__padre"
                                   :name="`gridRadiosPadre-${index}`"
                                   :value="mci.value" class="form-check-input" type="radio"
                                   @change.prevent="resetValuesIfNoOption('cual_afeccion_o_enfermededad_cronica__padre', $event)"
                            >
                            <label :for="`gridRadiosPadre-${index}`" class="form-check-label">
                              {{ mci.label }}
                            </label>
                          </div>
                        </div>
                        <!-- /.col -->


                        <div class="col-xl-10 col-sm-12">
                          <div v-if="healthHabitsVariables.afeccion_o_enfermededad_cronica__padre === 'Si'"
                               class="col-xl col-md col-sm-12"
                          >
                            <label class="form-label" for="inputCualEnfermedadPadre">
                              <font-awesome-icon :icon="['fas', 'hospital-user']"/>
                              Cuales Enfermedades?
                            </label>
                            <div class="row mb-3">
                              <div class="col d-flex justify-content-around">
                                <VueMultiselect
                                    id="inputCualEnfermedadPadre"
                                    v-model="cualEnfermedadPadre"
                                    :options="cie10Diseases"
                                    label="ci10"
                                    placeholder="Seleccione la Enfermedad"
                                    track-by="ci10"
                                />
                                <!--                  <input
                                                      id="inputCualEnfermedadPadre"
                                                      v-model="cualEnfermedadPadre"
                                                      class="form-control me-2 form-control-sm"
                                                      placeholder="Escriba la enfermedad" type="text"
                                                      @keyup.prevent.enter="addIllnessToArray(2)"
                                                  />-->
                                <button class="btn btn-sm rounded-pill btn-outline-primary"
                                        @click.prevent="addIllnessToArray(2)">
                                  <font-awesome-icon :icon="['fas', 'plus']"/>
                                </button>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <h6 v-for="ill in healthHabitsVariables.cual_afeccion_o_enfermededad_cronica__padre"
                                    :key="ill" class="d-inline-block"
                                    @click.prevent="removeIllnessFromArray(2, ill)"
                                >
                        <span class="badge text-bg-primary me-1">
                          {{ ill.ci10 }}
                          <font-awesome-icon :icon="['fas', 'x']" class="ms-2"/>
                        </span>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- /.col -->

                      </div>
                      <!-- /.row -->

                    </div>
                  </fieldset>
                </li>
              </ul>
            </div>

            <span v-if="v$.afeccion_o_enfermededad_cronica__padre.$error"
                  class="text-danger"
            >
                  {{ v$.afeccion_o_enfermededad_cronica__padre.$errors[0]?.$message }}
                </span>
          </div>
          <!-- End Enfermedades cronicas del padre -->

          <!-- Enfermedades cronicas de los Hermanos -->
          <div class="row mb-3">
            <div class="col-xl col-md col-sm-12">
              <ul>
                <li>
                  <fieldset class="row mb-3">
                    <legend class="col-form-label col-2 pt-0 fw-bold">HERMANOS:</legend>
                    <div class="col-10">

                      <div class="row">

                        <div class="col-xl-2 col-sm-12">
                          <div v-for="(mci, index) in motherWithChronicIllness" :key="mci.value" class="form-check">
                            <input :id="`gridRadiosHermanos-${index}`"
                                   v-model="healthHabitsVariables.afeccion_o_enfermededad_cronica__hermanos"
                                   :name="`gridRadiosHermanos-${index}`"
                                   :value="mci.value" class="form-check-input" type="radio"
                                   @change.prevent="resetValuesIfNoOption('cual_afeccion_o_enfermededad_cronica__hermanos', $event)"
                            >
                            <label :for="`gridRadiosHermanos-${index}`" class="form-check-label">
                              {{ mci.label }}
                            </label>
                          </div>
                        </div>
                        <!-- /.col -->

                        <div class="col-xl-10 col-sm-12">
                          <div v-if="healthHabitsVariables.afeccion_o_enfermededad_cronica__hermanos === 'Si'"
                               class="col-xl col-md col-sm-12"
                          >
                            <label class="form-label" for="inputCualEnfermedadHermanos">
                              <font-awesome-icon :icon="['fas', 'hospital-user']"/>
                              Cuales Enfermedades?
                            </label>
                            <div class="row mb-3">
                              <div class="col d-flex justify-content-around">
                                <VueMultiselect
                                    id="inputCualEnfermedadHermanos"
                                    v-model="cualEnfermedadHermanos"
                                    :options="cie10Diseases"
                                    label="ci10"
                                    placeholder="Seleccione la Enfermedad"
                                    track-by="ci10"
                                />
                                <!--                  <input
                                                      v-model="cualEnfermedadHermanos"
                                                      class="form-control me-2 form-control-sm"
                                                      placeholder="Escriba la enfermedad" type="text"
                                                      @keyup.prevent.enter="addIllnessToArray(3)"
                                                  />-->
                                <button class="btn btn-sm rounded-pill btn-outline-primary"
                                        @click.prevent="addIllnessToArray(3)">
                                  <font-awesome-icon :icon="['fas', 'plus']"/>
                                </button>
                              </div>

                            </div>
                            <div class="row">
                              <div class="col">
                                <h6 v-for="ill in healthHabitsVariables.cual_afeccion_o_enfermededad_cronica__hermanos"
                                    :key="ill" class="d-inline-block"
                                    @click.prevent="removeIllnessFromArray(3, ill)"
                                >
                        <span class="badge text-bg-primary me-1">
                          {{ ill.ci10 }}
                          <font-awesome-icon :icon="['fas', 'x']" class="ms-2"/>
                        </span>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- /.col -->

                      </div>
                      <!-- /.row -->
                      
                    </div>
                  </fieldset>
                </li>
              </ul>
            </div>
          </div>
          <!-- End Enfermedades cronicas de los Hermanos -->

          <span v-if="v$.afeccion_o_enfermededad_cronica__hermanos.$error"
                class="text-danger"
          >
                  {{ v$.afeccion_o_enfermededad_cronica__hermanos.$errors[0]?.$message }}
                </span>
        </div>
      </div>
    </div>
  </div>
  <!-- End Health Habits Section -->
</template>

<style scoped>

</style>