<script setup>
import {onMounted, ref} from "vue";
import {useLoading} from "vue-loading-overlay";
import UserService from "@/services/platformAdministration/User.service.js";
import {getError} from "@/utils/helpers/getError.js";
import CreateUserModal from "@/components/platformAdministration/Users/modals/CreateUserModal.vue";

const users = ref([])
const fullPage = ref(true)
const searchField = ref(["firstName", 'middleName', 'lastName', 'surName', 'document', 'email', 'phone'])
const searchValue = ref("")

const headers = [
  {text: 'NOMBRE COMPLETO', value: 'fullName'},
  {text: 'USUARIO', value: 'username'},
  {text: 'TIPO DOC', value: 'doc_type_id'},
  {text: 'DOCUMENTO', value: 'document'},
  {text: 'TELÉFONO', value: 'phone'},
  {text: 'EMAIL', value: 'email'},
  {text: 'ESTADO', value: 'userStatus'},
  {text: 'ROL', value: 'roles'},
  {text: 'ACCIONES', value: 'actions'},
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

const getFullUserList = async () => {

  const loader = $loading.show()

  await UserService.getUsers()
      .then(response => {
        if (response.data.statusCode !== 200) {
          Swal.fire({
            icon: 'error',
            title: 'Ooops!',
            text: response.data.message
          })
          loader.hide()
        } else {
          users.value = response.data.data
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

const inactivateUser = async (userId) => {

  if (!userId) {
    Swal.fire({
      icon: 'error',
      title: 'Ooops!',
      text: 'Parametro del usuario vacío'
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
  })
      .then((result) => {
        if (result.isConfirmed) {

          const loader = $loading.show()

          UserService.inactivateUser(userId)
              .then(response => {
                if (response.data.statusCode !== 200) {

                  Swal.fire({
                    icon: 'error',
                    title: 'Ooops!',
                    text: response.data.message
                  })
                  loader.hide()

                } else {

                  const userIndex = users.value.findIndex(item => item.id === userId)
                  users.value.splice(userIndex, 1)

                  Swal.fire({
                    title: 'Usuario Eliminado Correctamente',
                    icon: "success"
                  });
                  loader.hide()
                }
              })
        }
      })
      .catch(() => loader.hide())
}

onMounted(getFullUserList)

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
                  <input id="floatingInputSearch" v-model="searchValue"
                         autocomplete="off"
                         class="form-control"
                         placeholder="Escriba Aquí Para Buscar"
                         type="text"
                  >
                  <label for="floatingInputSearch">
                    Escriba Aquí Para Buscar (Documento, Email, Usuario)
                  </label>
                </div>
              </div>
              <div class="col d-flex align-items-center justify-content-end">

                <CreateUserModal @onUserCreated="getFullUserList"/>

                <button
                    class="btn btn-sm btn-warning rounded"
                    @click.prevent="getFullUserList"
                >
                  <font-awesome-icon :icon="['fas', 'sync']"/>
                  Recargar
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col">

                <EasyDataTable :headers="headers"
                               :items="users"
                               :rows-items="[10, 20, 30]"
                               :rows-per-page="10"
                               :search-field="searchField"
                               :search-value="searchValue"
                               buttons-pagination
                               show-index
                >

                  <template #item-fullName="item">
                    {{
                      item.firstName.toUpperCase()
                      + ' ' + item.middleName.toUpperCase()
                      + ' ' + item.lastName.toUpperCase()
                      + ' ' + item.surName.toUpperCase()
                    }}
                  </template>

                  <template #item-roles="item">
                    <h6>
                      <span v-for="(rol, index) in item.roles" :key="rol.id" class="badge text-bg-secondary me-1">
                        {{ rol.name }}
                      </span>
                    </h6>
                  </template>

                  <template #item-userStatus="item">
                    <font-awesome-icon :class="`${item.userStatus ? 'text-success' : 'text-danger'}`"
                                       :icon="['fas', `${item.userStatus ? 'user-check' : 'user-xmark'}`]"/>
                  </template>

                  <template #item-actions="item">

                    <button :id="`user-button-${item.id}`"
                            class="btn btn-outline-danger btn-sm me-1"
                            type="button"
                            @click.prevent="inactivateUser(item.id)"
                    >
                      <font-awesome-icon :icon="['fas', 'trash']"/>
                    </button>

                    <!--                    <button :id="`user-button-${item.id}`"
                                                class="btn btn-outline-warning btn-sm"
                                                type="button"
                                        >
                                          <font-awesome-icon :icon="['fas', 'pen']"/>
                                        </button>-->

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