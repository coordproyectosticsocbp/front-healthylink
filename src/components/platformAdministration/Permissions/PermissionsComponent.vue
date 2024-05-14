<script setup>
import {onMounted, ref} from "vue";
import {useLoading} from "vue-loading-overlay";
import PermissionService from "@/services/platformAdministration/Permission.service.js";
import {getError} from "@/utils/helpers/getError.js";
import CreatePermissionModal from "@/components/platformAdministration/Permissions/modals/CreatePermissionModal.vue";

const permissions = ref([])
const fullPage = ref(true)
const searchField = ref(["name"])
const searchValue = ref("")

const headers = [
  {text: "PERMISO", value: "name"},
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


const getPermissionsFullList = async () => {

  const loader = $loading.show()

  await PermissionService.getPermissionsList()
      .then(response => {
        if (response.data.statusCode !== 200) {
          Swal.fire({
            icon: 'error',
            title: 'Ooops!',
            text: response.data.message
          })
          loader.hide()
        } else {
          permissions.value = response.data.data
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

const deletePermission = async (permissionId) => {
  console.log(permissionId)
}

onMounted(getPermissionsFullList)

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

                <CreatePermissionModal @onPermissionCreated="getPermissionsFullList"/>

                <button
                    class="btn btn-sm btn-warning rounded"
                    @click.prevent="getPermissionsFullList"
                >
                  <font-awesome-icon :icon="['fas', 'sync']"/>
                  Recargar
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col">

                <EasyDataTable :headers="headers"
                               :items="permissions"
                               :rows-items="[10, 20, 30]"
                               :rows-per-page="10"
                               :search-field="searchField"
                               :search-value="searchValue"
                               buttons-pagination
                               show-index
                >
                  <!--                  <template #item-userStatus="item">
                                      <font-awesome-icon :class="`${item.userStatus ? 'text-success' : 'text-danger'}`"
                                                         :icon="['fas', `${item.userStatus ? 'user-check' : 'user-xmark'}`]"/>
                                    </template>-->

                  <template #item-actions="item">

                    <button :id="`user-button-${item.id}`"
                            class="btn btn-outline-danger btn-sm me-1"
                            type="button"
                            @click.prevent="deletePermission(item.id)"
                    >
                      <font-awesome-icon :icon="['fas', 'trash']"/>
                    </button>

                    <button :id="`user-button-${item.id}`"
                            class="btn btn-outline-warning btn-sm"
                            type="button"
                    >
                      <font-awesome-icon :icon="['fas', 'pen']"/>
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