<script setup>

import {onMounted, ref} from "vue";
import PermissionService from "@/services/platformAdministration/Permission.service.js";
import {getError} from "@/utils/helpers/getError.js";
import RoleService from "@/services/platformAdministration/Role.service.js";
import {Modal} from "bootstrap";

const roleData = ref({
  name: "",
  permissions: []
})
const createRoleModalRef = ref()
const savingRoleButtonStatus = ref(false)
const loadingPermissionsInfo = ref(false)
const permissions = ref([])
const emit = defineEmits(['onRoleCreated'])

const createRole = async () => {

  savingRoleButtonStatus.value = true
  await RoleService.createRole(roleData.value)
      .then(response => {
        if (response.data.statusCode !== 201) {
          Swal.fire({
            icon: 'error',
            title: 'Ooops!',
            text: response.data.message
          })
          savingRoleButtonStatus.value = false
        } else {
          emit('onRoleCreated')
          Swal.fire({
            icon: 'success',
            text: response.data.message
          })
          savingRoleButtonStatus.value = false
          Modal.getInstance(createRoleModalRef.value)?.hide()
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops!',
          text: getError(error)
        })
        savingRoleButtonStatus.value = false
      })

}
const getPermissionsFullList = async () => {
  loadingPermissionsInfo.value = true
  await PermissionService.getPermissionsList()
      .then(response => {
        if (response.data.statusCode !== 200) {
          Swal.fire({
            icon: 'error',
            title: 'Ooops!',
            text: response.data.message
          })
          loadingPermissionsInfo.value = false
        } else {
          permissions.value = response.data.data
          loadingPermissionsInfo.value = false
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops!',
          text: getError(error)
        })
        loadingPermissionsInfo.value = false
      })
}

onMounted(getPermissionsFullList)

</script>

<template>
  <div>
    <button
        class="btn btn-sm btn-outline-primary rounded me-1"
        data-bs-target="#createRoleModal"
        data-bs-toggle="modal"
    >
      <font-awesome-icon :icon="['fas', 'plus']"/>
      Crear Rol
    </button>

    <!-- Modal -->
    <div id="createRoleModal"
         ref="createRoleModalRef"
         aria-hidden="true"
         aria-labelledby="exampleModalLabel"
         class="modal fade"
         tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="exampleModalLabel" class="modal-title fs-5">Creación de Roles</h1>
            <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
          </div>
          <div class="modal-body">

            <div class="row mb-4">
              <div class="col">
                <form autocomplete="off">

                  <div class="mb3">
                    <label class="form-label" for="inputCreateRole">Nombre del rol:</label>
                    <input id="inputCreateRole"
                           v-model="roleData.name"
                           class="form-control"
                           placeholder="Nombre del Rol"
                    >
                  </div>
                  <!-- /.mb3 -->
                </form>
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->

            <div class="row">
              <div class="col">

                <div>
                  <h5 class="fw-bolder text-uppercase">Listado de Permisos</h5>
                </div>

                <div v-for="(item, index) in permissions" :key="item.id" class="form-check">
                  <input :id="`flexCheckChecked-${item.id}`"
                         v-model="roleData.permissions"
                         :value="item.name"
                         checked
                         class="form-check-input"
                         type="checkbox"
                  >
                  <label :for="`flexCheckChecked-${item.id}`" class="form-check-label">
                    {{ item.name }}
                  </label>
                </div>
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
            <button :disabled="savingRoleButtonStatus || roleData.name.length < 3 || !roleData.permissions.length"
                    class="btn btn-success"
                    type="button"
                    @click.prevent="createRole"
            >
              <span v-if="savingRoleButtonStatus" aria-hidden="true" class="spinner-grow spinner-grow-sm"></span>
              <font-awesome-icon v-else :icon="['fas', 'floppy-disk']"/>
              {{ savingRoleButtonStatus ? 'Guardando Rol' : 'Crear Rol' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>