<script setup>
import {useStore} from "vuex";
import {computed} from 'vue'

const store = useStore()

const collapsed = computed(() => store.getters["sidebar/collapsed"])
const miniMenu = computed(() => store.getters["sidebar/miniMenu"])

const menu = [
  {
    header: `${import.meta.env.VITE_APP_NAME}`,
    hiddenOnCollapse: true,
  },
  {
    href: '/dashboard',
    name: 'Dashboard',
    icon: {text: 'dashboard', class: 'fa fa-dashboard'},
  },
  {
    header: 'Pacientes',
    hiddenOnCollapse: true,
  },
  {
    href: '/patient',
    name: 'Muestras',
    icon: {text: 'Pacientes', class: 'fa fa-user'},
    children: [
      {
        href: '/patient/create-patient',
        name: 'Crear Pacientes',
        icon: {text: 'Crear Pacientes', class: 'fa fa-user-plus'},
      },
      {
        href: '/patient/patient-list',
        name: 'eCRF',
        icon: {text: 'Listado de Pacientes', class: 'fa fa-users'},
      },
      {
        href: '/patient/FollowUp',
        name: 'Seguimiento',
        icon: {text: 'Listado de Pacientes', class: 'fa fa-timeline'},
      },
      {
        href: '/patient/createLote',
        name: 'Crear lote',
        icon: {text: 'Crear lote', class: 'fa fa-boxes-stacked'},
      },
      {
        href: '/patient/transport',
        name: 'Transportar lote',
        icon: {text: 'Crear lote', class: 'fa fa-dolly'},
      },
      {
        href: '/patient/receivealot',
        name: 'Recibir lote muestras',
        icon: {text: 'Recibir lote', class: 'fa fa-warehouse'},
      },
      {
        href: '/patient/shelf-assignment',
        name: 'Asignación de Estante',
        icon: {text: 'Crear lote', class: 'fas fa-temperature-empty'}
      }

    ]
  },
  {
    header: 'Reportes',
    hiddenOnCollapse: false,
  },
  {
    href: '/reports/main',
    name: 'Reportes',
    icon: {text: 'Pacientes', class: 'fa fa-file-excel'}
  },
  {
    header: 'Administración',
    hiddenOnCollapse: false,
  },
  {
    href: '/administration',
    name: 'Administración',
    icon: {text: 'Pacientes', class: 'fa fa-gear'},
    children: [
      {
        href: '/administration/users',
        name: 'Administrar Usuarios',
        icon: {text: 'Crear Usuarios', class: 'fa fa-users-gear'},
      },
      {
        href: '/administration/roles',
        name: 'Administrar Roles',
        icon: {text: 'Crear Roles', class: 'fa fa-user-shield'},
      },
      {
        href: '/administration/permissions',
        name: 'Administrar Permisos',
        icon: {text: 'Crear Permisos', class: 'fa fa-user-check'},
      },
      {
        href: '/administration/locations',
        name: 'Crear Sedes',
        icon: {text: 'Crear Sedes', class: 'fa fa-house-chimney-medical'},
      },
    ]
  }
]

</script>

<template>
  <!-- Sidebar -->
  <VueAwesomeSideBar
      v-model:collapsed="collapsed"
      v-model:miniMenu="miniMenu"
      :BottomMiniMenuBtn="false"
      :menu="menu"
      ChildrenOpenActiveRoute
      checkButtonActive
      childrenOpenAnimation
      dark
      keepChildrenOpen
      menuType="fully"
      vueRouterEnabel
  >
    <template #footer>
      <div class="p-2 text-center">
        <img src="@/assets/images/logohle-1.gif" width="250">
      </div>
    </template>
  </VueAwesomeSideBar>
  <!-- End of Sidebar -->

</template>

<style scoped>

</style>