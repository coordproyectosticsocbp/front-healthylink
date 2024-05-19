<script setup>

import SurveyHeader from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/SurveyHeader.vue";
import DemographicSurveySection
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/DemographicSurveySection.vue";
import HealthHabitsSection
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/HealthHabitsSection.vue";
import PersonalHealthInformation
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/PersonalHealthInformation.vue";
import Covid19Section from "@/components/patients/subComponents/CreatePatient/HealthSurvey/Partials/Covid19Section.vue";
import {computed, onMounted, ref} from "vue";
import SavePatientGlobalForm from "@/components/patients/globals/SavePatientGlobalForm.vue";
import {useLoading} from "vue-loading-overlay";
import {getError} from "@/utils/helpers/getError.js";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {validateLocalStorage} from "@/utils/helpers/validateLocalStorage.js";
import {separateArrayBySemicolon} from "@/utils/helpers/separateBySemiColon.js";
import PatientService from "@/services/patients/Patient.service.js";
import {toast} from "vue3-toastify";

/*
 * USING ROUTER
 * */
const router = useRouter()

/*
 * GETTING THE STORE
 * */
const store = useStore()
const authUser = computed(() => store.getters["auth/authUser"])

const demographicSurveySectionRef = ref()
const healthHabitsSectionRef = ref()
const personalHealthInformationRef = ref()
const covid19SectionRef = ref()

/**
 *  Loader Variables
 * */
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

async function testEvent() {
  await demographicSurveySectionRef.value.handleSubmit()
  await healthHabitsSectionRef.value.handleSubmit()
  await personalHealthInformationRef.value.handleSubmit()
  await covid19SectionRef.value.handleSubmit()
}

const saveUserInformation = async () => {

  try {
    const loader = $loading.show()
    const patientExists = validateLocalStorage('patientForm')
    if (patientExists) {
      const storageFormatted = JSON.parse(window.localStorage.getItem('patientForm'))

      const payload = {
        tipo_doc: storageFormatted.tipo_doc,
        numero_documento: storageFormatted.numero_documento,
        telefono_celular: storageFormatted.telefono_celular.toString(),
        primer_nombre: storageFormatted.primer_nombre,
        segundo_nombre: storageFormatted.segundo_nombre,
        primer_apellido: storageFormatted.primer_apellido,
        segundo_apellido: storageFormatted.segundo_apellido,
        fecha_nacimiento: storageFormatted.fecha_nacimiento,
        pais_residencia: storageFormatted.pais_residencia,
        departamento_residencia: storageFormatted.departamento_residencia,
        ciudad_residencia: storageFormatted.ciudad_residencia,
        sexo: storageFormatted.sexo,
        correo_electronico: storageFormatted.correo_electronico,
        grupo_sanguineo: storageFormatted.grupo_sanguineo,
      }

      await PatientService.createPatient(payload)
          .then((response) => {
            if (response.data.statusCode !== 201) {
              Swal.fire({
                icon: 'error',
                text: response.data.message
              })
              loader.hide()
            } else {
              toast.success(response.data.message)
              saveInformedConsent()
              loader.hide()
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              text: getError(error)
            })
            loader.hide()
          })

    } else {
      Swal.fire({
        icon: 'error',
        text: 'Error al Obtener datos del Local Storage'
      })
      loader.hide()
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      text: getError(error)
    })
  }
}
const saveInformedConsent = async () => {

  try {

    const loader = $loading.show()

    const patientExists = validateLocalStorage('patientForm')
    const signatureExists = validateLocalStorage('patientSignature')
    const demographicExists = validateLocalStorage('patientDemographicInformation')
    const healthHabitsExists = validateLocalStorage('HealthHabitsInformation')
    const PersonalHealthExists = validateLocalStorage('PersonalHealthInformation')
    const covid19Exists = validateLocalStorage('covid19Information')

    if (signatureExists && patientExists
        && demographicExists && PersonalHealthExists
        && covid19Exists && healthHabitsExists
    ) {

      /* Patient and Informed Consent Local Storage */
      const storagePatientVal = JSON.parse(window.localStorage.getItem('patientForm'))
      const storageSignatureVal = JSON.parse(window.localStorage.getItem('patientSignature'))
      /* Survey Local Storage */
      const storageDemographicVal = JSON.parse(window.localStorage.getItem('patientDemographicInformation'))
      const storageHealthHabitsVal = JSON.parse(window.localStorage.getItem('HealthHabitsInformation'))
      const storagePersonalHealthVal = JSON.parse(window.localStorage.getItem('PersonalHealthInformation'))
      const storageCovid19Val = JSON.parse(window.localStorage.getItem('covid19Information'))

      const payload = {
        tipo_consentimiento_id: 1,
        tipo_estudio_id: 1,
        tipo_doc: storagePatientVal.tipo_doc,
        numero_documento: storagePatientVal.numero_documento,
        firma: storageSignatureVal,
        sedes_toma_muestras_id: 1,
        user_created_id: authUser.value.id,
        detalle: [
          {
            altura: storageDemographicVal.altura,
            peso: storageDemographicVal.peso,
            etnia: storageDemographicVal.etnia,
            pais_nacimiento: storageDemographicVal.pais_nacimiento,
            ciudad_nacimiento: storageDemographicVal.ciudad_nacimiento,
            nacionalidad_pais_abuelo_materno: storageDemographicVal.pais_abuelo_materno,
            nacionalidad_ciudad_abuelo_materno: storageDemographicVal.ciudad_abuelo_materno,
            nacionalidad_pais_abuela_materno: storageDemographicVal.pais_abuela_materna,
            nacionalidad_ciudad_abuela_materno: storageDemographicVal.ciudad_abuela_materna,
            nacionalidad_pais_abuelo_paterno: storageDemographicVal.pais_abuelo_paterno,
            nacionalidad_ciudad_abuelo_paterno: storageDemographicVal.ciudad_abuelo_paterno,
            nacionalidad_pais_abuela_paterno: storageDemographicVal.pais_abuela_paterna,
            nacionalidad_ciudad_abuela_paterno: storageDemographicVal.ciudad_abuela_paterna,
            es_fumador: storageHealthHabitsVal.es_fumador,
            presion_arterial: storageHealthHabitsVal.presion_arterial,
            medicamento_para_presion_arterial: storageHealthHabitsVal.medicamento_para_presion_arterial,
            altos_niveles_colesterol: storageHealthHabitsVal.alto_nivel_colesterol,
            frecuencia_consumo_bebidas_alcoholicas: storageHealthHabitsVal.frecuencia_bebidas_alcoholicas,
            afeccion_o_enfermededad_cronica__madre: storageHealthHabitsVal.afeccion_o_enfermededad_cronica__madre,
            cual_afeccion_o_enfermededad_cronica__madre: separateArrayBySemicolon(storageHealthHabitsVal.cual_afeccion_o_enfermededad_cronica__madre, 'madre'),
            afeccion_o_enfermededad_cronica__padre: storageHealthHabitsVal.afeccion_o_enfermededad_cronica__padre,
            cual_afeccion_o_enfermededad_cronica__padre: separateArrayBySemicolon(storageHealthHabitsVal.cual_afeccion_o_enfermededad_cronica__padre, 'padre'),
            afeccion_o_enfermededad_cronica__hermanos: storageHealthHabitsVal.afeccion_o_enfermededad_cronica__hermanos,
            cual_afeccion_o_enfermededad_cronica__hermanos: separateArrayBySemicolon(storageHealthHabitsVal.cual_afeccion_o_enfermededad_cronica__hermanos, 'hermanos'),
            enfermedades_cronicas: storagePersonalHealthVal.enfermedades_cronicas,
            enfermedades_pulmonares: storagePersonalHealthVal.enfermedades_pulmonares,
            enfermedades_endocrinas_metabolicas: storagePersonalHealthVal.enfermedades_endocrinas_metabolicas,
            enfermedades_digestivas: storagePersonalHealthVal.enfermedades_digestivas,
            enfermedades_renales: storagePersonalHealthVal.enfermedades_renales,
            enfermedades_neurologicas: storagePersonalHealthVal.enfermedades_neurologicas,
            enfermedades_dermatologicas: storagePersonalHealthVal.enfermedades_dermatologicas,
            enfermedades_reumaticas: storagePersonalHealthVal.enfermedades_reumaticas,
            diagnosticado_cancer_ultimos_cinco_anos: storagePersonalHealthVal.diagnosticado_cancer_ultimos_cinco_anos,
            //cancer_diagnosticado: separateArrayBySemicolon(storagePersonalHealthFormatted.cancer_diagnosticado),
            cancer_diagnosticado: null,
            afecciones_diagnosticadas: separateArrayBySemicolon(storagePersonalHealthVal.afecciones_diagnosticadas, 'afecciones'),
            analisis_sangre_ultimos_seis_meses: storagePersonalHealthVal.analisis_sangre_ultimos_seis_meses,
            prueba_positiva_covid_19: storageCovid19Val.prueba_positiva_covid_19,
            vacunacion_covid_19: storageCovid19Val.vacunacion_covid_19,
            //tipo_vacuna_recibida: null,
            tipo_vacuna_recibida: separateArrayBySemicolon(storageCovid19Val.tipo_vacuna_recibida, 'tipovacuna'),
            cantidad_dosis_vacunacion_recibida: storageCovid19Val.cantidad_dosis_vacunacion_recibida,
            //sintomas_tenidos_por_covid: null,
            sintomas_tenidos_por_covid: separateArrayBySemicolon(storageCovid19Val.sintomas_tenidos_por_covid, 'sintomascovid'),
            hospitalizado_por_covid_19: storageCovid19Val.hospitalizado_por_covid_19,
            tiempo_recuperacion_covid_19: storageCovid19Val.tiempo_recuperacion_covid_19,
            sintomas_q_persisten_por_covid_19: separateArrayBySemicolon(storageCovid19Val.sintomas_q_persisten_por_covid_19, 'persistensintomas'),
          }
        ]
      }

      await PatientService.saveInformedConsent(payload)
          .then((response) => {
            if (response.data.statusCode !== 201) {
              Swal.fire({
                icon: 'error',
                text: response.data.message
              })
              loader.hide()
            } else {
              window.open('https://mibcode.com/codigomuestra.php?code=' + response.data.data.code, '_blank');
              Swal.fire({
                icon: 'success',
                title: 'Excelente!',
                text: 'Todos los Componentes Registrados'
              })
              //clearSurveyLocalStorage()
              router.push({
                name: 'create-patient-form'
              })
              loader.hide()
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              text: getError(error)
            })
            loader.hide()
          })

      console.log('bn aqui payload---->', payload)
      //loader.hide()
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Error al Obtener datos del Local Storage'
      })
      loader.hide()
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      text: getError(error)
    })
  }


}

/*const saveAllComponents = async () => {
  try {
    //await saveUserInformation()
    await saveInformedConsent()

    /!*await router.push({
      name: 'create-patient-form'
    })*!/

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oooops!',
      text: getError(error)
    })
    loader.hide()
  }
}*/
const clearSurveyLocalStorage = async () => {
  await window.localStorage.removeItem('patientForm')
  await window.localStorage.removeItem('patientSignature')
  await window.localStorage.removeItem('patientDemographicInformation')
  await window.localStorage.removeItem('HealthHabitsInformation')
  await window.localStorage.removeItem('PersonalHealthInformation')
  await window.localStorage.removeItem('covid19Information')
  await window.localStorage.removeItem('personalHealthInfoHasError')
  await window.localStorage.removeItem('healthHabitsHasError')
  await window.localStorage.removeItem('demographicHasError')
  await window.localStorage.removeItem('covid19InfoHasError')
  await window.localStorage.setItem('currentFormStepIndex', 0)
}
const saveForm = async () => {
  try {
    await testEvent()
    await saveUserInformation()
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  window.localStorage.setItem('currentFormStepIndex', 2)
})

</script>

<template>
  <div class="container">

    <SurveyHeader/>

    <DemographicSurveySection ref="demographicSurveySectionRef"/>

    <HealthHabitsSection ref="healthHabitsSectionRef"/>

    <PersonalHealthInformation ref="personalHealthInformationRef"/>

    <Covid19Section ref="covid19SectionRef"/>

    <SavePatientGlobalForm @onSaveForm="saveForm"/>

  </div>
</template>

<style scoped>

</style>