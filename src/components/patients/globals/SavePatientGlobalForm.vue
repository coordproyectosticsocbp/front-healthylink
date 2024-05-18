<script setup>

const emit = defineEmits(['onSaveForm'])

const saveForm = () => {
  emit('onSaveForm')
}

</script>

<template>
  <div class="card mb-5">
    <div class="card-body">

      <div class="d-flex justify-content-between align-items-center">

        <router-link :to="{name: 'create-patient-informed-consent'}"
                     class="btn btn-sm btn-outline-primary"
        >
          <font-awesome-icon :icon="['fas', 'file-signature']"/>
          Ir a Consentimiento Informado
        </router-link>

        <button class="btn btn-success" @click.prevent="saveForm">
          <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
          Guardar Formulario
        </button>

      </div>

    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
</template>

<style scoped>

</style>