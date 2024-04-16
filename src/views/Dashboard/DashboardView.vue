<script setup>

import Sidebar from '@/components/globals/Sidebar.vue'
import ContentWrappers from '@/components/globals/ContentWrappers.vue'
import {useStore} from "vuex";
import {onMounted, ref} from "vue";
import {useLoading} from "vue-loading-overlay";

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


const countriesObject = async () => {
  const loader = $loading.show()
  const response = await store.dispatch('geocoding/geoCountries')
  //console.log(response.statusCode)
  if (response.statusCode !== 200) {
    Swal.fire({
      icon: 'error',
      text: 'Error al retornar los paises'
    })
  }
  const storageVal = window.localStorage.getItem('countries')
  if (!storageVal) window.localStorage.setItem('countries', JSON.stringify(response.data))
  loader.hide()
}

const statesObject = async () => {
  const loader = $loading.show()
  const response = await store.dispatch('geocoding/getAllStates')
  //console.log(response.statusCode)
  if (response.statusCode !== 200) {
    Swal.fire({
      icon: 'error',
      text: 'Error al retornar los departamentos'
    })
  }
  const storageVal = window.localStorage.getItem('states')
  if (!storageVal) window.localStorage.setItem('states', JSON.stringify(response.data))
  loader.hide()
}

const citiesObject = async () => {
  const loader = $loading.show()
  const response = await store.dispatch('geocoding/getAllCities')
  //console.log(response.statusCode)
  if (response.statusCode !== 200) {
    Swal.fire({
      icon: 'error',
      text: 'Error al retornar los departamentos'
    })
  }
  const storageVal = window.localStorage.getItem('cities')
  if (!storageVal) window.localStorage.setItem('cities', JSON.stringify(response.data))
  loader.hide()
}


onMounted(() => {

  const storageVal = window.localStorage.getItem('countries')
  if (!storageVal) {
    countriesObject()
    statesObject()
    citiesObject()
  }
  //console.log('Información ya en Línea')
})
/*const statesObject = computed(() => store.getters["geocoding/states"])
const citiesObject = computed(() => store.getters["geocoding/cities"])*/

</script>

<template>
  <div id="wrapper">
    <Sidebar/>
    <ContentWrappers/>
  </div>
</template>
