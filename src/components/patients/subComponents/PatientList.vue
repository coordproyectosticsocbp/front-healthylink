<script setup>

import { onMounted, reactive, ref, watchEffect } from 'vue'
import PatientService from '@/services/patients/Patient.service.js'
import {City, Country, State} from "country-state-city";

const headers = [
  { text: 'Tipo Doc', value: 'tipo_doc' },
  { text: 'Documento', value: 'numero_documento' },
  { text: 'P. Nombre', value: 'primer_nombre' },
  { text: 'S. Nombre', value: 'segundo_nombre"' },
  { text: 'P. Apellido', value: 'primer_apellido' },
  { text: 'S. Apellido', value: 'segundo_apellido' },
  { text: 'Fech. Nacimiento', value: 'fecha_nacimiento' },
  { text: 'Fech. Expedición', value: 'fecha_expedicion' },
  { text: 'País', value: 'pais_residencia' },
  { text: 'Departamento', value: 'departamento_residencia' },
  { text: 'Ciudad', value: 'ciudad_residencia' },
  { text: 'Teléfono', value: 'telefono_celular' }
]
const patients = ref([])

const patient = reactive({
  tipo_doc: 'CC',
  numero_documento: null,
  primer_nombre: null,
  segundo_nombre: null,
  primer_apellido: null,
  segundo_apellido: null,
  fecha_nacimiento: null,
  fecha_expedicion: null,
  pais_residencia: null,
  departamento_residencia: null,
  ciudad_residencia: null,
  telefono_celular: null
})

const inputText1 = ref(null)
const countries = Country.getAllCountries();
const states = ref([])
const cities = ref([])
const errors = ref(null)

async function getPatientsFullList() {
  let response = await PatientService.getPatientsFullList()
  patients.value = response.data.data
}

function getStatesOfCountry() {
  states.value = State.getStatesOfCountry(patient.pais_residencia)
}
function getCitiesOfState() {
  console.log(patient.pais_residencia, patient.departamento_residencia)
  cities.value = City.getCitiesOfState(patient.pais_residencia, patient.departamento_residencia)
}

function createPatient() {
  console.log(patient)
}

watchEffect(() => {
  if (inputText1.value) {
    inputText1.value.focus()
  } else {
    // not mounted yet, or the element was unmounted (e.g. by v-if)
    //
  }
})

onMounted(
  getPatientsFullList
)

</script>

<template>

  <div class="row mb-2">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <button class="btn btn-sm btn-primary"
                  data-bs-target="#createPatientModal"
                  data-bs-toggle="modal"
                  title="Crear Paciente"
          >
            <font-awesome-icon :icon="['fas', 'user-plus']" />
          </button>

          <!-- Modal -->
          <div id="createPatientModal" aria-hidden="true"
               aria-labelledby="exampleModalLabel"
               class="modal fade"
               data-bs-backdrop="static"
               data-bs-keyboard="false" tabindex="-1"
          >
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 id="exampleModalLabel" class="modal-title fs-5">
                    <font-awesome-icon :icon="['fas', 'user-plus']" />
                    Crear Paciente
                  </h1>
                  <button aria-label="Close" class="btn-close"
                          data-bs-dismiss="modal"
                          type="button"
                  ></button>
                </div>
                <div class="modal-body">

                  <form class="row g-3" @submit.prevent="createPatient">

                    <!-- Tipo Documento -->
                    <div class="col-md-6">
                      <label class="form-label" for="input2">Tipo Documento:</label>
                      <input id="input2" v-model="patient.tipo_doc"
                             class="form-control"
                             placeholder="Tipo Documento"
                             type="text"
                             readonly
                      >
                    </div>

                    <!-- Documento -->
                    <div class="col-md-6">
                      <label class="form-label" for="input1">Documento:</label>
                      <input id="input1" ref="inputText1"
                             v-model="patient.numero_documento" autofocus
                             class="form-control"
                             placeholder="Documento"
                             type="number"
                      >
                    </div>

                    <!-- Nombres -->
                    <div class="col-md-6">
                      <label class="form-label" for="input3">Primer Nombre:</label>
                      <input id="input3" v-model="patient.primer_nombre"
                             class="form-control"
                             placeholder="Primer Nombre"
                             type="text"
                      >
                    </div>
                    <div class="col-md-6">
                      <label class="form-label" for="input4">Segundo Nombre:</label>
                      <input id="input4" v-model="patient.segundo_nombre"
                             class="form-control"
                             placeholder="Segundo Nombre"
                             type="text"
                      >
                    </div>

                    <!-- Apellidos -->
                    <div class="col-md-6">
                      <label class="form-label" for="input5">Primer Apellido:</label>
                      <input id="input5" v-model="patient.primer_apellido"
                             class="form-control"
                             placeholder="Primer Apellido"
                             type="text"
                      >
                    </div>
                    <div class="col-md-6">
                      <label class="form-label" for="input6">Segundo Apellido:</label>
                      <input id="input6" v-model="patient.segundo_apellido"
                             class="form-control"
                             placeholder="Segundo Apellido"
                             type="text"
                      >
                    </div>

                    <!-- Fecha de Nacimiento -->
                    <div class="col-md-6">
                      <label class="form-label" for="input7">Fecha de Nacimiento:</label>
                      <input id="input7" v-model="patient.fecha_nacimiento"
                             class="form-control"
                             type="date"
                      >
                    </div>

                    <!-- Fecha de Expedición -->
                    <div class="col-md-6">
                      <label class="form-label" for="input8">Fecha de Expedición:</label>
                      <input id="input8" v-model="patient.fecha_expedicion"
                             class="form-control"
                             type="date"
                      >
                    </div>

                    <!-- País -->
                    <div class="col-md-4">
                      <label class="form-label" for="input9">País:</label>
                      <select id="input9" v-model="patient.pais_residencia"
                              class="form-select"
                              @change="getStatesOfCountry"
                      >
                        <option selected :value="null">Seleccione el país</option>
                        <option v-for="country in countries"
                                :key="country"
                                :value="country.isoCode"
                        >
                          {{ country.name.toUpperCase() }}
                        </option>
                      </select>
                    </div>

                    <!-- Departamento -->
                    <div class="col-md-4">
                      <label class="form-label" for="input10">Departamento:</label>
                      <select id="input10" v-model="patient.departamento_residencia"
                              class="form-select"
                              @change="getCitiesOfState"
                      >
                        <option selected :value="null">Seleccione el Departamento</option>
                        <option v-for="state in states"
                                :key="state"
                                :value="state.isoCode"
                        >
                          {{ state.name.toUpperCase() }}
                        </option>
                      </select>
                    </div>

                    <!-- Ciudad -->
                    <div class="col-md-4">
                      <label class="form-label" for="input11">Ciudad:</label>
                      <select id="input11" v-model="patient.ciudad_residencia" class="form-select">
                        <option selected :value="null">Seleccione la Ciudad</option>
                        <option v-for="city in cities"
                                :key="city"
                                :value="city.countryCode"
                        >
                          {{ city.name.toUpperCase() }}
                        </option>
                      </select>
                    </div>

                    <hr />

                    <div class="col-md-12 mt-3 text-end">
                      <button class="btn btn-sm btn-primary" type="submit">
                        <font-awesome-icon :icon="['fas', 'user-plus']" />
                        Crear Paciente
                      </button>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <EasyDataTable :headers="headers" :items="patients" />
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>