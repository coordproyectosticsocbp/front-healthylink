<script setup>
import Navbar from '@/components/globals/Navbar.vue'
import Footer from '@/components/globals/Footer.vue'
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const collapsedStatus = computed(() => store.getters["sidebar/collapsed"]);

</script>

<template>

  <div id="content-wrapper" :class="`d-flex flex-column ${collapsedStatus ? 'content-collapsed' : 'content'} vh-100`">

    <div id="content">

      <Navbar/>

      <div class="container-fluid">

        <router-view/>

      </div>

    </div>

    <Footer/>

  </div>

</template>

<style>

</style>
