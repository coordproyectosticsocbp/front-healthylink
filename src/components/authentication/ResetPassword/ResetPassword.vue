<script setup>

</script>

<template>
  <!-- Reset Password Component -->
  <div class="card-body pt-0">
    <form action="index.html" class="my-4">

      <div class="form-group mb-5">
        <label class="form-label" for="userEmail">Email:</label>
        <input id="userEmail" class="form-control" name="Email" placeholder="Ingrese su Email"
               type="text">
      </div><!--end form-group-->

      <div class="form-group mb-0 row">
        <div class="col-12">
          <button class="btn btn-global-color w-100" type="button">
            Recuperar mi Contraseña
            <font-awesome-icon :icon="['fas', 'unlock']"/>
          </button>
        </div><!--end col-->
      </div> <!--end form-group-->
    </form><!--end form-->
    <div class="text-center text-muted">
      <p class="mb-1">
        Lo recordé ?
        <router-link :to="{name: 'login'}" class="text-primary ms-2 text-decoration-none ">
          Ir al Inicio de Sesión
        </router-link>
      </p>
    </div>
  </div><!--end card-body-->
  <!-- End Reset Password Component -->
</template>

<style scoped>

</style>