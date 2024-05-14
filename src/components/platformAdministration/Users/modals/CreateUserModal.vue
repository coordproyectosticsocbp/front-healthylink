<script setup>

import {computed, onMounted, reactive, ref} from "vue";
import {minLength, numeric, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {toast} from "vue3-toastify";
import UserService from "@/services/platformAdministration/User.service.js";
import {documentTypes} from "@/utils/const/documentTypes.js";
import {getError} from "@/utils/helpers/getError.js";
import RoleService from "@/services/platformAdministration/Role.service.js";
import {Modal} from "bootstrap";

const createUserModalRef = ref()
const savingUserStatus = ref(false)
const roles = ref([])
const userData = reactive({
  firstName: "",
  middleName: "",
  lastName: "",
  surName: "",
  username: "",
  doc_type_id: null,
  document: "",
  phone: "",
  address: "",
  email: "",
  password: "",
  role_id: null
})
const emit = defineEmits(['onUserCreated'])

const rules = computed(() => {
  return {
    firstName: {required},
    lastName: {required},
    surName: {required},
    username: {required, minLength: minLength(3)},
    doc_type_id: {required},
    document: {required, minLength: minLength(5)},
    phone: {numeric, minLength: minLength(9)},
    email: {required},
    password: {required, minLength: minLength(5)},
    role_id: {required}
  }
})

const v$ = useVuelidate(rules, userData)

const saveUser = async () => {
  const result = await v$.value.$validate()

  if (!result) {
    toast.error('Información INCOMPLETA, verifique!')
    return false
  }

  savingUserStatus.value = true

  UserService.createUser(userData)
      .then(response => {
        if (response.data.statusCode !== 201) {
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
          savingUserStatus.value = false
        } else {
          Swal.fire({
            icon: 'success',
            text: response.data.message
          })
          savingUserStatus.value = false
          emit('onUserCreated')
          Modal.getInstance(createUserModalRef.value)?.hide()
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          text: getError(error)
        })
        savingUserStatus.value = false
      })

}

const getRoleFullList = async () => {
  RoleService.getRoleList()
      .then(response => roles.value = response.data.data)
      .catch(error => {
        toast.error(getError(error))
      })
}

onMounted(getRoleFullList)

</script>

<template>

  <div>
    <button class="btn btn-sm btn-outline-primary me-1"
            data-bs-target="#createUserModal"
            data-bs-toggle="modal"
    >
      <font-awesome-icon :icon="['fas', 'user-plus']"/>
      Crear Usuario
    </button>

    <!-- Modal -->
    <div id="createUserModal"
         ref="createUserModalRef"
         aria-hidden="true"
         aria-labelledby="exampleModalLabel"
         class="modal fade"
         tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="exampleModalLabel" class="modal-title fs-5">Creación de Usuarios</h1>
            <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
          </div>
          <div class="modal-body">

            <form autocomplete="off" @submit.prevent="saveUser">

              <div class="row mb-3">
                <div class="col">
                  <label class="form-label" for="inputFirstName">Primer Nombre:</label>
                  <input id="inputFirstName"
                         v-model="userData.firstName"
                         aria-label="Primer Nombre"
                         class="form-control"
                         placeholder="Primer Nombre"
                         type="text"
                  >
                  <span v-if="v$.firstName.$error"
                        class="text-danger"
                  >
                    {{ v$.firstName.$errors[0]?.$message }}
                  </span>
                </div>
                <div class="col">
                  <label class="form-label" for="inputMiddleName">Segundo Nombre:</label>
                  <input id="inputMiddleName"
                         v-model="userData.middleName"
                         aria-label="Segundo Nombre"
                         class="form-control"
                         placeholder="Segundo Nombre"
                         type="text"
                  >
                </div>
              </div>

              <div class="row mb-3">
                <div class="col">
                  <label class="form-label" for="inputLastName">Primer Apellido:</label>
                  <input id="inputLastName"
                         v-model="userData.lastName"
                         aria-label="Primer Apellido"
                         class="form-control"
                         placeholder="Primer Apellido"
                         type="text"
                  >
                  <span v-if="v$.lastName.$error"
                        class="text-danger"
                  >
                    {{ v$.lastName.$errors[0]?.$message }}
                  </span>
                </div>
                <div class="col">
                  <label class="form-label" for="inputSurName">Segundo Apellido:</label>
                  <input id="inputSurName"
                         v-model="userData.surName"
                         aria-label="Segundo Apellido"
                         class="form-control"
                         placeholder="Segundo Apellido"
                         type="text"
                  >
                  <span v-if="v$.surName.$error"
                        class="text-danger"
                  >
                    {{ v$.surName.$errors[0]?.$message }}
                  </span>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col">
                  <label class="form-label" for="inputUsername">Usuario:</label>
                  <input id="inputUsername"
                         v-model="userData.username"
                         aria-label="Usuario"
                         class="form-control"
                         placeholder="Usuario"
                         type="text"
                  >
                  <span v-if="v$.username.$error"
                        class="text-danger"
                  >
                    {{ v$.username.$errors[0]?.$message }}
                  </span>
                </div>
              </div> <!-- /.row mb-3 -->

              <div class="row mb-3">
                <div class="col">
                  <label class="form-label" for="inputDoctype">Tipo Documento:</label>
                  <select id="inputDoctype" v-model="userData.doc_type_id"
                          class="form-select"
                  >
                    <option selected value="null">Seleccione una opción</option>
                    <option v-for="dt in documentTypes"
                            :key="dt.id"
                            :value="dt.id"
                    >
                      {{ dt.name }}
                    </option>
                  </select>
                  <!--                  <input id="inputDoctype"
                                           v-model="userData.doc_type_id"
                                           aria-label="Tipo Documento"
                                           class="form-control"
                                           placeholder="Tipo Documento"
                                           type="text"
                                    >-->
                  <span v-if="v$.doc_type_id.$error"
                        class="text-danger"
                  >
                    {{ v$.doc_type_id.$errors[0]?.$message }}
                  </span>
                </div>
                <div class="col">
                  <label class="form-label" for="inputDocument">Documento:</label>
                  <input id="inputDocument"
                         v-model="userData.document"
                         aria-label="Documento"
                         class="form-control"
                         placeholder="Documento"
                         type="text"
                  >
                  <span v-if="v$.document.$error"
                        class="text-danger"
                  >
                    {{ v$.document.$errors[0]?.$message }}
                  </span>
                </div>
              </div> <!-- /.row mb-3 -->

              <div class="row mb-3">
                <div class="col">
                  <label class="form-label" for="inputPhone">Teléfono:</label>
                  <input id="inputPhone"
                         v-model="userData.phone"
                         aria-label="Teléfono"
                         class="form-control"
                         placeholder="Teléfono"
                         type="number"
                  >
                  <span v-if="v$.phone.$error"
                        class="text-danger"
                  >
                    {{ v$.phone.$errors[0]?.$message }}
                  </span>
                </div>
                <div class="col">
                  <label class="form-label" for="inputAddress">Dirección:</label>
                  <input id="inputAddress"
                         v-model="userData.address"
                         aria-label="Dirección"
                         class="form-control"
                         placeholder="Dirección"
                         type="text"
                  >
                </div>
              </div> <!-- /.row mb-3 -->

              <div class="row mb-3">
                <div class="col">
                  <label class="form-label" for="inputEmail">Email:</label>
                  <input id="inputEmail"
                         v-model="userData.email"
                         aria-label="Email"
                         class="form-control"
                         placeholder="Email"
                         type="email"
                  >
                  <span v-if="v$.email.$error"
                        class="text-danger"
                  >
                    {{ v$.email.$errors[0]?.$message }}
                  </span>
                </div>
                <div class="col">
                  <label class="form-label" for="inputPassword">Contraseña:</label>
                  <input id="inputPassword"
                         v-model="userData.password"
                         aria-label="Contraseña"
                         class="form-control"
                         placeholder="Contraseña"
                         type="password"
                  >
                  <span v-if="v$.password.$error"
                        class="text-danger"
                  >
                    {{ v$.password.$errors[0]?.$message }}
                  </span>
                </div>
              </div> <!-- /.row mb-3 -->

              <div class="row">
                <div class="col">
                  <label class="form-label" for="inputUserRol">ROL del Usuario:</label>
                  <select id="inputUserRol" v-model="userData.role_id"
                          class="form-select"
                  >
                    <option selected value="null">Seleccione una opción</option>
                    <option v-for="rol in roles"
                            :key="rol.id"
                            :value="rol.id"
                    >
                      {{ rol.name }}
                    </option>
                  </select>
                  <span v-if="v$.role_id.$error"
                        class="text-danger"
                  >
                    {{ v$.role_id.$errors[0]?.$message }}
                  </span>
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->

              <hr>

              <div class="row">
                <div class="col text-end">
                  <button class="btn btn-sm btn-danger me-1"
                          data-bs-dismiss="modal"
                          type="button"
                  >
                    <font-awesome-icon :icon="['fas', 'times']"/>
                    Cancelar
                  </button>
                  <button :disabled="savingUserStatus"
                          class="btn btn-sm btn-success"
                          type="submit"
                  >
                    <span v-if="savingUserStatus" aria-hidden="true" class="spinner-grow spinner-grow-sm"></span>
                    <font-awesome-icon v-else :icon="['fas', 'floppy-disk']"/>
                    {{ savingUserStatus ? 'Creando Usuario...' : 'Crear Usuario' }}
                  </button>
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->

            </form>

          </div>
        </div>
      </div>
    </div> <!-- End Modal -->

  </div>

</template>

<style scoped>

</style>