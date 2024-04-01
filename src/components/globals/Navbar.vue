<script setup>

import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const authUser = computed(() => store.getters['auth/authUser'])

function logoutFuntion() {
  store.dispatch('auth/logout')
}

</script>

<template>
  <!-- Topbar -->
  <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

    <!-- Sidebar Toggle (Topbar) -->
    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
      <font-awesome-icon :icon="['fas', 'bars']" />
    </button>

    <!-- Topbar Search -->
    <form
      class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
      <div class="input-group">
        <input aria-describedby="basic-addon2" aria-label="Search" class="form-control bg-light border-0 small"
               placeholder="Search for..." type="text">
        <div class="input-group-append">
          <button class="btn btn-primary" type="button">
            <i class="fas fa-search fa-sm"></i>
          </button>
        </div>
      </div>
    </form>

    <!--    <button class="btn btn-primary mr-3" data-bs-target="#informedConsentModal" data-bs-toggle="modal">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>-->

    <!-- Modal -->
    <div id="informedConsentModal" aria-hidden="true" aria-labelledby="exampleModalLabel" class="modal fade"
         tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="exampleModalLabel" class="modal-title fs-5">Formulario de consentimiento para: Plataforma
              Clínico-Genómica Integrada para la Investigación Biomédica en Colombia</h1>
            <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button>
            <button class="btn btn-primary" type="button">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
      <!-- Nav Item - Search Dropdown (Visible Only XS) -->
      <li class="nav-item dropdown no-arrow d-sm-none">
        <a id="searchDropdown" aria-expanded="false" aria-haspopup="true" class="nav-link dropdown-toggle"
           data-toggle="dropdown" href="#" role="button">
          <i class="fas fa-search fa-fw"></i>
        </a>
        <!-- Dropdown - Messages -->
        <div aria-labelledby="searchDropdown"
             class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in">
          <form class="form-inline mr-auto w-100 navbar-search">
            <div class="input-group">
              <input aria-describedby="basic-addon2" aria-label="Search"
                     class="form-control bg-light border-0 small" placeholder="Search for..."
                     type="text">
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>

      <div class="topbar-divider d-none d-sm-block"></div>

      <!-- Nav Item - User Information -->
      <li class="nav-item dropdown-center no-arrow">

        <a id="userDropdown"
           aria-expanded="false"
           aria-haspopup="true"
           class=" nav-link dropdown-toggle"
           data-bs-toggle="dropdown"
           href="#"
           role="button"
        >
          <span class="mr-2 d-none d-lg-inline text-gray-600">
            {{ authUser ? authUser.firstName : '' }} {{ authUser ? authUser.lastName : '' }}
          </span>
          <img alt="mdo" class="img-profile rounded-circle" src="https://github.com/mdo.png">
        </a>
        <ul class="dropdown-menu text-small shadow" style="">
          <li>
            <a class="dropdown-item cursor-pointer" @click="logoutFuntion">
              <font-awesome-icon :icon="['fas', 'right-from-bracket']"
                                 class="btn-quick-menu-icon me-2"></font-awesome-icon>
              Cerrar Sesión
            </a>
          </li>
        </ul>
      </li>

    </ul>

  </nav>
  <!-- End of Topbar -->
</template>

<style scoped>

</style>