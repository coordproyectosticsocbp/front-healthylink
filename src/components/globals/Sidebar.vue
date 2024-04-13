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
    name: 'Pacientes',
    icon: {text: 'Pacientes', class: 'fa fa-user'},
    children: [
      {
        href: '/patient/create-patient',
        name: 'Crear Pacientes',
        icon: {text: 'Crear Pacientes', class: 'fa fa-user-plus'},
      },
      {
        href: '/patient/patient-list',
        name: 'Listado de Pacientes',
        icon: {text: 'Listado de Pacientes', class: 'fa fa-users'},
      }
    ]
  },
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