<script setup>

</script>

<template>
  <div class="auth-page">
    <!-- Authentication View -->
    <div class="container-md">
      <div class="row vh-100 d-flex justify-content-center">
        <div class="col-12 align-self-center">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6 mx-auto">
                <div class="card">

                  <div class="card-body p-0 auth-header-box">
                    <div class="text-center p-3">
                      <router-link :to="{name: 'login'}" class="logo logo-admin">
                        <img alt="logo" class="auth-logo" height="50" src="@/assets/images/logohle-1.gif">
                      </router-link>

                      <h5 class="mt-3 mb-1 fw-semibold text-white font-18">Let's Get Started Healtlylink Research</h5>
                      <p class="text-white fs-6 mb-0">Bridging Health Frontiers For Science</p>
                    </div>
                  </div>

                  <RouterView />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> <!-- End Authentication View -->

  </div>

</template>

<style scoped>
.auth-page {
  background-image: url('@/assets/images/p-1.png');
  background-size: cover;
  background-position: center center;
}

.auth-page .auth-header-box {
  background-image: var(--vt-c-button-global-color);
}
</style>