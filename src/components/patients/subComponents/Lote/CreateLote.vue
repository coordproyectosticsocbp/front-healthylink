<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <ul class="nav nav-pills nav-fill">
              <li class="nav-item">
                <router-link :to="{name: 'muestras'}" aria-current="page" class="nav-link">
                  <font-awesome-icon :icon="['fas', 'vial-virus']" class="me-1 fa-xl"/>
                  Muestras
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'contramuestras'}" class="nav-link">
                  <font-awesome-icon :icon="['fas', 'vial-virus']" class="me-1 fa-xl"/>
                  Contramuestras
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">

        <div class="card">
          <div class="card-body">
            <router-view/>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
