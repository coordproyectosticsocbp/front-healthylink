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
  pais_nacimiento: '',
  ciudad_nacimiento: '',
  pais_abuelo_materno: '',
  ciudad_abuelo_materno: '',
  pais_abuela_materna: '',
  ciudad_abuela_materna: '',
  pais_abuelo_paterno: '',
  ciudad_abuelo_paterno: '',
  pais_abuela_paterna: '',
  ciudad_abuela_paterna: '',
  pais_residencia_paciente: '',
  ciudad_residencia_paciente: '',
}, 'patientDemographicInformation')

const rules = computed(() => {
  return {
    edad: {required},
    altura: {required, minLength: minLength(2)},
    peso: {required},
    etnia: {required},
    pais_nacimiento: {required},
    ciudad_nacimiento: {required},
    pais_abuelo_materno: {required},
    ciudad_abuelo_materno: {required},
    pais_abuela_materna: {required},
    ciudad_abuela_materna: {required},
    pais_abuelo_paterno: {required},
    ciudad_abuelo_paterno: {required},
    pais_abuela_paterna: {required},
    ciudad_abuela_paterna: {required},
    pais_residencia_paciente: {required},
    ciudad_residencia_paciente: {required},
  }
})
const storageCountryVal = window.localStorage.getItem('countries')
const storageCitiesVal = window.localStorage.getItem('cities')
const patientStorage = window.localStorage.getItem('patientForm')

const v$ = useVuelidate(rules, demographicVariables)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    window.localStorage.setItem('demographicHasError', true)
    toast.error('Información demográfica INCOMPLETA')
    return false
  }
  // If the form is valid, perform some action with the form data
  window.localStorage.setItem('demographicHasError', false)
  return true;
}

const patientIsIndigenous = ref(false)

/** Logic */
const countriesObject = computed(() => {
  let arrayCountry = [];
  if (storageCountryVal) arrayCountry = JSON.parse(storageCountryVal)

  return arrayCountry
})

const citiesObject = computed(() => {
  let arrayCountries = [];
  if (storageCitiesVal) arrayCountries = JSON.parse(storageCitiesVal)
  return arrayCountries
})

const patientAge = () => {
  if (patientStorage) {
    const birthDate = JSON.parse(patientStorage).fecha_nacimiento
    demographicVariables.value.edad = calculateAgeTwo(new Date(birthDate))
  }
}
/*
const getCityOfBirth = (event) => {
  console.log(event.target.value)
}
*/

const onIndigenousSelected = (event) => {
  if (event.target.value === 'Pueblos Indígenas') {
    patientIsIndigenous.value = true
  } else {
    patientIsIndigenous.value = false
  }
}

/*const alertEvent = (message) => {
  console.log(message)
}*/

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
              <label class="col-form-label" for="inputAge">EDAD:</label>
              <input id="inputAge" v-model="demographicVariables.edad" aria-describedby="ageHelpInline"
                     class="form-control form-control-sm"
                     disabled
                     placeholder="Edad en años"
                     readonly
                     type="number"
              >
            </div>
          </div>

          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label class="col-form-label" for="inputHeight">ALTURA:</label>
              <input id="inputHeight" v-model="demographicVariables.altura" aria-describedby="ageHelpInline"
                     class="form-control form-control-sm"
                     placeholder="(Unidad: cm)"
                     type="number"
              >
              <span v-if="v$.altura.$error"
                    class="text-danger"
              >
                  {{ v$.altura.$errors[0]?.$message }}
                </span>
            </div>
            <div class="col">
              <label class="col-form-label" for="inputWeight">PESO:</label>
              <input id="inputWeight" v-model="demographicVariables.peso" aria-describedby="ageHelpInline"
                     class="form-control form-control-sm"
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
                ETNIA:
              </label>

              <select id="selectEtnia" v-model="demographicVariables.etnia"
                      aria-label="One select"
                      class="form-select-sm form-select mb-3"
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

          <!-- Paciente Pais, Ciudad Nacimiento -->
          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label class="col-form-label" for="paisNacimientoEncuestado">
                PAÍS DE NACIMIENTO:
              </label>
              <input id="paisNacimientoEncuestado" v-model="demographicVariables.pais_nacimiento"
                     class="form-control form-control-sm"
                     list="datalistOptions"
                     placeholder="Escribe el País"
              >
              <!--              @change="getCityOfBirth($event)"-->
              <datalist id="datalistOptions">
                <option v-for="country in countriesObject" :key="country.id" :value="country.name"
                        v-text="country.name"/>
              </datalist>

              <span v-if="v$.pais_nacimiento.$error"
                    class="text-danger"
              >
                  {{ v$.pais_nacimiento.$errors[0]?.$message }}
                </span>

            </div>
            <div class="col">
              <label class="col-form-label" for="ciudadNacimientoEncuestado">
                CIUDAD DE NACIMIENTO:
              </label>
              <input id="ciudadNacimientoEncuestado" v-model="demographicVariables.ciudad_nacimiento"
                     class="form-control form-control-sm"
                     list="datalistOptionsCiudadNacimiento"
                     placeholder="Escribe la Ciudad"
              >
              <datalist id="datalistOptionsCiudadNacimiento">
                <option v-for="city in citiesObject" :key="city.id" :value="city.name.toUpperCase()"/>
              </datalist>

              <span v-if="v$.ciudad_nacimiento.$error"
                    class="text-danger"
              >
                  {{ v$.ciudad_nacimiento.$errors[0]?.$message }}
                </span>
            </div>
          </div>
          <!-- End Paciente Pais, Ciudad Nacimiento -->

          <!-- Abuelo Materno Pais, Ciudad Nacimiento -->
          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label class="col-form-label" for="paisNacimientoAbueloMaterno">
                PAÍS DE NACIMIENTO DE ABUELO MATERNO:
              </label>
              <input id="paisNacimientoAbueloMaterno" v-model="demographicVariables.pais_abuelo_materno"
                     class="form-control form-control-sm"
                     list="datalistOptions"
                     placeholder="Escribe el País"
              >
              <datalist id="datalistOptions">
                <option v-for="country in countriesObject" :key="country.id" :value="country.name"
                        v-text="country.name"/>
              </datalist>

              <span v-if="v$.pais_abuelo_materno.$error"
                    class="text-danger"
              >
                  {{ v$.pais_abuelo_materno.$errors[0]?.$message }}
                </span>
            </div>
            <div class="col">
              <label class="col-form-label" for="ciudadNacimientoAbueloMaterno">
                CIUDAD DE NACIMIENTO DE ABUELO MATERNO:
              </label>
              <input id="ciudadNacimientoAbueloMaterno" v-model="demographicVariables.ciudad_abuelo_materno"
                     class="form-control form-control-sm"
                     list="datalistOptionsCiudadNacimientoAbueloMaterno"
                     placeholder="Escribe la Ciudad"
              >
              <datalist id="datalistOptionsCiudadNacimientoAbueloMaterno">
                <option v-for="city in citiesObject" :key="city.id" :value="city.name.toUpperCase()"/>
              </datalist>

              <span v-if="v$.ciudad_abuelo_materno.$error"
                    class="text-danger"
              >
                  {{ v$.ciudad_abuelo_materno.$errors[0]?.$message }}
                </span>
            </div>
          </div> <!-- End Abuelo Materno Pais, Ciudad Nacimiento -->


          <!-- Abuela Materna Pais, Ciudad Nacimiento -->
          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label class="col-form-label" for="paisNacimientoAbuelaMaterna">
                PAÍS DE NACIMIENTO DE ABUELA MATERNA:
              </label>
              <input id="paisNacimientoAbuelaMaterna" v-model="demographicVariables.pais_abuela_materna"
                     class="form-control form-control-sm"
                     list="datalistOptions"
                     placeholder="Escribe el País"
              >
              <datalist id="datalistOptions">
                <option v-for="country in countriesObject" :key="country.id" :value="country.name"
                        v-text="country.name"/>
              </datalist>

              <span v-if="v$.pais_abuela_materna.$error"
                    class="text-danger"
              >
                  {{ v$.pais_abuela_materna.$errors[0]?.$message }}
                </span>
            </div>
            <div class="col">
              <label class="col-form-label" for="ciudadNacimientoAbuelaMaterna">
                CIUDAD DE NACIMIENTO DE ABUELA MATERNA:
              </label>
              <input id="ciudadNacimientoAbuelaMaterna" v-model="demographicVariables.ciudad_abuela_materna"
                     class="form-control form-control-sm"
                     list="datalistOptionsCiudadNacimientoAbuelaMaterna"
                     placeholder="Escribe la Ciudad"
              >
              <datalist id="datalistOptionsCiudadNacimientoAbuelaMaterna">
                <option v-for="city in citiesObject" :key="city.id" :value="city.name.toUpperCase()"/>
              </datalist>

              <span v-if="v$.ciudad_abuela_materna.$error"
                    class="text-danger"
              >
                  {{ v$.ciudad_abuela_materna.$errors[0]?.$message }}
                </span>
            </div>
          </div> <!-- End Abuela Materna Pais, Ciudad Nacimiento -->


          <!-- Abuelo Paterno Pais, Ciudad Nacimiento -->
          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label class="col-form-label" for="paisNacimientoAbueloPaterno">
                PAÍS DE NACIMIENTO DE ABUELO PATERNO:
              </label>
              <input id="paisNacimientoAbueloPaterno" v-model="demographicVariables.pais_abuelo_paterno"
                     class="form-control form-control-sm"
                     list="datalistOptions"
                     placeholder="Escribe el País"
              >
              <datalist id="datalistOptions">
                <option v-for="country in countriesObject" :key="country.id" :value="country.name"
                        v-text="country.name"/>
              </datalist>

              <span v-if="v$.pais_abuelo_paterno.$error"
                    class="text-danger"
              >
                  {{ v$.pais_abuelo_paterno.$errors[0]?.$message }}
                </span>
            </div>
            <div class="col">
              <label class="col-form-label" for="ciudadNacimientoAbueloPaterno">
                CIUDAD DE NACIMIENTO DE ABUELO PATERNO:
              </label>
              <input id="ciudadNacimientoAbueloPaterno" v-model="demographicVariables.ciudad_abuelo_paterno"
                     class="form-control form-control-sm"
                     list="datalistOptionsCiudadNacimientoAbueloPaterno"
                     placeholder="Escribe la Ciudad"
              >
              <datalist id="datalistOptionsCiudadNacimientoAbueloPaterno">
                <option v-for="city in citiesObject" :key="city.id" :value="city.name.toUpperCase()"/>
              </datalist>

              <span v-if="v$.ciudad_abuelo_paterno.$error"
                    class="text-danger"
              >
                  {{ v$.ciudad_abuelo_paterno.$errors[0]?.$message }}
                </span>
            </div>
          </div> <!-- End Abuelo Paterno Pais, Ciudad Nacimiento -->


          <!-- Abuela Paterna Pais, Ciudad Nacimiento -->
          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label class="col-form-label" for="paisNacimientoAbuelaPaterna">
                PAÍS DE NACIMIENTO DE ABUELA PATERNA:
              </label>
              <input id="paisNacimientoAbuelaPaterna" v-model="demographicVariables.pais_abuela_paterna"
                     class="form-control form-control-sm"
                     list="datalistOptions"
                     placeholder="Escribe el País"
              >
              <datalist id="datalistOptions">
                <option v-for="country in countriesObject" :key="country.id" :value="country.name"
                        v-text="country.name"/>
              </datalist>

              <span v-if="v$.pais_abuela_paterna.$error"
                    class="text-danger"
              >
                  {{ v$.pais_abuela_paterna.$errors[0]?.$message }}
                </span>
            </div>
            <div class="col">
              <label class="col-form-label" for="ciudadNacimientoAbuelaPaterna">
                CIUDAD DE NACIMIENTO DE ABUELA PATERNA:
              </label>
              <input id="ciudadNacimientoAbuelaPaterna" v-model="demographicVariables.ciudad_abuela_paterna"
                     class="form-control form-control-sm"
                     list="datalistOptionsCiudadNacimientoAbuelaPaterna"
                     placeholder="Escribe la Ciudad"
              >
              <datalist id="datalistOptionsCiudadNacimientoAbuelaPaterna">
                <option v-for="city in citiesObject" :key="city.id" :value="city.name.toUpperCase()"/>
              </datalist>

              <span v-if="v$.ciudad_abuela_paterna.$error"
                    class="text-danger"
              >
                  {{ v$.ciudad_abuela_paterna.$errors[0]?.$message }}
                </span>
            </div>
          </div> <!-- End Abuela Paterna Pais, Ciudad Nacimiento -->

          <!-- Paciente Pais, Ciudad Residencia -->
          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label class="col-form-label" for="paisResideciaEncuestado">
                CUAL ES SU PAÍS DE RESIDENCIA?:
              </label>
              <input id="paisResideciaEncuestado" v-model="demographicVariables.pais_residencia_paciente"
                     class="form-control form-control-sm"
                     list="datalistOptions"
                     placeholder="Escribe el País"
              >
              <!--              @change="getCityOfBirth($event)"-->
              <datalist id="datalistOptions">
                <option v-for="country in countriesObject" :key="country.id" :value="country.name"
                        v-text="country.name"/>
              </datalist>

              <span v-if="v$.pais_residencia_paciente.$error"
                    class="text-danger"
              >
                  {{ v$.pais_residencia_paciente.$errors[0]?.$message }}
                </span>
            </div>
            <div class="col">
              <label class="col-form-label" for="ciudadResideciaEncuestado">
                CUAL ES SU CIUDAD DE RESIDENCIA?:
              </label>
              <input id="ciudadResideciaEncuestado" v-model="demographicVariables.ciudad_residencia_paciente"
                     class="form-control form-control-sm"
                     list="datalistOptionsCiudadResideciaEncuestado"
                     placeholder="Escribe la Ciudad"
              >
              <datalist id="datalistOptionsCiudadResideciaEncuestado">
                <option v-for="city in citiesObject" :key="city.id" :value="city.name.toUpperCase()"/>
              </datalist>

              <span v-if="v$.ciudad_residencia_paciente.$error"
                    class="text-danger"
              >
                  {{ v$.ciudad_residencia_paciente.$errors[0]?.$message }}
                </span>
            </div>
          </div>
          <!-- End Paciente Pais, Ciudad Residencia -->


        </div>

      </div>


    </div>
  </div>
  <!-- Survey Demographic Section -->
</template>

<style scoped>

</style>