<script setup>

import CreatePatientComponent
  from "@/components/patients/subComponents/CreatePatient/CreatePatientForm/CreatePatientComponent.vue";
import {computed, ref} from "vue";
import InformedConsentComponent
  from "@/components/patients/subComponents/CreatePatient/InformedConsent/InformedConsentComponent.vue";
import PatientHealthSurvey
  from "@/components/patients/subComponents/CreatePatient/HealthSurvey/PatientHealthSurvey.vue";
import PatientService from "@/services/patients/Patient.service.js";
import {getError} from "@/utils/helpers/getError.js";
import {toast} from "vue3-toastify";
import {separateArrayBySemicolon} from "@/utils/helpers/separateBySemiColon.js";
import {useStore} from "vuex";

const store = useStore()
const authUser = computed(() => store.getters["auth/authUser"])
const wizard = ref(null)
const createPatientComponentRef = ref(null)
const patientHealthSurveyRef = ref(null)
//const currentSaveStep = ref(null)
const currentFormStepIndex = window.localStorage.getItem('currentFormStepIndex')
const storagePatientVal = window.localStorage.getItem('patientForm')
const storageSignatureVal = window.localStorage.getItem('patientSignature')
/* Survey Local Storage */
const storageDemographicVal = window.localStorage.getItem('patientDemographicInformation')
const storageHealthHabitsVal = window.localStorage.getItem('HealthHabitsInformation')
const storagePersonalHealthVal = window.localStorage.getItem('PersonalHealthInformation')
const storageCovid19Val = window.localStorage.getItem('covid19Information')
//const currentStep = window.localStorage.getItem('validateCurrentSaveStep')

const currentFormStepIndexVal = computed(() => {
  const index = window.localStorage.getItem('currentFormStepIndex')
  if (!index) {
    return;
  }
  return JSON.parse(index)
})

/*const isLastStep = () => {
  if (wizard.value) {
    return wizard.value.isLastStep
  }
  return false
}*/

/*const validateCurrentSaveStep = async () => {
  const stepValue = JSON.parse(currentStep)

  if (stepValue === 1) {
    await saveUserInformation()
  } else if (stepValue === 2) {
    await saveInformedConsent(JSON.parse(storagePatientVal.tipo_doc), JSON.parse(storagePatientVal.numero_documento))
  } else if (stepValue === 3) {
    await saveHealthSurvey(JSON.parse(storagePatientVal.tipo_doc), JSON.parse(storagePatientVal.numero_documento))
  }
}*/


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
  const storageFormatted = JSON.parse(storagePatientVal)
  let payload = {}
  if (storagePatientVal) {

    payload = {
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
          } else {
            /*Swal.fire({
              icon: 'success',
              text: response.data.message
            })*/
            toast.success(response.data.message)
            window.localStorage.setItem('validateCurrentSaveStep', 2)
            saveInformedConsent(storageFormatted.tipo_doc, storageFormatted.numero_documento)
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            text: getError(error)
          })
        })
  }
}
const saveInformedConsent = async (tipoDoc, numeroDocumento) => {
  const storageFormatted = JSON.parse(storageSignatureVal)
  let payload = {}

  if (storageSignatureVal) {
    payload = {
      tipo_consentimiento_id: 1,
      tipo_estudio_id: 1,
      tipo_doc: tipoDoc,
      numero_documento: numeroDocumento,
      firma: storageFormatted
    }

    await PatientService.saveInformedConsent(payload)
        .then((response) => {
          if (response.data.statusCode !== 201) {
            Swal.fire({
              icon: 'error',
              text: response.data.message
            })
          } else {
            toast.success(response.data.message)
            window.localStorage.setItem('validateCurrentSaveStep', 3)
            saveHealthSurvey()
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            text: getError(error)
          })
        })
  }
}
const saveHealthSurvey = () => {
  const storagePatientFormatted = JSON.parse(storagePatientVal)

  //if (storageDemographicVal && storageHealthHabitsVal && storagePersonalHealthVal && storageCovid19Val) {

  try {

    const storageDemographicFormatted = JSON.parse(storageDemographicVal)
    const storageHealthHabitsFormatted = JSON.parse(storageHealthHabitsVal)
    const storagePersonalHealthFormatted = JSON.parse(storagePersonalHealthVal)
    const storageCovid19Formatted = JSON.parse(storageCovid19Val)

    let payload = {
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
          medicamento_para_presion_arterial: storageHealthHabitsFormatted.medicamento_para_presion_arterial ?? "",
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
          cancer_diagnosticado: separateArrayBySemicolon(storagePersonalHealthFormatted.cancer_diagnosticado) ?? "",
          afecciones_diagnosticadas: separateArrayBySemicolon(storagePersonalHealthFormatted.afecciones_diagnosticadas),
          analisis_sangre_ultimos_seis_meses: storagePersonalHealthFormatted.analisis_sangre_ultimos_seis_meses,
          prueba_positiva_covid_19: storageCovid19Formatted.prueba_positiva_covid_19,
          vacunacion_covid_19: storageCovid19Formatted.vacunacion_covid_19,
          tipo_vacuna_recibida: separateArrayBySemicolon(storageCovid19Formatted.tipo_vacuna_recibida) ?? "",
          cantidad_dosis_vacunacion_recibida: storageCovid19Formatted.cantidad_dosis_vacunacion_recibida,
          sintomas_tenidos_por_covid: separateArrayBySemicolon(storageCovid19Formatted.sintomas_tenidos_por_covid) ?? "",
          hospitalizado_por_covid_19: storageCovid19Formatted.hospitalizado_por_covid_19,
          tiempo_recuperacion_covid_19: storageCovid19Formatted.tiempo_recuperacion_covid_19,
          sintomas_q_persisten_por_covid_19: separateArrayBySemicolon(storageCovid19Formatted.sintomas_q_persisten_por_covid_19) ?? "",
        }
      ]
    }

    PatientService.saveSurveyInformation(payload)
        .then((response) => {
          if (response.data.statusCode !== 201) {
            Swal.fire({
              icon: 'error',
              text: response.data.message
            })

          } else {
            Swal.fire({
              icon: 'success',
              text: response.data.message
            })
            window.open('https://mibcode.000webhostapp.com/codigo/codigomuestra.php?code=' + response.data.data.code, '_blank');
            //AQUI SE CONSUME UN SERVICIO DE CREACION DE CODIGO DE BARRA

            clearSurveyLocalStorage()
          }
        })

  } catch (e) {
    Swal.fire({
      icon: 'error',
      text: getError(e)
    })
    console.log(getError(e))
  }

  //}
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
  await saveUserInformation()
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