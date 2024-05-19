<script setup>
import {computed, reactive, ref} from 'vue'
import router from '@/router/index.js'
import {getError} from '@/utils/helpers/getError.js'
import AuthService from '@/services/authentication/Auth.service.js'
import {useStore} from 'vuex'


const appData = reactive({
  app_version: import.meta.env.VITE_APP_VERSION,
  app_version_date: import.meta.env.VITE_APP_VERSION_DATE,
})

const form = reactive({
  email: '',
  password: ''
})

const errors = ref(null)

const store = useStore()
const isLoading = computed(() => store.state.auth.loading)

async function loginFunction() {

  store.commit('auth/SET_LOADING_USER', true)
  errors.value = null

  try {

    await AuthService.login(form)
    const authUser = await store.dispatch('auth/getAuthUser')

    if (authUser) {
      store.commit('auth/SET_LOADING_USER', false)
      await store.dispatch('auth/setGuest', {value: 'isNotGuest'})
      router.push({path: '/dashboard'})
    } else {
      const error = Error(
          'Unable to fetch user after login, check your API settings.'
      )
      error.name = 'Fetch User'
      throw error
    }

  } catch (error) {
    errors.value = getError(error)
    store.commit('auth/SET_LOADING_USER', false)
  }

}

</script>

<template>
  <!-- Login Component -->
  <div class="card-body pt-0">

    <form class="my-4 needs-validation" @submit.prevent="loginFunction">

      <div class="mb-3">
        <label class="form-label" for="username">Email o Usuario:</label>
        <input id="username"
               v-model="form.email"
               autofocus
               class="form-control"
               name="username"
               placeholder="Email o Usuario"
               required
               type="email">
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label" for="userpassword">Contraseña:</label>
        <input id="userpassword" v-model="form.password" class="form-control"
               name="password"
               placeholder="Contraseña"
               required
               type="password">
      </div>

      <div class="mb-4">
        <div class="d-flex justify-content-end">
          <router-link :to="{name: 'reset-password'}" class="text-muted text-decoration-none">
            <font-awesome-icon :icon="['fas', 'key']"/>
            Olvidé mi Contraseña?
          </router-link>
        </div>
      </div>

      <div v-if="errors" class="mb-3 text-danger fw-bold">
        <p class="text-danger">
          <font-awesome-icon :icon="['fas', 'triangle-exclamation']"/>
          Credendiales invalidas, Verifique...
        </p>
      </div>

      <div class="form-group mb-0 row">
        <div class="col-12">
          <div class="d-grid mt-3">

            <button :disabled="isLoading"
                    class="btn btn-global-color"
                    type="submit"
            >
              <span
                  v-if="isLoading"
                  aria-hidden="true"
                  class="spinner-border spinner-border-sm"
                  role="status"
              ></span>
              <font-awesome-icon v-else :icon="['fas', 'right-to-bracket']"/>

              {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
            </button>

          </div>
        </div><!--end col-->
      </div> <!--end form-group-->
    </form><!--end form-->

    <div class="row">
      <div class="col text-center">
        Version: {{ appData.app_version }} de
        {{ appData.app_version_date }}
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

  </div>
  <!-- End Login Component -->
</template>

<style scoped>

</style>