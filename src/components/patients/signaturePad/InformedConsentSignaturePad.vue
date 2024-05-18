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
  consentComponentSignature.value = signature1.value.save(t)
  if (!storageVal) {
    //console.log(consentComponentSignature.value.toString())
    window.localStorage.setItem('patientSignature', JSON.stringify(consentComponentSignature.value.toString()))
    storageSignature.value = consentComponentSignature.value.toString()
    patientSignatureExists.value = true
  }
  emit('onSignatureSubmit')
  Modal.getInstance(InformedConsentSignaturePadRef.value)?.hide()
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
          <h1 id="exampleModalLabel" class="modal-title fs-5">Modal title</h1>
          <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
        </div>
        <div class="modal-body">

          <div class="row">
            <div class="col">
              <Vue3Signature v-if="!patientSignatureExists" id="signaturePad"
                             ref="signature1" :h="'400px'"
                             :w="'1052.8px'"
                             class="signature-pad mb-4"
              />
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->

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

</style>