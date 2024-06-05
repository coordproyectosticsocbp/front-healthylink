<script setup>

import Sidebar from '@/components/globals/Sidebar.vue'
import ContentWrappers from '@/components/globals/ContentWrappers.vue'
import {useStore} from "vuex";
import {onMounted, ref} from "vue";
import {useLoading} from "vue-loading-overlay";
import diagnosisService from "@/services/diagnosis/diagnosis.service.js";
import HeadquartersService from "@/services/platformAdministration/Headquarters.service.js";

const store = useStore()
const fullPage = ref(true)
const $loading = useLoading({
  loader: 'dots',
  isFullPage: fullPage,
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
})

const getDocumentTypes = async () => {
  await store.dispatch('documentTypes/getDocumentTypes')
}

const countriesObject = async () => {
  const storageVal = window.localStorage.getItem('countries')
  if (!storageVal) {
    const response = await store.dispatch('geocoding/geoCountries')
    if (response.statusCode !== 200) {
      Swal.fire({
        icon: 'error',
        text: 'Error al retornar los paises'
      })
    }
    window.localStorage.setItem('countries', JSON.stringify(response.data))
  }
}

const statesObject = async () => {
  const storageVal = window.localStorage.getItem('states')
  if (!storageVal) {
    const response = await store.dispatch('geocoding/getAllStates')
    if (response.statusCode !== 200) {
      Swal.fire({
        icon: 'error',
        text: 'Error al retornar los departamentos'
      })
    }
    window.localStorage.setItem('states', JSON.stringify(response.data))
  }
}

const citiesObject = async () => {
  const storageVal = window.localStorage.getItem('cities')
  if (!storageVal) {
    const response = await store.dispatch('geocoding/getAllCities')
    if (response.statusCode !== 200) {
      Swal.fire({
        icon: 'error',
        text: 'Error al retornar los departamentos'
      })
    }
    window.localStorage.setItem('cities', JSON.stringify(response.data))
  }
}

const getCie10Diagnosis = async () => {
  const storageVal = window.localStorage.getItem('cie10Diagnosis')
  if (!storageVal) {
    const response = await diagnosisService.getAllCie10Diagnosis()

    if (response.data.statusCode !== 200) {
      Swal.fire({
        icon: 'error',
        text: 'Error al retornar los Diagnosticos'
      })
    }
    window.localStorage.setItem('cie10Diagnosis', JSON.stringify(response.data.data))
  }
}

const getHeadquartersList = async () => {
  const storeVal = window.localStorage.getItem('headquartersList')
  if (!storeVal) {
    const response = await HeadquartersService.getHeadquartersList()
    if (response.data.statusCode !== 200) {
      Swal.fire({
        icon: 'error',
        text: 'Error al retornar las sedes'
      })
    }
    window.localStorage.setItem('headquartersList', JSON.stringify(response.data.data))
  }
}


onMounted(() => {
  getDocumentTypes()
  countriesObject()
  statesObject()
  citiesObject()
  getCie10Diagnosis()
  getHeadquartersList()
})

</script>

<template>
  <div id="wrapper">
    <Sidebar/>

    <ContentWrappers/>

  </div>
</template>
