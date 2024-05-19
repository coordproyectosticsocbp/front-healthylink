<script setup>

import {documentTypes} from "@/utils/const/documentTypes.js";
import {userGender} from "@/utils/const/userGender.js";
import {computed, onMounted} from "vue";
import useLocalStorage from "@/composables/useLocalStorage.js";
import {email, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {toast} from "vue3-toastify";
import dayjs from "dayjs";
import {useRouter} from "vue-router";

const router = useRouter()

const storageCountryVal = window.localStorage.getItem('countries')
const storageStateVal = window.localStorage.getItem('states')
const storageCitiesVal = window.localStorage.getItem('cities')

/** Logic */
const countriesObject = computed(() => {
  let arrayCountry = null;
  if (storageCountryVal) arrayCountry = JSON.parse(storageCountryVal)
  return arrayCountry
})

const statesObject = computed(() => {
  let arrayStates = []
  if (storageStateVal) arrayStates = JSON.parse(storageStateVal)
  const paisIndex = countriesObject.value.find(item => item.name.toLowerCase() === patient.value.pais_residencia.toLowerCase())
  if (!paisIndex) {
    arrayStates = []
  }
  return arrayStates.filter((state) => state.pais_id === paisIndex.id)
})

const citiesObject = computed(() => {
  let arrayCities = [];
  if (storageCitiesVal) arrayCities = JSON.parse(storageCitiesVal)
  const stateIndex = statesObject.value.find(item => item.name.toLowerCase() === patient.value.departamento_residencia.toLowerCase())
  if (!stateIndex) {
    arrayCities = []
  }
  return arrayCities.filter((city) => city.departamentos_regiones_id === stateIndex.id)
})

const patient = useLocalStorage({
  tipo_doc: null,
  numero_documento: '',
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  fecha_nacimiento: null,
  sexo: null,
  grupo_sanguineo: '',
  pais_residencia: '',
  departamento_residencia: '',
  ciudad_residencia: '',
  correo_electronico: '',
  telefono_celular: ''
}, 'patientForm')

const rules = computed(() => {
  return {
    tipo_doc: {required},
    numero_documento: {required, minLength: minLength(5)},
    primer_nombre: {required},
    primer_apellido: {required},
    segundo_apellido: {required},
    fecha_nacimiento: {required},
    sexo: {required},
    grupo_sanguineo: {required},
    pais_residencia: {required},
    correo_electronico: {required, email},
    telefono_celular: {required, minLength: minLength(10)},
  }
})

const v$ = useVuelidate(rules, patient)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    toast.error('Datos personales incompletos')
    return false
  }
  // If the form is valid, perform some action with the form data
  await router.push({
    name: 'create-patient-informed-consent'
  })
  return true;
}

function placeFocusOnDocNum() {
  document.getElementById('input2').focus()
}

onMounted(() => {
  window.localStorage.setItem('currentFormStepIndex', 0)
})

</script>

<template>
  <div>
    <div class="card">

      <div class="card-header text-center bg-white">
        <h4 class="card-title text-uppercase mb-0">
          Formato de registro de paciente
        </h4>
      </div>

      <div class="card-body mt-3 mb-4">

        <!-- Form -->
        <form class="row g-3">

          <!-- Tipo Documento -->
          <div class="col-md-6">
            <label class="form-label" for="input1">Tipo de Documento:</label>
            <select id="input1" v-model="patient.tipo_doc"
                    class="form-select"
                    required
                    @change="placeFocusOnDocNum"
            >
              <option :value="null" selected>Seleccione el tipo</option>
              <option v-for="doctype in documentTypes" :key="doctype.value"
                      :value="doctype.value"
                      v-text="doctype.name"
              />
            </select>
            <span v-if="v$.tipo_doc.$error"
                  class="text-danger"
            >
                  {{ v$.tipo_doc.$errors[0]?.$message }}
                </span>
          </div>

          <!--                    patient.numero_documento.focus()-->
          <!-- Documento -->
          <div class="col-md-6">
            <label class="form-label" for="input2">Documento:</label>
            <input id="input2"
                   v-model="patient.numero_documento"
                   class="form-control"
                   placeholder="Documento"
                   required
                   type="text"
            >
            <span v-if="v$.numero_documento.$error"
                  class="text-danger"
            >
                  {{ v$.numero_documento.$errors[0]?.$message }}
                </span>
          </div>

          <!-- Nombres -->
          <div class="col-md-6">
            <label class="form-label" for="input3">Primer Nombre:</label>
            <input id="input3" v-model="patient.primer_nombre"
                   class="form-control"
                   placeholder="Primer Nombre"
                   required
                   type="text"

            >
            <span v-if="v$.primer_nombre.$error"
                  class="text-danger"
            >
                  {{ v$.primer_nombre.$errors[0]?.$message }}
                </span>
          </div>

          <div class="col-md-6">
            <label class="form-label" for="input4">Segundo Nombre:</label>
            <input id="input4" v-model="patient.segundo_nombre"
                   class="form-control"
                   placeholder="Segundo Nombre"
                   type="text"

            >
          </div>

          <!-- Apellidos -->
          <div class="col-md-6">
            <label class="form-label" for="input5">Primer Apellido:</label>
            <input id="input5" v-model="patient.primer_apellido"
                   class="form-control"
                   placeholder="Primer Apellido"
                   required
                   type="text"

            >
            <span v-if="v$.primer_apellido.$error"
                  class="text-danger"
            >
                  {{ v$.primer_apellido.$errors[0]?.$message }}
                </span>
          </div>
          <div class="col-md-6">
            <label class="form-label" for="input6">Segundo Apellido:</label>
            <input id="input6" v-model="patient.segundo_apellido"
                   class="form-control"
                   placeholder="Segundo Apellido"
                   type="text"

            >
            <span v-if="v$.segundo_apellido.$error"
                  class="text-danger"
            >
                  {{ v$.segundo_apellido.$errors[0]?.$message }}
                </span>
          </div>

          <!-- Fecha de Nacimiento -->
          <div class="col-md-6">
            <label class="form-label" for="input7">Fecha de Nacimiento:</label>
            <input id="input7" v-model="patient.fecha_nacimiento"
                   :max="dayjs().format('YYYY-MM-DD')"
                   class="form-control"
                   required
                   type="date"
            >
            <span v-if="v$.fecha_nacimiento.$error"
                  class="text-danger"
            >
                  {{ v$.fecha_nacimiento.$errors[0]?.$message }}
                </span>
          </div>

          <!-- Sexo-->
          <div class="col-md-3">
            <label class="form-label" for="input7">Sexo:</label>
            <select id="input7" v-model="patient.sexo"
                    class="form-select"
                    required

            >
              <option :value="null" selected>Seleccione el Sexo</option>
              <option v-for="gender in userGender"
                      :key="gender.value"
                      :value="gender.value"
                      v-text="gender.name"
              />
            </select>
            <span v-if="v$.sexo.$error"
                  class="text-danger"
            >
                  {{ v$.sexo.$errors[0]?.$message }}
                </span>
          </div>

          <div class="col-md-3">
            <label class="form-label" for="input8">G.S. RH:</label>
            <input id="input8" v-model="patient.grupo_sanguineo"
                   class="form-control"
                   placeholder="O+, O-, AB, etc..."
                   type="text"
            >
            <span v-if="v$.grupo_sanguineo.$error"
                  class="text-danger"
            >
                  {{ v$.grupo_sanguineo.$errors[0]?.$message }}
                </span>
          </div>

          <div class="col-md-8">
            <label class="form-label" for="input9">Email:</label>
            <input id="input9" v-model="patient.correo_electronico"
                   class="form-control"
                   placeholder="Email (x@mail.com)"
                   type="email"
            >
            <span v-if="v$.correo_electronico.$error"
                  class="text-danger"
            >
                  {{ v$.correo_electronico.$errors[0]?.$message }}
                </span>
          </div>

          <div class="col-md-4">
            <label class="form-label" for="input10">Teléfono Celular:</label>
            <input id="input10" v-model="patient.telefono_celular"
                   class="form-control"
                   placeholder="Teléfono"
                   required
                   type="number"
            >
            <span v-if="v$.telefono_celular.$error"
                  class="text-danger"
            >
                  {{ v$.telefono_celular.$errors[0]?.$message }}
                </span>
          </div>

          <!-- País -->
          <div class="col-md-4">
            <label class="form-label" for="input11">País Nacimiento:</label>
            <select id="input11" v-model="patient.pais_residencia"
                    class="form-select"
                    required
            >
              <option value="null">Seleccione el país</option>
              <option v-for="country in countriesObject"
                      :key="country.id"
                      :value="country.name.toUpperCase()"
                      v-text="country.name.toUpperCase()"
              />
            </select>
          </div>

          <!-- Departamento -->
          <div class="col-md-4">
            <label class="form-label" for="input12">Departamento Nacimiento:</label>
            <select id="input12" v-model="patient.departamento_residencia"
                    class="form-select"
                    required
            >
              <option value="null">Seleccione el Departamento</option>
              <option v-for="state in statesObject"
                      :key="state.id"
                      :value="state.name.toUpperCase()"
                      v-text="state.name.toUpperCase()"
              />
            </select>
          </div>

          <!-- Ciudad -->
          <div class="col-md-4">
            <label class="form-label" for="input13">Ciudad Nacimiento:</label>
            <select id="input13" v-model="patient.ciudad_residencia" class="form-select" required>
              <option value="null">Seleccione la Ciudad</option>
              <option v-for="city in citiesObject"
                      :key="city.id"
                      :value="city.name.toUpperCase()"
                      v-text="city.name.toUpperCase()"
              />
            </select>
          </div>


        </form>
        <!-- End Form -->

      </div>

      <div class="card-footer bg-white text-end">
        <button
            class="btn btn-sm btn-outline-success"
            @click.prevent="handleSubmit"
        >
          <font-awesome-icon :icon="['fas', 'file-signature']"/>
          Ir a Consentimiento
        </button>
      </div>
      <!-- /.card-footer -->

    </div>
  </div>
</template>

<style scoped>
</style>