<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h6 class="text-center text-uppercase mb-0 fw-bold">
          Ingresar código de muestras para crear el lote
        </h6>
        <hr>
        <div v-if="mostrarFormulario">
          <div class="input-group mb-3">
            <input v-model="nuevoElemento" type="text" class="form-control" placeholder="Código de la muestra">
            <div class="input-group-append">
              <button @click="agregarElemento" class="btn btn-primary">Agregar</button>
            </div>
          </div>
          <hr>
          <div class="input-group mb-3">
            <input v-model="filtro" type="text" class="form-control" placeholder="Buscar código...">
          </div>
          <ul class="list-group">
            <li v-if="filteredItems.length === 0" class="list-group-item">No hay elementos que coincidan con la búsqueda.</li>
            <li v-else v-for="(elemento, index) in filteredItems" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
              # MU-{{ elemento }}
              <button @click="eliminarElemento(index)" class="btn btn-danger btn-sm">
                <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                Eliminar
              </button>
            </li>
          </ul>

        </div>
        <div class="row justify-content-center">
          <div class="col-md-4">
            <div class="input-group mb-4">
              <button v-if="mostrarFormulario" class="btn btn-global-color btn-sm rounded"
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      title="Completar CRF"
                      @click="toggleModalMuestra">
                Cerrar apertura
                <font-awesome-icon :icon="['fas', 'list-check']"/>
              </button>


              <button v-if="!mostrarFormulario" @click="aperturarLote" class="btn mb-10" :class="mostrarFormulario ? 'btn-warning' : 'btn-primary'">
                {{ mostrarFormulario ? 'Cerrar apertura lote' : 'Aperturar lote muestra' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h6 class="text-center text-uppercase mb-0 fw-bold">
          Ingresar código de CONTRAMUESTRAS para crear el lote
        </h6>
        <hr>
        <div v-if="mostrarFormularioContra">
          <div class="input-group mb-3">
            <input v-model="nuevoElementoContraMuestra" type="text" class="form-control" placeholder="Código de la muestra">
            <div class="input-group-append">
              <button @click="agregarElementoContraMuestra" class="btn btn-primary">Agregar</button>
            </div>
          </div>
          <hr>
          <div class="input-group mb-3">
            <input v-model="filtro" type="text" class="form-control" placeholder="Buscar código...">
          </div>
          <ul class="list-group">
            <li v-if="filteredItemsContraMuestra.length === 0" class="list-group-item">No hay elementos que coincidan con la búsqueda.</li>
            <li v-else v-for="(elemento, index) in filteredItemsContraMuestra" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
              # CM-{{ elemento }}
              <button @click="eliminarElementoContraMuestra(index)" class="btn btn-danger btn-sm">
                <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                Eliminar
              </button>
            </li>
          </ul>

        </div>
        <div class="row justify-content-center">
          <div class="col-md-4">
            <div class="input-group mb-4">
              <button @click="aperturarLoteContraMuestra" class="btn mb-10" :class="mostrarFormularioContra ?'btn-warning' : 'btn-primary'">
                {{ mostrarFormularioContra ? 'Cerrar apertura lote' : 'Aperturar lote muestra' }}
              </button>


            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
    <ValidateLote/>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import PatientService from '@/services/patients/Patient.service.js'
import { getError } from "@/utils/helpers/getError.js";
import { useLoading } from "vue-loading-overlay";
import {toast} from "vue3-toastify";
import ValidateLote from "@/components/patients/subComponents/Lote/Modals/ValidateLote.vue";

const tempMuestras = ref([])
const tempContraMuestras = ref([])

const fullPage = ref(true)
const errors = ref(null)
const mostrarFormulario = ref(false)
const mostrarFormularioContra = ref(false)
const nuevoElemento = ref('')
const nuevoElementoContraMuestra = ref('')
const lista = ref([])
const listaContraMuestra = ref([])
const filtro = ref('')

const $loading = useLoading({
  loader: 'dots',
  isFullPage: fullPage,
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
})


const saveTempLoteMuestra= async (id_encuesta,tipo_muestra) => {

  let payload = {}

  payload = {
    minv_formulario_id: id_encuesta,
    user_id: '1',
    sede_id: '1',
    tipo_muestra: tipo_muestra.toString()
  }

    await PatientService.saveLoteTemp(payload)
        .then((response) => {
          if (response.data.statusCode !== 201) {
            Swal.fire({
              icon: 'error',
              text: response.data.message
            })
          } else {
            /*Swal.fire({
              icon: 'success',
              text: response.data.message
            })*/
            toast.success(response.data.message)
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            text: getError(error)
          })
        })

}

const deleteTempLoteMuestra= async (id_encuesta,tipo_muestra) => {

  let payloadDelte = {}

  payloadDelte = {
    minv_formulario_id: id_encuesta,
    tipo_muestra: tipo_muestra.toString()
  }
console.log(payloadDelte);
  await PatientService.deleteLoteTemp(payloadDelte)
      .then((response) => {
        if (response.data.statusCode !== 200) {
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
        } else {
          /*Swal.fire({
            icon: 'success',
            text: response.data.message
          })*/
          toast.success(response.data.message)
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          text: getError(error)
        })
      })

}

const getPatientsFullList = async () => {
  const loader = $loading.show()
  try {
    const response = await PatientService.getLoteWithAperturas()
    tempMuestras.value = response.data.data.temp_Muestras
    tempContraMuestras.value = response.data.data.tempContraMuestras

    tempMuestras.value.forEach(function(element) {
      mostrarFormulario.value=true;
      lista.value.push(element.minv_formulario_id.toString());
    });
    tempContraMuestras.value.forEach(function(element) {
      mostrarFormularioContra.value=true;
      listaContraMuestra.value.push(element.minv_formulario_id.toString());
    });

    loader.hide()
  } catch (error) {
    loader.hide()
    errors.value = getError(error)
  }
}


onMounted(getPatientsFullList)

const agregarElemento = () => {
  if (nuevoElemento.value.trim() !== '') {
    saveTempLoteMuestra(nuevoElemento.value,'MUESTRA')
    lista.value.push(nuevoElemento.value);
    nuevoElemento.value = '';
  }
}
const agregarElementoContraMuestra = () => {
  if (nuevoElementoContraMuestra.value.trim() !== '') {
    saveTempLoteMuestra(nuevoElementoContraMuestra.value,'CONTRAMUESTRA')
    listaContraMuestra.value.push(nuevoElementoContraMuestra.value);
    nuevoElementoContraMuestra.value = '';
  }
}

const eliminarElemento = (index) => {
  lista.value.splice(index, 1);
  deleteTempLoteMuestra(index,'MUESTRA')
}
const eliminarElementoContraMuestra = (index) => {
  console.log(listaContraMuestra.value[index])
  deleteTempLoteMuestra(listaContraMuestra.value[index],'CONTRAMUESTRA')
  listaContraMuestra.value.splice(index, 1);
}
/*
const guardarLista = () => {
  saveTempLoteMuestra();
  console.log("Lista guardada:", lista.value);
}
*/
const aperturarLote = () => {
  mostrarFormulario.value = !mostrarFormulario.value;
}
const aperturarLoteContraMuestra = () => {
  mostrarFormularioContra.value = !mostrarFormularioContra.value;
}

const filteredItems = computed(() => {
  return lista.value.filter(elemento => {
    return elemento.toLowerCase().includes(filtro.value.toLowerCase());
  });
});

const filteredItemsContraMuestra = computed(() => {
  return listaContraMuestra.value.filter(elemento => {
    return elemento.toLowerCase().includes(filtro.value.toLowerCase());
  });
});
</script>

<style scoped>

</style>
