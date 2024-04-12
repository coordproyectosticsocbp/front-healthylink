<script setup>

import {etnias} from "@/utils/const/patientHealthSurvey.js";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import useLocalStorage from "@/composables/useLocalStorage.js";

const store = useStore()

const demographicVariables = useLocalStorage({
  edad: null,
  altura: null,
  peso: null,
  etnia: null,
  pais_nacimiento: null,
  ciudad_nacimiento: null,
  pais_abuelo_materno: null,
  ciudad_abuelo_materno: null,
  pais_abuela_materna: null,
  ciudad_abuela_materna: null,
  pais_abuelo_paterno: null,
  ciudad_abuelo_paterno: null,
  pais_abuela_paterna: null,
  ciudad_abuela_paterna: null,
  pais_residencia_paciente: null,
  ciudad_residencia_paciente: null,
}, 'patientDemographicInformation')

const patientIsIndigenous = ref(false)
const countriesObject = computed(() => store.getters["geocoding/countries"])
const citiesObject = ref([])
const getCityOfBirth = (event) => {
  console.log(event.target.value)
}

const onIndigenousSelected = (event) => {
  if (event.target.value === 'Pueblos Indígenas') {
    patientIsIndigenous.value = true
  } else {
    patientIsIndigenous.value = false
  }
}

</script>

<template>

  <!-- Survey Demographic Section -->
  <div class="row mb-3">
    <div class="col">

      <div class="card">
        <div class="card-body">

          <div class="row mb-3">
            <div class="col">
              <ol type="A" class="mb-0">
                <li>
                  <p class="fw-bold">DEMOGRAFÍA:</p>
                </li>
              </ol>
            </div>
          </div>

          <div class="row mb-3 g-3 align-items-center">
            <div class="col-auto">
              <label for="inputAge" class="col-form-label">EDAD:</label>
              <input type="number" id="inputAge" class="form-control form-control-sm" aria-describedby="ageHelpInline"
                     placeholder="Edad en años"
                     v-model="demographicVariables.edad"
              >
            </div>
          </div>

          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label for="inputAge" class="col-form-label">ALTURA:</label>
              <input type="number" id="inputAge" class="form-control form-control-sm" aria-describedby="ageHelpInline"
                     placeholder="(Unidad: cm)"
                     v-model="demographicVariables.altura"
              >
            </div>
            <div class="col">
              <label for="inputAge" class="col-form-label">PESO:</label>
              <input type="number" id="inputAge" class="form-control form-control-sm" aria-describedby="ageHelpInline"
                     placeholder="(Unidad: Kg)"
                     v-model="demographicVariables.peso"
              >
            </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <label for="formGroupExampleInput2" class="form-label">
                <font-awesome-icon :icon="['fas', 'people-group']"/>
                ETNIA:
              </label>

              <select class="form-select-sm form-select mb-3" aria-label="One select"
                      v-model="demographicVariables.etnia"
                      size="6"
                      @change.prevent="onIndigenousSelected"
              >
                <option selected value="null">Seleccione su etnia</option>
                <option v-for="et in etnias" :key="et" v-text="et.label.toUpperCase()" :value="et.value"/>
              </select>

              <div v-if="patientIsIndigenous">
                <label for="exampleFormControlTextarea1" class="form-label">A cual pueblo indígena pertenece?:</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" />
              </div>
            </div>
          </div>

          <!-- Paciente Pais, Ciudad Nacimiento -->
          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label for="exampleDataList" class="col-form-label">PAÍS DE NACIMIENTO:</label>
              <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Escribe el País"
                     v-model="demographicVariables.pais_nacimiento"
                     @change="getCityOfBirth($event)"
              >
              <datalist id="datalistOptions">
                <option v-for="country in countriesObject" :key="country.id" :value="country.name" v-text="country.name" />
              </datalist>
            </div>
            <div class="col">
              <label for="inputAge" class="col-form-label">CIUDAD DE NACIMIENTO:</label>
              <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Escribe la Ciudad"
                     v-model="demographicVariables.ciudad_nacimiento"
              >
              <datalist id="datalistOptions">
                <option v-for="city in citiesObject" :key="city.id" :value="city.name" v-text="city.name" />
              </datalist>
            </div>
          </div>
          <!-- End Paciente Pais, Ciudad Nacimiento -->

          <!-- Abuelo Materno Pais, Ciudad Nacimiento -->
          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label for="exampleDataList" class="col-form-label">PAÍS DE NACIMIENTO DE ABUELO MATERNO:</label>
              <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Escribe el País"
                     v-model="demographicVariables.pais_abuelo_materno"
              >
              <datalist id="datalistOptions">
                <option v-for="country in countriesObject" :key="country.id" :value="country.name" v-text="country.name" />
              </datalist>
            </div>
            <div class="col">
              <label for="inputAge" class="col-form-label">CIUDAD DE NACIMIENTO DE ABUELO MATERNO:</label>
              <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Escribe la Ciudad"
                     v-model="demographicVariables.ciudad_abuelo_materno"
              >
              <datalist id="datalistOptions">
                <option v-for="city in citiesObject" :key="city.id" :value="city.name" v-text="city.name" />
              </datalist>
            </div>
          </div> <!-- End Abuelo Materno Pais, Ciudad Nacimiento -->


          <!-- Abuela Materna Pais, Ciudad Nacimiento -->
          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label for="exampleDataList" class="col-form-label">PAÍS DE NACIMIENTO DE ABUELA MATERNA:</label>
              <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Escribe el País"
                     v-model="demographicVariables.pais_abuela_materna"
              >
              <datalist id="datalistOptions">
                <option v-for="country in countriesObject" :key="country.id" :value="country.name" v-text="country.name" />
              </datalist>
            </div>
            <div class="col">
              <label for="inputAge" class="col-form-label">CIUDAD DE NACIMIENTO DE ABUELA MATERNA:</label>
              <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Escribe la Ciudad"
                     v-model="demographicVariables.ciudad_abuela_materna"
              >
              <datalist id="datalistOptions">
                <option v-for="city in citiesObject" :key="city.id" :value="city.name" v-text="city.name" />
              </datalist>
            </div>
          </div> <!-- End Abuela Materna Pais, Ciudad Nacimiento -->


          <!-- Abuelo Paterno Pais, Ciudad Nacimiento -->
          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label for="exampleDataList" class="col-form-label">PAÍS DE NACIMIENTO DE ABUELO PATERNO:</label>
              <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Escribe el País"
                     v-model="demographicVariables.pais_abuelo_paterno"
              >
              <datalist id="datalistOptions">
                <option v-for="country in countriesObject" :key="country.id" :value="country.name" v-text="country.name" />
              </datalist>
            </div>
            <div class="col">
              <label for="inputAge" class="col-form-label">CIUDAD DE NACIMIENTO DE ABUELO PATERNO:</label>
              <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Escribe la Ciudad"
                     v-model="demographicVariables.ciudad_abuelo_paterno"
              >
              <datalist id="datalistOptions">
                <option v-for="city in citiesObject" :key="city.id" :value="city.name" v-text="city.name" />
              </datalist>
            </div>
          </div> <!-- End Abuelo Paterno Pais, Ciudad Nacimiento -->


          <!-- Abuela Paterna Pais, Ciudad Nacimiento -->
          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label for="exampleDataList" class="col-form-label">PAÍS DE NACIMIENTO DE ABUELA PATERNA:</label>
              <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Escribe el País"
                     v-model="demographicVariables.pais_abuela_materna"
              >
              <datalist id="datalistOptions">
                <option v-for="country in countriesObject" :key="country.id" :value="country.name" v-text="country.name" />
              </datalist>
            </div>
            <div class="col">
              <label for="inputAge" class="col-form-label">CIUDAD DE NACIMIENTO DE ABUELA PATERNA:</label>
              <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Escribe la Ciudad"
                     v-model="demographicVariables.ciudad_abuela_paterna"
              >
              <datalist id="datalistOptions">
                <option v-for="city in citiesObject" :key="city.id" :value="city.name" v-text="city.name" />
              </datalist>
            </div>
          </div> <!-- End Abuela Paterna Pais, Ciudad Nacimiento -->

          <!-- Paciente Pais, Ciudad Residencia -->
          <div class="row mb-3 g-3 align-items-center">
            <div class="col">
              <label for="exampleDataList" class="col-form-label">CUAL ES SU PAÍS DE RESIDENCIA?:</label>
              <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Escribe el País"
                     v-model="demographicVariables.pais_residencia_paciente"
                     @change="getCityOfBirth($event)"
              >
              <datalist id="datalistOptions">
                <option v-for="country in countriesObject" :key="country.id" :value="country.name" v-text="country.name" />
              </datalist>
            </div>
            <div class="col">
              <label for="inputAge" class="col-form-label">CUAL ES SU CIUDAD DE RESIDENCIA?:</label>
              <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Escribe la Ciudad"
                     v-model="demographicVariables.ciudad_residencia_paciente"
              >
              <datalist id="datalistOptions">
                <option v-for="city in citiesObject" :key="city.id" :value="city.name" v-text="city.name" />
              </datalist>
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