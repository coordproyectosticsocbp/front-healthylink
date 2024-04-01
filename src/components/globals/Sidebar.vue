<script setup>

</script>

<template>
  <!-- Sidebar -->
  <ul id="accordionSidebar" class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <router-link :to="{name: 'dashboard'}" class="nav-link">
        <font-awesome-icon :icon="['fas', 'dashboard']" class="fa-fw" />
        <span>Dashboard</span>
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
      Interface
    </div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">

      <a aria-controls="collapseExample" aria-expanded="false"
         class="nav-link collapsed"
         data-bs-toggle="collapse"
         href="#collapseTwo"
         role="button"
      >
        <font-awesome-icon :icon="['fas', 'user']" class="fa-fw" />
        <span>Pacientes</span>

        <font-awesome-icon :icon="['fas', 'arrow-down']" class="fa-fw float-end" />
      </a>
      <div id="collapseTwo" aria-labelledby="headingTwo" class="collapse" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">PACIENTES:</h6>
          <router-link :to="{name: 'patient-list'}" class="collapse-item">
            Listado de pacientes
          </router-link>
        </div>
      </div>
    </li>

    <!-- Nav Item - Utilities Collapse Menu -->
    <li class="nav-item">
      <a aria-controls="collapseExample" aria-expanded="false"
         class="nav-link collapsed"
         data-bs-toggle="collapse"
         href="#collapseUtilities"
         role="button"
      >
        <font-awesome-icon :icon="['fas', 'microscope']" class="fa-fw" />
        <span>Estudios</span>
        <font-awesome-icon :icon="['fas', 'arrow-down']" class="fa-fw float-end" />
      </a>
      <div id="collapseUtilities" aria-labelledby="headingUtilities" class="collapse"
           data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Custom Utilities:</h6>
          <a class="collapse-item" href="utilities-color.html">Colors</a>
          <a class="collapse-item" href="utilities-border.html">Borders</a>
          <a class="collapse-item" href="utilities-animation.html">Animations</a>
          <a class="collapse-item" href="utilities-other.html">Other</a>
        </div>
      </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button id="sidebarToggle" class="rounded-circle border-0">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </button>
    </div>

  </ul>
  <!-- End of Sidebar -->
</template>

<style scoped>

</style>