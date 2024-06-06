<script setup>

import {ref} from "vue";
import {Modal} from "bootstrap";

const InformedConsentSignaturePadRef = ref()
const patientSignatureExists = ref(false)
const consentComponentSignature = ref(null)
const signature1 = ref(null)
const storageSignature = ref(null)
const emit = defineEmits(['onSignatureSubmit'])

/*
*  GETTING THE SIGNATURE VALUE IN LOCAL STORAGE
* */
const storageVal = window.localStorage.getItem('patientSignature')

const onButtonClick = () => {
  Modal.getInstance(InformedConsentSignaturePadRef.value)?.show()
}

function saveSignature(t) {

  Swal.fire({
    title: "Registrar firma?",
    icon: 'warning',
    text: 'Esta acción es irreversible!',
    confirmButtonColor: "#198754",
    cancelButtonColor: "#dc3545",
    confirmButtonText: "Si, Registrar",
    cancelButtonText: "Cancelar",
    showCancelButton: true
  }).then(result => {
    if (result.isConfirmed) {

      consentComponentSignature.value = signature1.value.save(t)
      if (!storageVal) {
        //console.log(consentComponentSignature.value.toString())
        window.localStorage.setItem('patientSignature', JSON.stringify(consentComponentSignature.value.toString()))
        storageSignature.value = consentComponentSignature.value.toString()
        patientSignatureExists.value = true
      }
      emit('onSignatureSubmit')
      Modal.getInstance(InformedConsentSignaturePadRef.value)?.hide()

      Swal.fire({
        icon: 'success',
        title: 'Firma Registrada!',
      })
    }
  })
}

function clearPad() {
  if (storageVal) window.localStorage.removeItem('patientSignature')
  signature1.value.clear()
}

function undoAction() {
  signature1.value.undo();
}

</script>

<template>
  <!-- Button trigger modal -->
  <button class="btn btn-warning"
          data-bs-target="#InformedConsentSignaturePad"
          data-bs-toggle="modal"
          type="button"
          @click="onButtonClick"
  >
    <font-awesome-icon :icon="['fas', 'signature']"/>
    Firmar Consentimiento
  </button>

  <!-- Modal -->
  <div id="InformedConsentSignaturePad" ref="InformedConsentSignaturePadRef" aria-hidden="true"
       aria-labelledby="exampleModalLabel"
       class="modal fade"
       tabindex="-1"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="exampleModalLabel" class="modal-title fs-5">Registro de firma.</h1>
          <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
        </div>
        <div class="modal-body">

          <div class="container-fluid">
            <div class="row">
              <div class="col w-100">
                <Vue3Signature v-if="!patientSignatureExists" id="signaturePad"
                               ref="signature1" :h="'400px'" :w="'1100px'" class="signature-pad mb-1 position-relative"
                />
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
          <!-- /.container-fluid -->


        </div>
        <div class="modal-footer">
          <button class="btn btn-sm btn-warning me-1" @click="clearPad">
            <font-awesome-icon :icon="['fas', 'brush']"/>
            Limpiar
          </button>
          <button class="btn btn-sm btn-primary me-1" @click="undoAction">
            <font-awesome-icon :icon="['fas', 'rotate-left']"/>
            Regresar
          </button>
          <button class="btn btn-sm btn-success" @click="saveSignature('image/jpeg')">
            <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signature-pad {
  margin: 0 auto;
}
</style>