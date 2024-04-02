<script setup>

import {onMounted, reactive, ref} from 'vue'
import PatientService from '@/services/patients/Patient.service.js'
import {City, Country, State} from "country-state-city";
import {documentTypes} from "@/utils/const/documentTypes.js";
import {userGender} from "@/utils/const/userGender.js";
import {getError} from "@/utils/helpers/getError.js";
import {toast} from "vue3-toastify";

const headers = [
  {text: 'Tipo Doc', value: 'tipo_doc'},
  {text: 'Documento', value: 'numero_documento'},
  {text: 'P. Nombre', value: 'primer_nombre'},
  {text: 'S. Nombre', value: 'segundo_nombre"'},
  {text: 'P. Apellido', value: 'primer_apellido'},
  {text: 'S. Apellido', value: 'segundo_apellido'},
  {text: 'Fech. Nacimiento', value: 'fecha_nacimiento'},
  {text: 'Fech. Expedición', value: 'fecha_expedicion'},
  {text: 'País', value: 'pais_residencia'},
  {text: 'Departamento', value: 'departamento_residencia'},
  {text: 'Ciudad', value: 'ciudad_residencia'},
  {text: 'Teléfono', value: 'telefono_celular'}
]
const patients = ref([])

const patient = reactive({
  tipo_doc: null,
  numero_documento: null,
  primer_nombre: null,
  segundo_nombre: null,
  primer_apellido: null,
  segundo_apellido: null,
  fecha_nacimiento: null,
  sexo: null,
  grupo_sanguineo: null,
  pais_residencia: null,
  departamento_residencia: null,
  ciudad_residencia: null,
  correo_electronico: null,
  telefono_celular: null
})

const countries = Country.getAllCountries();
const states = ref([])
const cities = ref([])
const savingPatient = ref(false)
//const errors = ref(null)

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

function placeFocusOnDocNum() {
  document.getElementById('input2').focus()
}

function clearField() {

  patient.tipo_doc = null;
  patient.numero_documento = null;
  patient.primer_nombre = null;
  patient.segundo_nombre = null;
  patient.primer_apellido = null;
  patient.segundo_apellido = null;
  patient.fecha_nacimiento = null;
  patient.sexo = null;
  patient.grupo_sanguineo = null;
  patient.pais_residencia = null;
  patient.departamento_residencia = null;
  patient.ciudad_residencia = null;
  patient.correo_electronico = null;
  patient.telefono_celular = null
}

async function createPatient() {
  console.log(patient)
  savingPatient.value = true
  try {
    await PatientService.createPatient(patient)
        .then((response) => {
          if (response.data.statusCode === 201) {
            console.log(response.data.message)
            toast.success(response.data.message)
            getPatientsFullList()
            clearField()
            savingPatient.value = false
          } else {
            console.log(response.data.message)
            toast.error(response.data.message)
            savingPatient.value = false
          }
        })
  } catch (e) {
    console.log(getError(e))
    toast.error(getError(e))
    savingPatient.value = false
  }
}

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
            <font-awesome-icon :icon="['fas', 'user-plus']"/>
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
                    <font-awesome-icon :icon="['fas', 'user-plus']"/>
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
                      <label class="form-label" for="input1">Tipo de Documento:</label>
                      <select id="input1" v-model="patient.tipo_doc"
                              class="form-select"
                              @change="placeFocusOnDocNum"
                              required
                      >
                        <option selected :value="null">Seleccione el tipo</option>
                        <option v-for="doctype in documentTypes" :key="doctype.value"
                                :value="doctype.value"
                                v-text="doctype.name"
                        />
                      </select>
                    </div>

                    <!--                    patient.numero_documento.focus()-->
                    <!-- Documento -->
                    <div class="col-md-6">
                      <label class="form-label" for="input2">Documento:</label>
                      <input id="input2"
                             v-model="patient.numero_documento" autofocus
                             class="form-control"
                             placeholder="Documento"
                             type="text"
                             required
                      >

                    </div>

                    <!-- Nombres -->
                    <div class="col-md-6">
                      <label class="form-label" for="input3">Primer Nombre:</label>
                      <input id="input3" v-model="patient.primer_nombre"
                             class="form-control"
                             placeholder="Primer Nombre"
                             type="text"
                             required
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
                             required
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
                             required
                      >
                    </div>

                    <!--                    <div class="col-md-3">
                                          <label class="form-label" for="input7">Sexo:</label>
                                          <input id="input7" v-model="patient.sexo"
                                                 class="form-control"
                                                 type="text"
                                          >
                                        </div>-->

                    <!-- Sexo-->
                    <div class="col-md-3">
                      <label class="form-label" for="input7">Sexo:</label>
                      <select id="input7" v-model="patient.sexo"
                              class="form-select"
                              required
                      >
                        <option selected :value="null">Seleccione el Sexo</option>
                        <option v-for="gender in userGender"
                                :key="gender.value"
                                :value="gender.value"
                                v-text="gender.name"
                        />
                      </select>
                    </div>

                    <div class="col-md-3">
                      <label class="form-label" for="input8">G.S. RH:</label>
                      <input id="input8" v-model="patient.grupo_sanguineo"
                             class="form-control"
                             type="text"
                             placeholder="G.S. R.H. (o+)"
                             required
                      >
                    </div>

                    <div class="col-md-8">
                      <label class="form-label" for="input9">Email:</label>
                      <input id="input9" v-model="patient.correo_electronico"
                             class="form-control"
                             placeholder="Email (x@mail.com)"
                             type="email"
                      >
                    </div>

                    <div class="col-md-4">
                      <label class="form-label" for="input10">Teléfono:</label>
                      <input id="input10" v-model="patient.telefono_celular"
                             class="form-control"
                             placeholder="Teléfono"
                             type="text"
                      >
                    </div>

                    <!-- Fecha de Expedición -->
                    <!--                    <div class="col-md-6">
                                          <label class="form-label" for="input8">Fecha de Expedición:</label>
                                          <input id="input8" v-model="patient.fecha_expedicion"
                                                 class="form-control"
                                                 type="date"
                                          >
                                        </div>-->

                    <!-- País -->
                    <div class="col-md-4">
                      <label class="form-label" for="input11">País:</label>
                      <select id="input11" v-model="patient.pais_residencia"
                              class="form-select"
                              @change="getStatesOfCountry"
                              required
                      >
                        <option selected :value="null">Seleccione el país</option>
                        <option v-for="country in countries"
                                :key="country.name"
                                :value="country.isoCode"
                                v-text="country.name.toUpperCase()"
                        />
                      </select>
                    </div>

                    <!-- Departamento -->
                    <div class="col-md-4">
                      <label class="form-label" for="input12">Departamento:</label>
                      <select id="input12" v-model="patient.departamento_residencia"
                              class="form-select"
                              @change="getCitiesOfState"
                              required
                      >
                        <option selected :value="null">Seleccione el Departamento</option>
                        <option v-for="state in states"
                                :key="state.name"
                                :value="state.isoCode"
                                v-text="state.name.toUpperCase()"
                        />
                      </select>
                    </div>

                    <!-- Ciudad -->
                    <div class="col-md-4">
                      <label class="form-label" for="input13">Ciudad:</label>
                      <select id="input13" v-model="patient.ciudad_residencia" class="form-select" required>
                        <option selected :value="null">Seleccione la Ciudad</option>
                        <option v-for="city in cities"
                                :key="city.name"
                                :value="city.name.toUpperCase()"
                                v-text="city.name.toUpperCase()"
                        />
                      </select>
                    </div>

                    <hr/>

                    <div class="col-md-12 mt-3 text-end">

                      <button class="btn btn-sm btn-warning me-1" type="reset">
                        <font-awesome-icon :icon="['fas', 'brush']"/>
                        Limpiar
                      </button>

                      <button class="btn btn-sm btn-primary" type="submit" :disabled="savingPatient">
                        <span
                            v-if="savingPatient"
                            aria-hidden="true"
                            class="spinner-border spinner-border-sm"
                            role="status"
                        ></span>
                        <font-awesome-icon :icon="['fas', 'user-plus']" v-else />
                        {{ savingPatient ? 'Creando Paciente' : 'Crear Paciente' }}
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
          <EasyDataTable :headers="headers" :items="patients"/>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>