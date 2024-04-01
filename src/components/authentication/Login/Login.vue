<script setup>
import { computed, reactive, ref } from 'vue'
import router from '@/router/index.js'
import { getError } from '@/utils/helpers/getError.js'
import AuthService from '@/services/authentication/Auth.service.js'
import { useStore } from 'vuex'

const form = reactive({
  email: '',
  password: ''
})

const error = ref(null)

const store = useStore()
const isLoading = computed(() => store.state.auth.loading)

async function loginFunction() {

  store.commit('auth/SET_LOADING_USER', true)
  error.value = null

  try {

    await AuthService.login(form)
    const authUser = await store.dispatch('auth/getAuthUser')

    if (authUser) {
      store.commit('auth/SET_LOADING_USER', false)
      await store.dispatch('auth/setGuest', { value: 'isNotGuest' })
      router.push({ path: '/dashboard' })
    } else {
      const error = Error(
        'Unable to fetch user after login, check your API settings.'
      )
      error.value = 'Fetch User'
      throw error
    }

  } catch (error) {
    error.value = getError(error)
    store.commit('auth/SET_LOADING_USER', false)
  }

}

</script>

<template>
  <!-- Login Component -->
  <div class="card-body pt-0" @submit.prevent="loginFunction">

    <form action="index.html" class="my-4">
      <div class="form-group mb-2">
        <label class="form-label" for="username">Email o Usuario:</label>
        <input id="username" v-model="form.email" autofocus
               class="form-control form-control-sm"
               name="username"
               placeholder="Email o Usuario"
               required
               type="text">
      </div><!--end form-group-->

      <div class="form-group mb-2">
        <label class="form-label" for="userpassword">Contraseña:</label>
        <input id="userpassword" v-model="form.password" class="form-control form-control-sm"
               name="password"
               placeholder="Contraseña"
               required
               type="password">
      </div><!--end form-group-->

      <div v-if="!error" class="mb-3 text-danger fw-bold">
        <ul class="list-group list-unstyled">
          <li>
            <!--            {{ error }}-->Cule Error Cv
          </li>
        </ul>
      </div>

      <div class="form-group row mt-3">
        <div class="col-sm-6">
          <div class="form-check form-switch form-switch-success">
            <input id="customSwitchSuccess" class="form-check-input" type="checkbox">
            <label class="form-check-label" for="customSwitchSuccess">Recordarme</label>
          </div>
        </div><!--end col-->
        <div class="col-sm-6 text-end">
          <router-link :to="{name: 'reset-password'}" class="text-muted text-decoration-none">
            <font-awesome-icon :icon="['fas', 'key']" />
            Olvidé mi Contraseña?
          </router-link>
        </div><!--end col-->
      </div><!--end form-group-->

      <div class="form-group mb-0 row">
        <div class="col-12">
          <div class="d-grid mt-3">

            <button :disabled="isLoading"
                    class="btn btn-global-color btn-sm"
                    type="submit"
            >
              <span
                v-if="isLoading"
                aria-hidden="true"
                class="spinner-border spinner-border-sm"
                role="status"
              ></span>
              <font-awesome-icon v-else :icon="['fas', 'right-to-bracket']" />

              {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
            </button>

          </div>
        </div><!--end col-->
      </div> <!--end form-group-->
    </form><!--end form-->

  </div>
  <!-- End Login Component -->
</template>

<style scoped>

</style>