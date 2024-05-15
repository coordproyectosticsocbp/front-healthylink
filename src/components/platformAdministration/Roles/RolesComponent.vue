<script setup>

import {onMounted, ref} from "vue";
import {useLoading} from "vue-loading-overlay";
import {getError} from "@/utils/helpers/getError.js";
import RoleService from "@/services/platformAdministration/Role.service.js";
import CreateRoleModal from "@/components/platformAdministration/Roles/modals/CreateRoleModal.vue";

const roles = ref([])
const fullPage = ref(true)
const searchField = ref(["name"])
const searchValue = ref("")

const headers = [
  {text: "ROL", value: "name"},
  {text: "PERMISOS", value: "permissions"},
  {text: "ACCIONES", value: "actions"},
]

const $loading = useLoading({
  loader: 'dots',
  isFullPage: fullPage,
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
})
const getRolesFullList = async () => {

  const loader = $loading.show()
  await RoleService.getRoleList()
      .then(response => {
        if (response.data.statusCode !== 200) {
          Swal.fire({
            icon: 'error',
            title: 'Ooops!',
            text: response.data.message
          })
          loader.hide()
        } else {
          roles.value = response.data.data
          loader.hide()
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops!',
          text: getError(error)
        })
        loader.hide()
      })
}

const deleteRole = async (roleId) => {

  if (!roleId) {
    Swal.fire({
      icon: 'error',
      title: 'Ooops!',
      text: 'Parametro del rol vacío'
    })
    return false;
  }
  
  Swal.fire({
    title: "Estas seguro?",
    text: "No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminarlo!"
  }).then((result) => {
    if (result.isConfirmed) {

      const loader = $loading.show()

      RoleService.deleteRole(roleId)
          .then(response => {
            if (response.data.statusCode !== 200) {

              Swal.fire({
                icon: 'error',
                title: 'Ooops!',
                text: response.data.message
              })
              loader.hide()

            } else {

              const roleIndex = roles.value.indexOf(item => item.id === roleId)
              roles.value.splice(roleIndex, 1)

              Swal.fire({
                title: 'Rol Eliminado Correctamente',
                icon: "success"
              });
              loader.hide()
            }
          })
    }
  })
}

onMounted(getRolesFullList)

</script>

<template>
  <div class="container">
    <div class="row">

      <div class="col">

        <div class="card">
          <div class="card-body">

            <div class="row mb-3">
              <div class="col">
                <div class="form-floating">
                  <input id="floatingInput3" v-model="searchValue"
                         autocomplete="off"
                         class="form-control"
                         placeholder="Escriba Aquí Para Buscar"
                         type="text"
                  >
                  <label for="floatingInput3">
                    Escriba Aquí Para Buscar (Nombre)
                  </label>
                </div>
              </div>
              <div class="col d-flex align-items-center justify-content-end">

                <CreateRoleModal @onRoleCreated="getRolesFullList"/>

                <button
                    class="btn btn-sm btn-warning rounded"
                    @click.prevent="getRolesFullList"
                >
                  <font-awesome-icon :icon="['fas', 'sync']"/>
                  Recargar
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col">

                <EasyDataTable :headers="headers"
                               :items="roles"
                               :rows-items="[10, 20, 30]"
                               :rows-per-page="10"
                               :search-field="searchField"
                               :search-value="searchValue"
                               buttons-pagination
                               show-index
                >
                  <template #item-permissions="item">
                    <h6>
                      <span v-for="(per, index) in item.permissions" :key="per.id" class="badge text-bg-secondary me-1">
                        {{ per.name }}
                      </span>
                    </h6>
                  </template>

                  <template #item-actions="item">

                    <button :id="`user-button-${item.id}`"
                            :title="`Eliminar rol: ${item.name}`"
                            class="btn btn-outline-danger btn-sm"
                            type="button"
                            @click.prevent="deleteRole(item.id)"
                    >
                      <font-awesome-icon :icon="['fas', 'trash']"/>
                    </button>

                  </template>
                </EasyDataTable>

              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->


          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->

      </div>
      <!-- /.col -->

    </div>
    <!-- /.row -->
  </div>
  <!-- /.container -->
</template>

<style scoped>

</style>