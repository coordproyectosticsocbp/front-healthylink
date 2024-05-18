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
import PatientService from "@/services/patients/Patient.service.js";
import {toast} from "vue3-toastify";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {separateArrayBySemicolon} from "@/utils/helpers/separateBySemiColon.js";

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
const storagePatientVal = window.localStorage.getItem('patientForm')
const storageSignatureVal = window.localStorage.getItem('patientSignature')
/* Survey Local Storage */
const storageDemographicVal = window.localStorage.getItem('patientDemographicInformation')
const storageHealthHabitsVal = window.localStorage.getItem('HealthHabitsInformation')
const storagePersonalHealthVal = window.localStorage.getItem('PersonalHealthInformation')
const storageCovid19Val = window.localStorage.getItem('covid19Information')

/**
 *  Component Save Position
 * */
const component1Saved = ref(false);
//const component2Saved = ref(false);
//const component3Saved = ref(false);

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

  const loader = $loading.show()
  try {
    let storageFormatted = []
    if (storagePatientVal) storageFormatted = JSON.parse(storagePatientVal)

    if (storageFormatted === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oooops!',
        text: 'Error al obtener información del paciente'
      })
      loader.hide()
    } else {

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
              component1Saved.value = true;
              toast.success(response.data.message)
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

    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      text: getError(error)
    })
    loader.hide()
  }
  /*component1Saved.value = true;
  console.log('Payload User Information: ----> ' + payload)*/
}
const saveInformedConsent = async () => {

  /*if (!component1Saved.value) {
    throw new Error('Componente 1 no guardado')
  }*/

  const loader = $loading.show()
  try {

    let storageFormatted = []
    let storagePatientInfo = []
    //let storagePatientFormatted = []
    let storageDemographicFormatted = []
    let storageHealthHabitsFormatted = []
    let storagePersonalHealthFormatted = []
    let storageCovid19Formatted = []

    //if (storagePatientVal) storagePatientFormatted = JSON.parse(storagePatientVal)
    if (storageDemographicVal) storageDemographicFormatted = JSON.parse(storageDemographicVal)
    if (storageHealthHabitsVal) storageHealthHabitsFormatted = JSON.parse(storageHealthHabitsVal)
    if (storagePersonalHealthVal) storagePersonalHealthFormatted = JSON.parse(storagePersonalHealthVal)
    if (storageCovid19Val) storageCovid19Formatted = JSON.parse(storageCovid19Val)
    if (storageSignatureVal) storageFormatted = JSON.parse(storageSignatureVal)
    if (storagePatientVal) storagePatientInfo = JSON.parse(storagePatientVal)

    /*console.log(storageDemographicFormatted)
    console.log(storageHealthHabitsFormatted)
    console.log(storagePersonalHealthFormatted)
    console.log(storageCovid19Formatted)
    console.log(storageFormatted)
    console.log(storagePatientInfo)*/

    if (storageFormatted === null || storagePatientInfo === null
        || storageDemographicFormatted === null || storageHealthHabitsFormatted === null
        || storagePersonalHealthFormatted === null || storageCovid19Formatted === null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oooops!',
        text: 'Error al obtener información del consentimiento'
      })
      loader.hide()
    } else {

      console.log('bn aqui antes payload---->')
      const payload = {
        tipo_consentimiento_id: 1,
        tipo_estudio_id: 1,
        tipo_doc: storagePatientInfo.tipo_doc,
        numero_documento: storagePatientInfo.numero_documento,
        firma: storageFormatted,
        sedes_toma_muestras_id: 1,
        user_created_id: authUser.value.id,
        detalle: [
          {
            altura: storageDemographicFormatted.altura,
            peso: storageDemographicFormatted.peso,
            etnia: storageDemographicFormatted.etnia,
            pais_nacimiento: storageDemographicFormatted.pais_nacimiento,
            ciudad_nacimiento: storageDemographicFormatted.ciudad_nacimiento,
            nacionalidad_pais_abuelo_materno: storageDemographicFormatted.pais_abuelo_materno,
            nacionalidad_ciudad_abuelo_materno: storageDemographicFormatted.ciudad_abuelo_materno,
            nacionalidad_pais_abuela_materno: storageDemographicFormatted.pais_abuela_materna,
            nacionalidad_ciudad_abuela_materno: storageDemographicFormatted.ciudad_abuela_materna,
            nacionalidad_pais_abuelo_paterno: storageDemographicFormatted.pais_abuelo_paterno,
            nacionalidad_ciudad_abuelo_paterno: storageDemographicFormatted.ciudad_abuelo_paterno,
            nacionalidad_pais_abuela_paterno: storageDemographicFormatted.pais_abuela_paterna,
            nacionalidad_ciudad_abuela_paterno: storageDemographicFormatted.ciudad_abuela_paterna,
            es_fumador: storageHealthHabitsFormatted.es_fumador,
            presion_arterial: storageHealthHabitsFormatted.presion_arterial,
            medicamento_para_presion_arterial: storageHealthHabitsFormatted.medicamento_para_presion_arterial,
            altos_niveles_colesterol: storageHealthHabitsFormatted.alto_nivel_colesterol,
            frecuencia_consumo_bebidas_alcoholicas: storageHealthHabitsFormatted.frecuencia_bebidas_alcoholicas,
            afeccion_o_enfermededad_cronica__madre: storageHealthHabitsFormatted.afeccion_o_enfermededad_cronica__madre,
            cual_afeccion_o_enfermededad_cronica__madre: separateArrayBySemicolon(storageHealthHabitsFormatted.cual_afeccion_o_enfermededad_cronica__madre),
            //cual_afeccion_o_enfermededad_cronica__madre: null,
            afeccion_o_enfermededad_cronica__padre: storageHealthHabitsFormatted.afeccion_o_enfermededad_cronica__padre,
            cual_afeccion_o_enfermededad_cronica__padre: separateArrayBySemicolon(storageHealthHabitsFormatted.cual_afeccion_o_enfermededad_cronica__padre),
            //cual_afeccion_o_enfermededad_cronica__padre: null,
            afeccion_o_enfermededad_cronica__hermanos: storageHealthHabitsFormatted.afeccion_o_enfermededad_cronica__hermanos,
            cual_afeccion_o_enfermededad_cronica__hermanos: separateArrayBySemicolon(storageHealthHabitsFormatted.cual_afeccion_o_enfermededad_cronica__hermanos),
            //cual_afeccion_o_enfermededad_cronica__hermanos: null,
            enfermedades_cronicas: storagePersonalHealthFormatted.enfermedades_cronicas,
            enfermedades_pulmonares: storagePersonalHealthFormatted.enfermedades_pulmonares,
            enfermedades_endocrinas_metabolicas: storagePersonalHealthFormatted.enfermedades_endocrinas_metabolicas,
            enfermedades_digestivas: storagePersonalHealthFormatted.enfermedades_digestivas,
            enfermedades_renales: storagePersonalHealthFormatted.enfermedades_renales,
            enfermedades_neurologicas: storagePersonalHealthFormatted.enfermedades_neurologicas,
            enfermedades_dermatologicas: storagePersonalHealthFormatted.enfermedades_dermatologicas,
            enfermedades_reumaticas: storagePersonalHealthFormatted.enfermedades_reumaticas,
            diagnosticado_cancer_ultimos_cinco_anos: storagePersonalHealthFormatted.diagnosticado_cancer_ultimos_cinco_anos,
            //cancer_diagnosticado: separateArrayBySemicolon(storagePersonalHealthFormatted.cancer_diagnosticado),
            cancer_diagnosticado: null,
            afecciones_diagnosticadas: separateArrayBySemicolon(storagePersonalHealthFormatted.afecciones_diagnosticadas),
            //afecciones_diagnosticadas: "Fiebre amarilla",
            analisis_sangre_ultimos_seis_meses: storagePersonalHealthFormatted.analisis_sangre_ultimos_seis_meses,
            prueba_positiva_covid_19: storageCovid19Formatted.prueba_positiva_covid_19,
            vacunacion_covid_19: storageCovid19Formatted.vacunacion_covid_19,
            //tipo_vacuna_recibida: null,
            tipo_vacuna_recibida: separateArrayBySemicolon(storageCovid19Formatted.tipo_vacuna_recibida),
            cantidad_dosis_vacunacion_recibida: storageCovid19Formatted.cantidad_dosis_vacunacion_recibida,
            //sintomas_tenidos_por_covid: null,
            sintomas_tenidos_por_covid: separateArrayBySemicolon(storageCovid19Formatted.sintomas_tenidos_por_covid),
            hospitalizado_por_covid_19: storageCovid19Formatted.hospitalizado_por_covid_19,
            tiempo_recuperacion_covid_19: storageCovid19Formatted.tiempo_recuperacion_covid_19,
            //sintomas_q_persisten_por_covid_19: null,
            sintomas_q_persisten_por_covid_19: separateArrayBySemicolon(storageCovid19Formatted.sintomas_q_persisten_por_covid_19),
          }
        ]
      }
      //console.log('bn aqui payload---->', payload)
      await PatientService.saveInformedConsent(payload)
          .then((response) => {
            if (response.data.statusCode !== 201) {
              Swal.fire({
                icon: 'error',
                text: response.data.message
              })
              loader.hide()
            } else {
              component1Saved.value = false;
              window.open('https://mibcode.com/codigomuestra.php?code=' + response.data.data.code, '_blank');
              Swal.fire({
                icon: 'success',
                title: 'Excelente!',
                text: 'Todos los Componentes Registrados'
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
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      text: getError(error)
    })
    loader.hide()

  }

  /*component2Saved.value = true;
  console.log('Payload Signature Information: ---> ' + payload)*/
}
/*const saveHealthSurvey = async () => {
  if (!component2Saved.value) {
    throw new Error('Componente 2 no guardado')
  }

  const loader = $loading.show()
  try {

    let storagePatientFormatted = []
    let storageDemographicFormatted = []
    let storageHealthHabitsFormatted = []
    let storagePersonalHealthFormatted = []
    let storageCovid19Formatted = []

    if (storagePatientVal) storagePatientFormatted = JSON.parse(storagePatientVal)
    if (storageDemographicVal) storageDemographicFormatted = JSON.parse(storageDemographicVal)
    if (storageHealthHabitsVal) storageHealthHabitsFormatted = JSON.parse(storageHealthHabitsVal)
    if (storagePersonalHealthVal) storagePersonalHealthFormatted = JSON.parse(storagePersonalHealthVal)
    if (storageCovid19Val) storageCovid19Formatted = JSON.parse(storageCovid19Val)

    if (storagePatientFormatted === null || storageDemographicFormatted === null || storageHealthHabitsFormatted === null || storagePersonalHealthFormatted === null || storageCovid19Formatted === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oooops!',
        text: 'Error al obtener información de Encuesta'
      })
      loader.hide()
    } else {

      const payload = {
        tipo_doc: storagePatientFormatted.tipo_doc,
        numero_documento: storagePatientFormatted.numero_documento,
        user_created_id: authUser.value.id,
        tipo_estudio_id: 1,
        sedes_toma_muestras_id: 1,
        detalle: [
          {
            altura: storageDemographicFormatted.altura,
            peso: storageDemographicFormatted.peso,
            etnia: storageDemographicFormatted.etnia,
            pais_nacimiento: storageDemographicFormatted.pais_nacimiento,
            ciudad_nacimiento: storageDemographicFormatted.ciudad_nacimiento,
            nacionalidad_pais_abuelo_materno: storageDemographicFormatted.pais_abuelo_materno,
            nacionalidad_ciudad_abuelo_materno: storageDemographicFormatted.ciudad_abuelo_materno,
            nacionalidad_pais_abuela_materno: storageDemographicFormatted.pais_abuela_materna,
            nacionalidad_ciudad_abuela_materno: storageDemographicFormatted.ciudad_abuela_materna,
            nacionalidad_pais_abuelo_paterno: storageDemographicFormatted.pais_abuelo_paterno,
            nacionalidad_ciudad_abuelo_paterno: storageDemographicFormatted.ciudad_abuelo_paterno,
            nacionalidad_pais_abuela_paterno: storageDemographicFormatted.pais_abuela_paterna,
            nacionalidad_ciudad_abuela_paterno: storageDemographicFormatted.ciudad_abuela_paterna,
            es_fumador: storageHealthHabitsFormatted.es_fumador,
            presion_arterial: storageHealthHabitsFormatted.presion_arterial,
            medicamento_para_presion_arterial: storageHealthHabitsFormatted.medicamento_para_presion_arterial.length ?? "",
            altos_niveles_colesterol: storageHealthHabitsFormatted.alto_nivel_colesterol,
            frecuencia_consumo_bebidas_alcoholicas: storageHealthHabitsFormatted.frecuencia_bebidas_alcoholicas,
            afeccion_o_enfermededad_cronica__madre: storageHealthHabitsFormatted.afeccion_o_enfermededad_cronica__madre,
            cual_afeccion_o_enfermededad_cronica__madre: separateArrayBySemicolon(storageHealthHabitsFormatted.cual_afeccion_o_enfermededad_cronica__madre),
            afeccion_o_enfermededad_cronica__padre: storageHealthHabitsFormatted.afeccion_o_enfermededad_cronica__padre,
            cual_afeccion_o_enfermededad_cronica__padre: separateArrayBySemicolon(storageHealthHabitsFormatted.cual_afeccion_o_enfermededad_cronica__padre),
            afeccion_o_enfermededad_cronica__hermanos: storageHealthHabitsFormatted.afeccion_o_enfermededad_cronica__hermanos,
            cual_afeccion_o_enfermededad_cronica__hermanos: separateArrayBySemicolon(storageHealthHabitsFormatted.cual_afeccion_o_enfermededad_cronica__hermanos),
            enfermedades_cronicas: storagePersonalHealthFormatted.enfermedades_cronicas,
            enfermedades_pulmonares: storagePersonalHealthFormatted.enfermedades_pulmonares,
            enfermedades_endocrinas_metabolicas: storagePersonalHealthFormatted.enfermedades_endocrinas_metabolicas,
            enfermedades_digestivas: storagePersonalHealthFormatted.enfermedades_digestivas,
            enfermedades_renales: storagePersonalHealthFormatted.enfermedades_renales,
            enfermedades_neurologicas: storagePersonalHealthFormatted.enfermedades_neurologicas,
            enfermedades_dermatologicas: storagePersonalHealthFormatted.enfermedades_dermatologicas,
            enfermedades_reumaticas: storagePersonalHealthFormatted.enfermedades_reumaticas,
            diagnosticado_cancer_ultimos_cinco_anos: storagePersonalHealthFormatted.diagnosticado_cancer_ultimos_cinco_anos,
            cancer_diagnosticado: separateArrayBySemicolon(storagePersonalHealthFormatted.cancer_diagnosticado).length ?? "",
            afecciones_diagnosticadas: separateArrayBySemicolon(storagePersonalHealthFormatted.afecciones_diagnosticadas),
            analisis_sangre_ultimos_seis_meses: storagePersonalHealthFormatted.analisis_sangre_ultimos_seis_meses,
            prueba_positiva_covid_19: storageCovid19Formatted.prueba_positiva_covid_19,
            vacunacion_covid_19: storageCovid19Formatted.vacunacion_covid_19,
            tipo_vacuna_recibida: separateArrayBySemicolon(storageCovid19Formatted.tipo_vacuna_recibida).length ?? "",
            cantidad_dosis_vacunacion_recibida: storageCovid19Formatted.cantidad_dosis_vacunacion_recibida,
            sintomas_tenidos_por_covid: separateArrayBySemicolon(storageCovid19Formatted.sintomas_tenidos_por_covid).length ?? "",
            hospitalizado_por_covid_19: storageCovid19Formatted.hospitalizado_por_covid_19,
            tiempo_recuperacion_covid_19: storageCovid19Formatted.tiempo_recuperacion_covid_19,
            sintomas_q_persisten_por_covid_19: separateArrayBySemicolon(storageCovid19Formatted.sintomas_q_persisten_por_covid_19).length ?? "",
          }
        ]
      } // Aquí finaliza el payload

      PatientService.saveSurveyInformation(payload)
          .then((response) => {
            if (response.data.statusCode !== 201) {
              Swal.fire({
                icon: 'error',
                text: response.data.message
              })
              loader.hide()
            } else {

              /!*Swal.fire({
                icon: 'success',
                text: response.data.message
              })*!/
              window.open('https://mibcode.com/codigomuestra.php?code=' + response.data.data.code, '_blank');
              //AQUI SE CONSUME UN SERVICIO DE CREACION DE CODIGO DE BARRA

              //clearSurveyLocalStorage()
              component3Saved.value = true;
              Swal.fire({
                icon: 'success',
                title: 'Excelente!',
                text: 'Todos los Componentes Registrados'
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

      /!*component3Saved.value = true;
      console.log('Payload Survey Information: ---> ' + payload)*!/
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oooops!',
      text: getError(error)
    })
    loader.hide()
  }

}*/

const saveAllComponents = async () => {
  try {
    await saveUserInformation()
    await saveInformedConsent()
    await clearSurveyLocalStorage()
    await router.push({
      name: 'create-patient-form'
    })
    //await saveHealthSurvey()
    //console.log('Todos los Componentes Registrados')

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oooops!',
      text: getError(error)
    })
    loader.hide()
  }
}
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
  await testEvent()

  let step1 = {}
  let step2 = {}
  let step3 = {}
  let step4 = {}

  const demographicHasErrorStorage = window.localStorage.getItem('demographicHasError')
  const healthHabitsHasErrorStorage = window.localStorage.getItem('healthHabitsHasError')
  const personalHealthInfoHasErrorStorage = window.localStorage.getItem('personalHealthInfoHasError')
  const covid19InfoHasErrorStorage = window.localStorage.getItem('covid19InfoHasError')

  if (demographicHasErrorStorage) step1 = JSON.parse(demographicHasErrorStorage)
  if (healthHabitsHasErrorStorage) step2 = JSON.parse(healthHabitsHasErrorStorage)
  if (personalHealthInfoHasErrorStorage) step3 = JSON.parse(personalHealthInfoHasErrorStorage)
  if (covid19InfoHasErrorStorage) step4 = JSON.parse(covid19InfoHasErrorStorage)

  //console.log(step1, step2, step3, step4)
  if (!step1 && !step2 && !step3 && !step4) {
    await saveAllComponents()
    //await clearSurveyLocalStorage()
    //await clearSurveyLocalStorage()
    //console.log('Esta limpio de errores')
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oooops!',
      text: 'Formulario incompleto, Verifique!'
    })
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