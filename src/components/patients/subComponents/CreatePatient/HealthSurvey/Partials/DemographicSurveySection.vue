<script setup>

import {etnias} from "@/utils/const/patientHealthSurvey.js";
import {computed, onMounted, ref} from "vue";
import useLocalStorage from "@/composables/useLocalStorage.js";
import {minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {calculateAgeTwo} from "@/utils/helpers/ageCalculate.js";
import {toast} from "vue3-toastify";

const demographicVariables = useLocalStorage({
  edad: '',
  altura: '',
  peso: '',
  etnia: null,
  pais_nacimiento: null,
  ciudad_nacimiento: 'N/A',
  pais_abuelo_materno: null,
  ciudad_abuelo_materno: 'N/A',
  pais_abuela_materna: null,
  ciudad_abuela_materna: 'N/A',
  pais_abuelo_paterno: null,
  ciudad_abuelo_paterno: 'N/A',
  pais_abuela_paterna: null,
  ciudad_abuela_paterna: 'N/A',
  pais_residencia_paciente: null,
  ciudad_residencia_paciente: 'N/A',
}, 'patientDemographicInformation')

const rules = computed(() => {
  return {
    edad: {required},
    altura: {required, minLength: minLength(2)},
    peso: {required},
    etnia: {required},
    pais_nacimiento: {required},
    //ciudad_nacimiento: {required},
    pais_abuelo_materno: {required},
    //ciudad_abuelo_materno: {required},
    pais_abuela_materna: {required},
    //ciudad_abuela_materna: {required},
    pais_abuelo_paterno: {required},
    //ciudad_abuelo_paterno: {required},
    pais_abuela_paterna: {required},
    //ciudad_abuela_paterna: {required},
    pais_residencia_paciente: {required},
    //ciudad_residencia_paciente: {required},
  }
})
const storageCountryVal = window.localStorage.getItem('countries')
const patientStorage = window.localStorage.getItem('patientForm')

const v$ = useVuelidate(rules, demographicVariables)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    window.localStorage.setItem('demographicHasError', JSON.stringify({
      value: true
    }))
    toast.error('Información demográfica INCOMPLETA')
    return false
  }
  // If the form is valid, perform some action with the form data
  if (window.localStorage.getItem('demographicHasError')) window.localStorage.removeItem('demographicHasError')
  return true;
}

const patientIsIndigenous = ref(false)

/** Logic */
const countriesObject = computed(() => {
  let arrayCountry = [];
  if (storageCountryVal) arrayCountry = JSON.parse(storageCountryVal)

  return arrayCountry
})

const patientAge = () => {
  if (patientStorage) {
    const birthDate = JSON.parse(patientStorage).fecha_nacimiento
    demographicVariables.value.edad = calculateAgeTwo(new Date(birthDate))
  }
}
const onIndigenousSelected = (event) => {
  if (event.target.value === 'Pueblos Indígenas') {
    patientIsIndigenous.value = true
  } else {
    patientIsIndigenous.value = false
  }
}

defineExpose({
  handleSubmit
})

onMounted(patientAge)

</script>

<template>

  <!-- Survey Demographic Section -->
  <div class="row mb-3">
    <div class="col">

      <div class="card">
        <div class="card-body">

          <div class="row mb-3">
            <div class="col">
              <ol class="mb-0" type="A">
                <li>
                  <p class="fw-bold">DEMOGRAFÍA:</p>
                </li>
              </ol>
            </div>
          </div>

          <div class="row mb-3 g-3 align-items-center">
            <div class="col-auto">
              <label class="col-form-label" for="inputAge">1. EDAD:</label>
              <input id="inputAge" v-model="demographicVariables.edad" aria-describedby="ageHelpInline"
                     class="form-control"
                     disabled
                     placeholder="Edad en años"
                     readonly
                     type="number"
              >
            </div>
          </div>

          <div class="row mb-3 g-3 align-items-center">
            <div class="col-xl-6 col-sm-12">
              <label class="col-form-label" for="inputHeight">2. ALTURA:</label>
              <input id="inputHeight" v-model="demographicVariables.altura" aria-describedby="ageHelpInline"
                     class="form-control"
                     placeholder="(Unidad: cm)"
                     type="number"
              >
              <span v-if="v$.altura.$error"
                    class="text-danger"
              >
                  {{ v$.altura.$errors[0]?.$message }}
                </span>
            </div>
            <div class="col-xl-6 col-sm-12">
              <label class="col-form-label" for="inputWeight">3. PESO:</label>
              <input id="inputWeight" v-model="demographicVariables.peso" aria-describedby="ageHelpInline"
                     class="form-control"
                     placeholder="(Unidad: Kg)"
                     required
                     type="number"
              >
              <span v-if="v$.peso.$error"
                    class="text-danger"
              >
                  {{ v$.peso.$errors[0]?.$message }}
                </span>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <label class="form-label" for="selectEtnia">
                <font-awesome-icon :icon="['fas', 'people-group']"/>
                4. ETNIA:
              </label>

              <select id="selectEtnia" v-model="demographicVariables.etnia"
                      aria-label="One select"
                      class="form-select mb-3"
                      size="6"
                      @change.prevent="onIndigenousSelected"
              >
                <option disabled selected value="null">Seleccione su etnia</option>
                <option v-for="et in etnias" :key="et" :value="et.value" v-text="et.label.toUpperCase()"/>
              </select>

              <span v-if="v$.etnia.$error"
                    class="text-danger"
              >
                  {{ v$.etnia.$errors[0]?.$message }}
                </span>

              <div v-if="patientIsIndigenous">
                <label class="form-label" for="cualPuebloIndigena">A cual pueblo indígena pertenece?:</label>
                <textarea id="cualPuebloIndigena" class="form-control" rows="2"/>
              </div>
            </div>
          </div>

          <div class="row mb-3 g-3 align-items-center">

            <!-- Paciente Pais, Ciudad Nacimiento -->
            <div class="col-xl-6 col-sm-12">
              <label class="col-form-label" for="paisNacimientoEncuestado">
                5. PAÍS DE NACIMIENTO:
              </label>
              <select
                  id="paisNacimientoEncuestado" v-model="demographicVariables.pais_nacimiento"
                  class="form-select"
              >
                <option :value="null" disabled selected>Seleccione el país</option>
                <option v-for="country in countriesObject"
                        :key="country.id"
                        :value="country.name"
                        v-text="country.name"
                />
              </select>

              <span v-if="v$.pais_nacimiento.$error"
                    class="text-danger"
              >
                  {{ v$.pais_nacimiento.$errors[0]?.$message }}
                </span>

            </div><!-- End Paciente Pais, Ciudad Nacimiento -->

            <!-- Abuelo Materno Pais, Ciudad Nacimiento -->
            <div class="col-xl-6 col-sm-12">
              <label class="col-form-label" for="paisNacimientoAbueloMaterno">
                7. PAÍS DE NACIMIENTO DE ABUELO MATERNO:
              </label>
              <select
                  id="paisNacimientoAbueloMaterno" v-model="demographicVariables.pais_abuelo_materno"
                  class="form-select"
              >
                <option :value="null" disabled selected>Seleccione el país</option>
                <option v-for="country in countriesObject"
                        :key="country.id"
                        :value="country.name"
                        v-text="country.name"
                />
              </select>

              <span v-if="v$.pais_abuelo_materno.$error"
                    class="text-danger"
              >
                  {{ v$.pais_abuelo_materno.$errors[0]?.$message }}
                </span>
            </div><!-- End Abuelo Materno Pais, Ciudad Nacimiento -->

          </div>


          <div class="row mb-3 g-3 align-items-center">

            <!-- Abuela Materna Pais, Ciudad Nacimiento -->
            <div class="col-xl-6 col-sm-12">
              <label class="col-form-label" for="paisNacimientoAbuelaMaterna">
                9. PAÍS DE NACIMIENTO DE ABUELA MATERNA:
              </label>
              <select
                  id="paisNacimientoAbuelaMaterna" v-model="demographicVariables.pais_abuela_materna"
                  class="form-select"
              >
                <option :value="null" disabled selected>Seleccione el país</option>
                <option v-for="country in countriesObject"
                        :key="country.id"
                        :value="country.name"
                        v-text="country.name"
                />
              </select>

              <span v-if="v$.pais_abuela_materna.$error"
                    class="text-danger"
              >
                  {{ v$.pais_abuela_materna.$errors[0]?.$message }}
                </span>
            </div><!-- End Abuela Materna Pais, Ciudad Nacimiento -->

            <!-- Abuelo Paterno Pais, Ciudad Nacimiento -->
            <div class="col-xl-6 col-sm-12">
              <label class="col-form-label" for="paisNacimientoAbueloPaterno">
                11. PAÍS DE NACIMIENTO DE ABUELO PATERNO:
              </label>
              <select
                  id="paisNacimientoAbueloPaterno" v-model="demographicVariables.pais_abuelo_paterno"
                  class="form-select"
              >
                <option :value="null" disabled selected>Seleccione el país</option>
                <option v-for="country in countriesObject"
                        :key="country.id"
                        :value="country.name"
                        v-text="country.name"
                />
              </select>

              <span v-if="v$.pais_abuelo_paterno.$error"
                    class="text-danger"
              >
                  {{ v$.pais_abuelo_paterno.$errors[0]?.$message }}
                </span>
            </div><!-- End Abuelo Paterno Pais, Ciudad Nacimiento -->

          </div>


          <div class="row mb-3 g-3 align-items-center">

            <!-- Abuela Paterna Pais, Ciudad Nacimiento -->
            <div class="col-xl-6 col-sm-12">
              <label class="col-form-label" for="paisNacimientoAbuelaPaterna">
                13. PAÍS DE NACIMIENTO DE ABUELA PATERNA:
              </label>
              <select
                  id="paisNacimientoAbuelaPaterna" v-model="demographicVariables.pais_abuela_paterna"
                  class="form-select"
              >
                <option :value="null" disabled selected>Seleccione el país</option>
                <option v-for="country in countriesObject"
                        :key="country.id"
                        :value="country.name"
                        v-text="country.name"
                />
              </select>

              <span v-if="v$.pais_abuela_paterna.$error"
                    class="text-danger"
              >
                  {{ v$.pais_abuela_paterna.$errors[0]?.$message }}
                </span>
            </div> <!-- End Abuela Paterna Pais, Ciudad Nacimiento -->

            <!-- Paciente Pais, Ciudad Residencia -->
            <div class="col-xl-6 col-sm-12">
              <label class="col-form-label" for="paisResideciaEncuestado">
                15. CUAL ES SU PAÍS DE RESIDENCIA?:
              </label>
              <select
                  id="paisResideciaEncuestado" v-model="demographicVariables.pais_residencia_paciente"
                  class="form-select"
              >
                <option :value="null" disabled selected>Seleccione el país</option>
                <option v-for="country in countriesObject"
                        :key="country.id"
                        :value="country.name"
                        v-text="country.name"
                />
              </select>

              <span v-if="v$.pais_residencia_paciente.$error"
                    class="text-danger"
              >
                  {{ v$.pais_residencia_paciente.$errors[0]?.$message }}
                </span>
            </div> <!-- End Paciente Pais, Ciudad Residencia -->

          </div>

          <!--           Paciente Pais, Ciudad Residencia
                    <div class="row mb-3 g-3 align-items-center">
                      <div class="col-xl-6 col-sm-12">
                        <label class="col-form-label" for="paisResideciaEncuestado">
                          15. CUAL ES SU PAÍS DE RESIDENCIA?:
                        </label>
                        <select
                            id="inputState" v-model="demographicVariables.pais_residencia_paciente"
                            class="form-select"
                        >
                          <option :value="null" disabled selected>Seleccione el país</option>
                          <option v-for="country in countriesObject"
                                  :key="country.id"
                                  :value="country.name"
                                  v-text="country.name"
                          />
                        </select>

                        <span v-if="v$.pais_residencia_paciente.$error"
                              class="text-danger"
                        >
                            {{ v$.pais_residencia_paciente.$errors[0]?.$message }}
                          </span>
                      </div>
                    </div>
                     End Paciente Pais, Ciudad Residencia -->


        </div>

      </div>


    </div>
  </div>
  <!-- Survey Demographic Section -->
</template>

<style scoped>

</style>