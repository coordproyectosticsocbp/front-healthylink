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

const wizard = ref(null)
const createPatientComponentRef = ref(null)
const patientHealthSurveyRef = ref(null)

const currentFormStepIndexVal = computed(() => {
  const index = window.localStorage.getItem('currentFormStepIndex')
  if (index) {
    return JSON.parse(index)
  }
})

const isLastStep = () => {
  if (wizard.value) {
    return wizard.value.isLastStep
  }
  return false
}

async function validateStep(props) {
  const currentFormStepIndex = window.localStorage.getItem('currentFormStepIndex')
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
  const storageVal = window.localStorage.getItem('patientForm')
  const storageFormatted = JSON.parse(storageVal)
  let payload = {}
  if (storageVal) {

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
            Swal.fire({
              icon: 'success',
              text: response.data.message
            })
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
  const storageVal = window.localStorage.getItem('patientSignature')
  const storageFormatted = JSON.parse(storageVal)
  let payload = {}

  if (storageVal) {
    payload = {
      tipo_consentimiento_id: 1,
      tipo_estudio_id: 1,
      tipo_doc: tipoDoc,
      numero_documento: numeroDocumento,
      firma: storageFormatted
    }

    PatientService.saveInformedConsent(payload)
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
  const storageDemographicVal = window.localStorage.getItem('patientDemographicInformation')
  const storageHealthHabitsVal = window.localStorage.getItem('HealthHabitsInformation')
  const storagePersonalHealthVal = window.localStorage.getItem('PersonalHealthInformation')
  const storageCovid19Val = window.localStorage.getItem('covid19Information')

  if (storageDemographicVal && storageHealthHabitsVal && storagePersonalHealthVal && storageCovid19Val) {

    try {

      const storageDemographicFormatted = JSON.parse(storageDemographicVal)
      const storageHealthHabitsFormatted = JSON.parse(storageHealthHabitsVal)
      const storagePersonalHealthFormatted = JSON.parse(storagePersonalHealthVal)
      const storageCovid19Formatted = JSON.parse(storageCovid19Val)
      let payload = {
        altura: storageDemographicFormatted.altura,
        peso: storageDemographicFormatted.peso,
        etnia: storageDemographicFormatted.etnia,
        pais_nacimiento: storageDemographicFormatted.pais_nacimiento,
        ciudad_nacimiento: storageDemographicFormatted.ciudad_nacimiento,
        nacionalidad_abuelo_materno: storageDemographicFormatted.nacionalidad_abuelo_materno,
        nacionalidad_abuela_materno: storageDemographicFormatted.nacionalidad_abuela_materno,
        nacionalidad_abuelo_paterno: storageDemographicFormatted.nacionalidad_abuelo_paterno,
        nacionalidad_abuela_paterno: storageDemographicFormatted.nacionalidad_abuela_paterno,
        nacionalidad_paciente: storageDemographicFormatted.nacionalidad_paciente,
        es_fumador: storageHealthHabitsFormatted.es_fumador,
        presion_arterial: storageHealthHabitsFormatted.presion_arterial,
        medicamento_para_presion_arterial: storageHealthHabitsFormatted.medicamento_para_presion_arterial,
        altos_niveles_colesterol: storageHealthHabitsFormatted.altos_niveles_colesterol,
        frecuencia_consumo_bebidas_alcoholicas: storageHealthHabitsFormatted.frecuencia_consumo_bebidas_alcoholicas,
        afeccion_o_enfermededad_cronica__madre: storageHealthHabitsFormatted.afeccion_o_enfermededad_cronica__madre,
        cual_afeccion_o_enfermededad_cronica__madre: storageHealthHabitsFormatted.cual_afeccion_o_enfermededad_cronica__madre,
        afeccion_o_enfermededad_cronica__padre: storageHealthHabitsFormatted.afeccion_o_enfermededad_cronica__padre,
        cual_afeccion_o_enfermededad_cronica__padre: storageHealthHabitsFormatted.cual_afeccion_o_enfermededad_cronica__padre,
        afeccion_o_enfermededad_cronica__hermanos: storageHealthHabitsFormatted.afeccion_o_enfermededad_cronica__hermanos,
        cual_afeccion_o_enfermededad_cronica__hermanos: storageHealthHabitsFormatted.cual_afeccion_o_enfermededad_cronica__hermanos,
        enfermedades_cronicas: storagePersonalHealthFormatted.enfermedades_cronicas,
        enfermedades_pulmonares: storagePersonalHealthFormatted.enfermedades_pulmonares,
        enfermedades_endocrinas_metabolicas: storagePersonalHealthFormatted.enfermedades_endocrinas_metabolicas,
        enfermedades_digestivas: storagePersonalHealthFormatted.enfermedades_digestivas,
        enfermedades_renales: storagePersonalHealthFormatted.enfermedades_renales,
        enfermedades_neurologicas: storagePersonalHealthFormatted.enfermedades_neurologicas,
        enfermedades_dermatologicas: storagePersonalHealthFormatted.enfermedades_dermatologicas,
        enfermedades_reumaticas: storagePersonalHealthFormatted.enfermedades_reumaticas,
        diagnosticado_cancer_ultimos_cinco_anos: storagePersonalHealthFormatted.diagnosticado_cancer_ultimos_cinco_anos,
        cancer_diagnosticado: storagePersonalHealthFormatted.cancer_diagnosticado,
        afecciones_diagnosticadas: storagePersonalHealthFormatted.afecciones_diagnosticadas,
        analisis_sangre_ultimos_seis_meses: storagePersonalHealthFormatted.analisis_sangre_ultimos_seis_meses,
        prueba_positiva_covid_19: storageCovid19Formatted.prueba_positiva_covid_19,
        vacunacion_covid_19: storageCovid19Formatted.vacunacion_covid_19,
        tipo_vacuna_recibida: storageCovid19Formatted.tipo_vacuna_recibida,
        cantidad_dosis_vacunacion_recibida: storageCovid19Formatted.cantidad_dosis_vacunacion_recibida,
        sintomas_tenidos_por_covid: storageCovid19Formatted.sintomas_tenidos_por_covid,
        hospitalizado_por_covid_19: storageCovid19Formatted.hospitalizado_por_covid_19,
        tiempo_recuperacion_covid_19: storageCovid19Formatted.tiempo_recuperacion_covid_19,
        sintomas_q_persisten_por_covid_19: storageCovid19Formatted.sintomas_q_persisten_por_covid_19,
      }
      console.log(payload)
      
    } catch (e) {
      Swal.fire({
        icon: 'error',
        text: getError(e)
      })
      throw e
    }

  }
}


async function onComplete() {
  await patientHealthSurveyRef.value.testEvent()
  await saveUserInformation()
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