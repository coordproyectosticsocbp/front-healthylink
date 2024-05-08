<script setup>

import CreatePatientComponent
  from "@/components/patients/subComponents/CreatePatient/CreatePatientForm/CreatePatientComponent.vue";
import {computed, ref} from "vue";
import InformedConsentComponent
  from "@/components/patients/subComponents/CreatePatient/InformedConsent/InformedConsentComponent.vue";
import PatientHealthSurvey
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/PatientHealthSurvey.vue";
import {useStore} from "vuex";
import {getError} from "@/utils/helpers/getError.js";
import {separateArrayBySemicolon} from "@/utils/helpers/separateBySemiColon.js";
import PatientService from "@/services/patients/Patient.service.js";
import {toast} from "vue3-toastify";
import {useLoading} from "vue-loading-overlay";

const store = useStore()
const authUser = computed(() => store.getters["auth/authUser"])
const wizard = ref(null)
const createPatientComponentRef = ref(null)
const patientHealthSurveyRef = ref(null)
const currentSaveStep = ref(0)
const currentFormStepIndex = window.localStorage.getItem('currentFormStepIndex')
const storagePatientVal = window.localStorage.getItem('patientForm')
const storageSignatureVal = window.localStorage.getItem('patientSignature')
/* Survey Local Storage */
const storageDemographicVal = window.localStorage.getItem('patientDemographicInformation')
const storageHealthHabitsVal = window.localStorage.getItem('HealthHabitsInformation')
const storagePersonalHealthVal = window.localStorage.getItem('PersonalHealthInformation')
const storageCovid19Val = window.localStorage.getItem('covid19Information')
//const currentStep = window.localStorage.getItem('validateCurrentSaveStep')

/**
 *  Component Save Position
 * */
const component1Saved = ref(false);
const component2Saved = ref(false);
const component3Saved = ref(false);

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


const currentFormStepIndexVal = computed(() => {
  const index = window.localStorage.getItem('currentFormStepIndex')
  if (!index) {
    return;
  }
  return JSON.parse(index)
})

async function validateStep(props) {
  if (!currentFormStepIndex) window.localStorage.setItem('currentFormStepIndex', JSON.stringify(0))

  if (props.activeTabIndex === 0) {

    const submitState = await createPatientComponentRef.value.handleSubmit()
    if (submitState) {
      //console.log('hay un error')
      window.localStorage.setItem('currentFormStepIndex', JSON.stringify(1))
      return props.nextTab()
    }

  } else if (props.activeTabIndex === 1) {

    const patientSignatureExists = window.localStorage.getItem('patientSignature')
    if (patientSignatureExists) {
      window.localStorage.setItem('currentFormStepIndex', JSON.stringify(2))
      return props.nextTab()
    } else {
      alert('No se puede Continuar, falta firma consentimiento')
    }

  }
}

const validatePrevStep = (props) => {
  if (props.activeTabIndex > 0) {
    if (props.activeTabIndex === 2) {
      window.localStorage.setItem('currentFormStepIndex', JSON.stringify(1))
      props.prevTab()
    } else if (props.activeTabIndex === 1) {
      window.localStorage.setItem('currentFormStepIndex', JSON.stringify(0))
      props.prevTab()
    }
  }
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

  if (!component1Saved.value) {
    throw new Error('Componente 1 no guardado')
  }

  const loader = $loading.show()
  try {

    let storageFormatted = []
    let storagePatientInfo = []
    if (storageSignatureVal) storageFormatted = JSON.parse(storageSignatureVal)
    if (storagePatientVal) storagePatientInfo = JSON.parse(storagePatientVal)
    //console.log('Signature Storage: ---> ' + storageFormatted)
    //console.log('Patient Storage: ---> ' + storagePatientInfo)
    console.log(storageFormatted)

    if (storageFormatted === null && storagePatientInfo === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oooops!',
        text: 'Error al obtener información del consentimiento'
      })
      loader.hide()
    } else {

      const payload = {
        tipo_consentimiento_id: 1,
        tipo_estudio_id: 1,
        tipo_doc: storagePatientInfo.tipo_doc,
        numero_documento: storagePatientInfo.numero_documento,
        firma: storageFormatted
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
              component2Saved.value = true;
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


  /*component2Saved.value = true;
  console.log('Payload Signature Information: ---> ' + payload)*/
}
const saveHealthSurvey = async () => {
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

              /*Swal.fire({
                icon: 'success',
                text: response.data.message
              })*/
              window.open('https://mibcode.000webhostapp.com/codigo/codigomuestra.php?code=' + response.data.data.code, '_blank');
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

      /*component3Saved.value = true;
      console.log('Payload Survey Information: ---> ' + payload)*/
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oooops!',
      text: getError(error)
    })
    loader.hide()
  }

}

const saveAllComponents = async () => {
  try {


    await saveUserInformation()
    await saveInformedConsent()
    await saveHealthSurvey()

    console.log('Todos los Componentes Registrados')

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oooops!',
      text: getError(error)
    })
    loader.hide()
  }
}

const clearSurveyLocalStorage = () => {
  if (storagePatientVal) window.localStorage.removeItem('patientForm')
  if (storageSignatureVal) window.localStorage.removeItem('patientSignature')
  if (storageDemographicVal) window.localStorage.removeItem('patientDemographicInformation')
  if (storageHealthHabitsVal) window.localStorage.removeItem('HealthHabitsInformation')
  if (storagePersonalHealthVal) window.localStorage.removeItem('PersonalHealthInformation')
  if (storageCovid19Val) window.localStorage.removeItem('covid19Information')
  window.localStorage.setItem('validateCurrentSaveStep', 0)
  window.localStorage.setItem('currentFormStepIndex', 0)
}

async function onComplete() {
  await patientHealthSurveyRef.value.testEvent()
  await saveAllComponents()
  //await saveUserInformation()
  //await saveHealthSurvey()
}


</script>

<template>
  <form-wizard ref="wizard"
               :start-index="currentFormStepIndexVal"
               step-size="xs"
               @on-complete="onComplete"
  >

    <!-- Fisrt Step -->
    <tab-content title="Datos Personales">
      <CreatePatientComponent ref="createPatientComponentRef"/>
    </tab-content>
    <!-- End Fisrt Step -->

    <!-- Second Step -->
    <tab-content title="Consentimiento">
      <InformedConsentComponent/>
    </tab-content>
    <!-- End Second Step -->

    <!-- Third Step -->
    <tab-content title="Encuesta">
      <PatientHealthSurvey ref="patientHealthSurveyRef"/>
    </tab-content>
    <!-- End Third Step -->

    <!-- Fourth Step -->
    <!--    <tab-content title="Historía Clínica">
          <p>Ups!</p>
        </tab-content>-->
    <!-- End Fourth Step -->

    <template v-slot:footer="props">
      <div class="wizard-footer-left">
        <wizard-button v-if="props.activeTabIndex > 0" :style="props.fillButtonStyle" class="btn btn-global-color"
                       @click="validatePrevStep(props)">
          Atrás
        </wizard-button>
      </div>
      <div class="wizard-footer-right">
        <wizard-button v-if="!props.isLastStep" :style="props.fillButtonStyle"
                       class="wizard-footer-right btn btn-global-color" @click="validateStep(props)">
          Continuar
        </wizard-button>

        <wizard-button v-else :style="props.fillButtonStyle" class="wizard-footer-right btn btn-aqua-color"
                       @click="onComplete"> {{ props.isLastStep ? 'Finalizar' : 'Continuar' }}
        </wizard-button>
      </div>
    </template>

    <!--    <template #custom-buttons-left>
          <button class="btn btn-global-color">Atrás</button>
        </template>

        <template #custom-buttons-right>
          <button class="btn btn-global-color">Seguir</button>
        </template>-->

    <!--    <template #prev>
          <button class="btn btn-global-color">Atrás</button>
        </template>

        <template #next>
          <button class="btn btn-global-color">Seguir</button>
        </template>-->

    <template #finish>
      <button class="btn btn-aqua-color">Finalizar</button>
    </template>

  </form-wizard>
</template>

<style scoped>

</style>