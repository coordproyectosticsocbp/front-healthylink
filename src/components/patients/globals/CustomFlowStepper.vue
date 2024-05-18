<script setup>

import {onMounted, ref} from "vue";

const storageInfo = ref('')

onMounted(() => {

  const storage = window.localStorage.getItem('currentFormStepIndex')
  if (storage) storageInfo.value = JSON.parse(storage)

  console.log(storageInfo.value)

})

</script>

<template>

  <div class="job-tab">
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item">
        <RouterLink :class="`nav-link ${parseInt(storageInfo) === 0 ? 'active' : ''}`"
                    :to="{name: 'create-patient-form'}"
                    aria-current="page"
        >
          <font-awesome-icon :icon="['fas', 'user']"/>
          Datos Personales
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink :class="`nav-link ${parseInt(storageInfo) === 1 ? 'active' : 'disabled'}`"
                    :to="{name: 'create-patient-informed-consent'}"
        >
          <font-awesome-icon :icon="['fas', 'file-signature']"/>
          Consentimiento
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink :class="`nav-link ${parseInt(storageInfo) === 2 ? 'active' : 'disabled'}`"
                    :to="{name: 'create-patient-survey'}"
        >
          <font-awesome-icon :icon="['fas', 'square-poll-horizontal']"/>
          Encuesta
        </RouterLink>
      </li>
    </ul>
  </div>

</template>

<style scoped>
.job-tab .nav-tabs {
  margin-bottom: 60px;
  border-bottom: 0;
}

.job-tab .nav-tabs > li {
  float: none;
  display: inline;
}

.job-tab .nav-tabs li {
  margin-right: 15px;
}

.job-tab .nav-tabs li:last-child {
  margin-right: 0;
}

.job-tab .nav-tabs {
  position: relative;
  z-index: 1;
}

.job-tab .nav-tabs:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: lightgray;
  z-index: -1;
}

.job-tab .nav-tabs > li a {
  display: inline-block;
  background-color: #fff;
  border: 1px dashed lightgray;
  border-radius: 30px;
  font-size: 14px;
  color: #000;
  padding: 8px 30px;
}

.job-tab .nav-tabs > li > a.exact-active,
.job-tab .nav-tabs > li a.active > :focus,
.job-tab .nav-tabs > li > a.exact-active:hover,
.job-tab .nav-tabs > li > a:hover {
  border: none;
  background-color: #008def;
  color: #fff;
}
</style>