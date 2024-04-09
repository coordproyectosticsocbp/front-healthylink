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

  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <EasyDataTable :headers="headers" :items="patients"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>