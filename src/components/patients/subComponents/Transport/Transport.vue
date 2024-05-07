<script setup>
import TransportLoteService from "@/services/Transport/TransportLote.service.js";
import {toast} from "vue3-toastify";
import {getError} from "@/utils/helpers/getError.js";
import {computed, ref} from "vue";
import {useStore} from "vuex";

const store = useStore()
const authUser = computed(() => store.getters["auth/authUser"])
const codeLote = ref("")
const loading = ref(false);

const transportLote = () => {

  if (!codeLote.value.length) {
    alert('Código del lote vacío')
    return false;
  }

  loading.value = true;

  const payload = {
    user_id_executed: authUser.value.id,
    code_lote: codeLote.value,
  }

  TransportLoteService.transporLote(payload)
      .then((response) => {
        if (response.data.statusCode !== 201) {
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
          codeLote.value = ""
        } else {
          toast.success(response.data.message)
          codeLote.value = ""
        }
      })
      .catch((error) => {
        toast.error(getError(error));
        codeLote.value = ""
      })
      .finally(() => {
        loading.value = false;
      });
}
</script>

<template>
  <div class="container">

    <div class="row">
      <div class="col">

        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col">

                <div class="row mb-5">
                  <div class="col">
                    <h5 class="text-center text-uppercase fw-bold">
                      Transportar lote de muestras y contramuestras
                    </h5>
                  </div>
                </div>

                <div class="row">
                  <div class="col-xl-12 border-end">

                    <form autocomplete="off" @submit.prevent="transportLote">

                      <div class="mb-3">
                        <label class="form-label" for="codeLote">Código de lote:</label>
                        <input id="codeLote"
                               v-model="codeLote"
                               autofocus
                               class="form-control"
                               placeholder="Código Lote, MU-LOT-XX o CM-LOT-XX"
                        />
                      </div>

                      <div class="d-grid gap-2 d-lg-flex justify-content-md-end">
                        <button :disabled="loading"
                                class="btn btn-primary btn-sm"
                                type="submit"
                                @click.prevent="transportLote">
                          <font-awesome-icon :class="{ 'rotate': loading }"
                                             :icon="['fas', 'cart-flatbed']"/>
                          <span v-if="loading"> Cargando...</span>
                          <span v-else> Transportar</span>
                        </button>
                      </div>

                    </form>

                  </div>

                </div>


              </div>


            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>


<style scoped>
.rotate {
  animation: rotateAnimation 1s linear infinite;
}

@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
