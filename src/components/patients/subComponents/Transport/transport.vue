<script setup>
//import {onMounted, ref} from 'vue'
//import PatientService from '@/services/patients/Patient.service.js'
//import {getError} from "@/utils/helpers/getError.js";
////
</script>

<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h6 class="text-center text-uppercase mb-0 fw-bold">
          Ingresar codigo del lote para transportar
        </h6>
        <hr>
        <div class="input-group mb-3">
          <input v-model="nuevoElemento" type="text" class="form-control" placeholder="Código del lote">
          <div class="input-group-append">
            <button @click="agregarElemento" class="btn btn-primary">Agregar</button>
          </div>
        </div>
        <div class="input-group mb-3">
          <input v-model="filtro" type="text" class="form-control" placeholder="Buscar código...">
        </div>
        <ul class="list-group">
          <li v-if="filteredLista.length === 0" class="list-group-item">No hay elementos que coincidan con la búsqueda.</li>
          <li v-else class="list-group-item d-flex justify-content-between align-items-center" v-for="(elemento, index) in filteredLista" :key="index">
            {{ elemento }}
            <button @click="eliminarElemento(index)" class="btn btn-danger btn-sm"><font-awesome-icon :icon="['fas', 'trash-alt']" />Eliminar</button>
          </li>
        </ul>
        <button @click="guardarLista" class="btn btn-success mt-3"><font-awesome-icon :icon="['fas', 'save']" />Guardar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nuevoElemento: '',
      lista: [],
      filtro: ''
    };
  },
  computed: {
    filteredLista() {
      return this.lista.filter(elemento => {
        return elemento.toLowerCase().includes(this.filtro.toLowerCase());
      });
    }
  },
  methods: {
    agregarElemento() {
      if (this.nuevoElemento.trim() !== '') {
        this.lista.push(this.nuevoElemento);
        this.nuevoElemento = ''; 
      }
    },
    eliminarElemento(index) {
      this.lista.splice(index, 1);
    },
    guardarLista() {
      console.log("Lista guardada:", this.lista);
    }
  }
};
</script>


<style scoped>

</style>
