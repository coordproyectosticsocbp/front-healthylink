<script setup>
import PermissionService from "@/services/platformAdministration/Permission.service.js";
import {ref} from "vue";
import {getError} from "@/utils/helpers/getError.js";
import {Modal} from "bootstrap";

const permissionName = ref("")
const savingPermissionButtonStatus = ref(false)
const createPermissionModalRef = ref()
const emit = defineEmits(['onPermissionCreated'])
const createPermission = async () => {

  if (!permissionName.value.length) {
    alert('El nombre no puede estar vacío!')
    return false
  }
  savingPermissionButtonStatus.value = true
  const paylaod = {
    name: permissionName.value
  }

  await PermissionService.createPermission(paylaod)
      .then(response => {
        if (response.data.statusCode !== 201) {
          Swal.fire({
            icon: 'error',
            title: 'Ooops!',
            text: response.data.message
          })
          savingPermissionButtonStatus.value = false
        } else {
          Swal.fire({
            icon: 'success',
            text: response.data.message
          })
          permissionName.value = ""
          savingPermissionButtonStatus.value = false
          emit('onPermissionCreated')
          Modal.getInstance(createPermissionModalRef.value)?.hide()
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops!',
          text: getError(error)
        })
        savingPermissionButtonStatus.value = false
      })
}

</script>

<template>
  <div>
    <button
        class="btn btn-sm btn-outline-primary rounded me-1"
        data-bs-target="#createPermissionModal"
        data-bs-toggle="modal"
    >
      <font-awesome-icon :icon="['fas', 'plus']"/>
      Crear Permiso
    </button>

    <!-- Modal -->
    <div id="createPermissionModal"
         ref="createPermissionModalRef"
         aria-hidden="true"
         aria-labelledby="exampleModalLabel"
         class="modal fade"
         tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="exampleModalLabel" class="modal-title fs-5">Creación de permisos</h1>
            <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
          </div>
          <div class="modal-body">

            <div class="row">
              <div class="col">
                <form autocomplete="off">

                  <div class="mb3">
                    <label class="form-label" for="inputCreatePermission">Nombre del permiso:</label>
                    <input id="inputCreatePermission"
                           v-model="permissionName"
                           class="form-control"
                           placeholder="module prefix-name"
                    >
                  </div>
                  <!-- /.mb3 -->
                </form>
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
            <button :disabled="savingPermissionButtonStatus"
                    class="btn btn-success"
                    type="button"
                    @click.prevent="createPermission"
            >
              <span v-if="savingPermissionButtonStatus" aria-hidden="true" class="spinner-grow spinner-grow-sm"></span>
              <font-awesome-icon v-else :icon="['fas', 'floppy-disk']"/>
              {{ savingPermissionButtonStatus ? 'Guardando Permiso' : 'Crear Permiso' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>