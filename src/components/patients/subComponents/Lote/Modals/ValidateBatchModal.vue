<script setup>

import {computed, ref} from "vue";
import {toast} from "vue3-toastify";
import useLocalStorage from "@/composables/useLocalStorage.js";
import {useStore} from "vuex";
import {useLoading} from "vue-loading-overlay";
import {Modal} from "bootstrap";
import BatchService from "@/services/batchs/Batch.service.js";
import {getError} from "@/utils/helpers/getError.js";

/*
*  Get Logged User
* */
const store = useStore()
const authUser = computed(() => store.getters["auth/authUser"])

/*
*  Clinical Sample and Counter Samples Variables
*  */
const clinicalSamples = useLocalStorage([], 'validateSamplesObject')
const clinicalCounterSamples = useLocalStorage([], 'validateCounterSamplesObject')
const codeSampleInput = ref("")
const codeCounterSampleInput = ref("")
const mainClinicalSamples = computed(() => store.state.clinicalSamples.clinicalSamples)
const mainClinicalCounterSamples = computed(() => store.state.clinicalCounterSamples.clinicalCounterSamples)
const validateBatchModalRef = ref(null)
const fullPage = ref(true)
const regexSamples = /^MU([0-9]{1,9})?-\w{1,11}-\d{1,5}-\d{1,5}$/
const regexCounterSamples = /^CM([0-9]{1,9})?-\w{1,11}-\d{1,5}-\d{1,5}$/
const errorOfCompareObjects = ref([])


const $loading = useLoading({
  loader: 'dots',
  isFullPage: fullPage,
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
})

const addSampleItemToArray = () => {

  if (!regexSamples.test(codeSampleInput.value)) {

    Swal.fire({
      icon: 'error',
      title: 'Oooops!',
      text: 'El código ingresado no corresponde al patrón de la muestra'
    })

  } else {

    if (clinicalSamples.value.includes(codeSampleInput.value)) {
      toast.error('Ya existe un elemento con este código')
      //codeSampleInput.value = ""
      return false;
    }
    clinicalSamples.value.push(codeSampleInput.value)
    codeSampleInput.value = ""
    document.getElementById('inputSampleValidate').focus()
    toast.success('Ítem agregado correctamente')

  }


}
//Agregar elemento al array de validacion
const addCounterSampleItemToArray = () => {
  if (!regexCounterSamples.test(codeCounterSampleInput.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Oooops!',
      text: 'El código ingresado no corresponde al patrón de la Contramuestra'
    })
  } else {
    if (clinicalCounterSamples.value.includes(codeCounterSampleInput.value)) {
      toast.error('Ya existe un elemento con este código')
      //codeSampleInput.value = ""
      return false;
    }
    clinicalCounterSamples.value.push(codeCounterSampleInput.value)
    codeCounterSampleInput.value = ""
    document.getElementById('inputCounterSampleValidate').focus()
    toast.success('Ítem agregado correctamente')
  }
}

const saveBatchesToDB = () => {
  const validateSamplesStorageIn = window.localStorage.getItem('validateSamplesObject')
  const validateCounterSamplesStorageIn = window.localStorage.getItem('validateCounterSamplesObject')
  let arraySamples = []
  let arrayCounterSamples = []
  if (validateSamplesStorageIn) arraySamples = JSON.parse(validateSamplesStorageIn)
  if (validateCounterSamplesStorageIn) arrayCounterSamples = JSON.parse(validateCounterSamplesStorageIn)


  /**
   * Validación longitud muestras igual contramuestras
   * */
  if (arraySamples.length !== arrayCounterSamples.length) {
    Swal.fire({
      icon: 'error',
      title: 'Verifica!',
      text: 'La cantidad de Muestras debe ser igual a las Contramuestras! Verifique!'
    })
  } else {

    /**
     * Validación si localstorage es igual al estado de clinicaSamples
     * */
    //console.log(arrayBatches.length)
    if (arraySamples.length !== mainClinicalSamples.value.length) {
      Swal.fire({
        icon: 'error',
        title: 'Oooops!',
        text: 'La cantidad de Muestras y su validación NO coinciden! Verifique!'
      })

    } else if (arrayCounterSamples.length !== mainClinicalCounterSamples.value.length) {
      Swal.fire({
        icon: 'error',
        title: 'Oooops!',
        text: 'La cantidad de Contramuestras y su validación NO coinciden! Verifique!'
      })

    } else {

      //const equalsValues = arrayBatches.every((obj, index) => compareObjects(obj, mainClinicalSamples.value[index]))
      console.log(arraySamples)
      console.log(mainClinicalSamples.value)
      const equalsValues = compareObjects(arraySamples, mainClinicalSamples.value)

      if (equalsValues) {

        const loader = $loading.show()
        const payload = {
          user_id: authUser.value.id,
          muestras: []
        }

        mainClinicalSamples.value.map((item) => payload.muestras.push(
            item.code_paciente
        ))
        console.log(payload)

        BatchService.saveRealBatch(payload)
            .then((response) => {
              if (response.data.statusCode !== 201) {
                Swal.fire({
                  icon: 'error',
                  text: response.data.message
                })
                loader.hide()
              } else {
                Swal.fire({
                  icon: 'success',
                  text: response.data.message
                })
                console.log(response.data.data)
                window.open('https://mibcode.com/lote.php?mu=' + response.data.data.LoteMuestra.code_lote + '&cm=' + response.data.data.LoteContra.code_lote, '_blank');
                store.commit('clinicalSamples/SET_CLINICAL_SAMPLES', [])
                store.commit('clinicalCounterSamples/SET_CLINICAL_COUNTER_SAMPLES', [])
                window.localStorage.removeItem('validateSamplesObject')
                window.localStorage.removeItem('validateCounterSamplesObject')
                clinicalSamples.value = []
                clinicalCounterSamples.value = []
                closeModal()
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
        console.log('Los arrays contienen objetos iguales');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Los arrays contienen objetos diferentes! Verifique!',
          text: `${errorOfCompareObjects.value}`
        })
      }

    }

  }

}

const compareObjects = (array1, array2) => {
  const prefixText = "MU"
  errorOfCompareObjects.value = []
  //console.log(array1)

  array2.forEach(item => {
    if (!array1.includes(prefixText.concat("-", item.code_paciente, "-", item.sede_id, "-", item.user_id))) {
      errorOfCompareObjects.value.push(prefixText.concat("-", item.code_paciente, "-", item.sede_id, "-", item.user_id))
    }
  })
  console.log(errorOfCompareObjects.value)

  return array2.every(element => {
    return array1.includes(prefixText.concat("-", element.code_paciente, "-", element.sede_id, "-", element.user_id))
  })
}

const removeSampleFromArray = (id_muestra) => {
  const itemIndex = clinicalSamples.value.indexOf(id_muestra)
  clinicalSamples.value.splice(itemIndex, 1)
  toast.warning('Ítem removido correctamente')
}

const removeCounterSampleFromArray = (id_muestra) => {
  const itemIndex = clinicalCounterSamples.value.indexOf(id_muestra)
  clinicalCounterSamples.value.splice(itemIndex, 1)
  toast.warning('Ítem removido correctamente')
}

const closeModal = () => Modal.getInstance(validateBatchModalRef.value)?.hide()

</script>

<template>
  <div>
    <!--    :disabled="!mainClinicalSamples.length || !mainClinicalCounterSamples.length"-->
    <button
        class="btn btn-sm btn-outline-success"
        data-bs-target="#validateBatchModal"
        data-bs-toggle="modal"
    >
      <font-awesome-icon :icon="['fas', 'list-check']" class="fa-beat"/>
      Validar Muestras y Contramuestras
    </button>
    <!-- Modal -->
    <div id="validateBatchModal"
         ref="validateBatchModalRef"
         aria-hidden="true"
         aria-labelledby="exampleModalLabel"
         class="modal fade"
         data-bs-backdrop="static"
         data-bs-keyboard="false"
         tabindex="-1"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="exampleModalLabel"
                class="modal-title fs-5"
            >
              Validación Muestras y Contramuestras para Registro de Lote
            </h1>
            <button aria-label="Close" class="btn" data-bs-dismiss="modal" type="button">
              <font-awesome-icon :icon="['fas', 'times']"/>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mb-3">

              <div class="col border-right">

                <div class="row">
                  <div class="col">
                    <form autocomplete="off" autofocus @submit.prevent="addSampleItemToArray">
                      <div class="row">
                        <div class="col-md-10">
                          <input id="inputSampleValidate"
                                 v-model="codeSampleInput"
                                 autofocus
                                 class="form-control"
                                 placeholder="Ingrese el código de la muestra"
                          />
                        </div>
                        <div class="col-md-2">
                          <button
                              class="btn btn-global-color"
                              type="submit"
                          >
                            Agregar
                          </button>
                        </div>
                      </div>


                    </form>
                  </div>
                  <!-- /.col -->
                </div>
                <!-- /.row -->

                <hr>

                <div class="row">
                  <div class="col">
                    <button v-for="(item) in clinicalSamples"
                            :key="item"
                            class="btn btn-outline-primary me-2 mb-2"
                            @click="removeSampleFromArray(item)"
                    >
                      {{ item }}<!---{{ item.code_paciente }}-1-{{ authUser.id }}-->

                      <font-awesome-icon :icon="['fas', 'times']" class="ms-2 text-danger"/>

                    </button>
                  </div>
                  <!-- /.col -->
                </div>
                <!-- /.row -->


              </div>
              <!-- /.col -->

              <div class="col">
                <form autocomplete="off" autofocus @submit.prevent="addCounterSampleItemToArray">

                  <div class="row">
                    <div class="col-md-10">
                      <input id="inputCounterSampleValidate"
                             v-model="codeCounterSampleInput"
                             autofocus
                             class="form-control"
                             placeholder="Ingrese el código de la contramuestra"
                      />
                    </div>
                    <div class="col-md-2">
                      <button
                          class="btn btn-global-color"
                          type="submit"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>

                </form>

                <hr>

                <div class="row">
                  <div class="col">
                    <button v-for="(item) in clinicalCounterSamples"
                            :key="item"
                            class="btn btn-outline-primary me-2 mb-2"
                            @click="removeCounterSampleFromArray(item)"
                    >
                      {{ item }}<!---{{ item.code_paciente }}-1-{{ authUser.id }}-->

                      <font-awesome-icon :icon="['fas', 'times']" class="ms-2 text-danger"/>

                    </button>
                  </div>
                  <!-- /.col -->
                </div>
                <!-- /.row -->

              </div>
              <!-- /.col -->

            </div>
            <!-- /.row -->


          </div>
          <div class="modal-footer">
            <button class="btn btn-danger" data-bs-dismiss="modal" type="button">
              <font-awesome-icon :icon="['fas', 'times']"/>
              Cerrar
            </button>
            <button :disabled="!clinicalSamples.length"
                    class="btn btn-success"
                    type="button"
                    @click.prevent="saveBatchesToDB"
            >
              <font-awesome-icon :icon="['fas', 'vial-virus']"/>
              Registrar Lote
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>