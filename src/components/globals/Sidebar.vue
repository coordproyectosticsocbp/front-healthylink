<script setup>
import {useStore} from "vuex";
import {computed} from 'vue'

const store = useStore()

const collapsed = computed( () => store.getters["sidebar/collapsed"])
const miniMenu = computed( () => store.getters["sidebar/miniMenu"])

/*function updateCollapsed() {
  store.dispatch('sidebar/updateCollapsed')
}*/

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
      v-model:miniMenu="miniMenu"
      v-model:collapsed="collapsed"
      menuType="fully"
      :menu="menu"
      vueRouterEnabel
      checkButtonActive
      childrenOpenAnimation
      keepChildrenOpen
      ChildrenOpenActiveRoute
      dark
      :BottomMiniMenuBtn="false"
  />
  <!-- End of Sidebar -->

</template>

<style scoped>

</style>