<script setup>
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">

        <div class="card">

          <div class="card-header border-0">
            <ul class="nav nav-pills card-header-pills">
              <li class="nav-item">
                <router-link :to="{name: 'shelf-assignment-samples'}"
                             aria-current="true"
                             class="nav-link">
                  Muestras
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'shelf-assignment-counter-samples'}"
                             aria-current="true"
                             class="nav-link">
                  Contramuestras
                </router-link>
              </li>
            </ul>
          </div>

          <div class="card-body">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>