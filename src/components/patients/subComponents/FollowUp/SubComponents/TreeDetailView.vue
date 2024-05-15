<script setup>

import PatientTrackingDetailService from "@/services/patients/PatientTrackingDetail.service.js";
import {onUnmounted, ref} from "vue";
import dayjs from "dayjs";

const props = defineProps({
  itemId: Number,
  patientCode: String
})
const infoLoadingStatus = ref(false)
const trackingDetailInfo = ref([])
const getTrackingDetail = async (patientId) => {

  infoLoadingStatus.value = true

  await PatientTrackingDetailService.getPatientTrackingDetail(patientId)
      .then((response) => {
        if (response.data.statusCode !== 200) {
          infoLoadingStatus.value = false
        } else {
          trackingDetailInfo.value = response.data.data
          infoLoadingStatus.value = false
          //console.log(response.data.data)
        }
      })
      .catch((error) => {
        infoLoadingStatus.value = false
        //console.log(getError(error))
      })
}

function onDestroy() {
  trackingDetailInfo.value = []
  infoLoadingStatus.value = false
}

//defineExpose({getTrackingDetail})

onUnmounted(onDestroy)

</script>

<template>

  <button
      :data-bs-target="`#staticBackdrop-${props.itemId}`"
      aria-controls="staticBackdrop"
      class="btn btn-primary btn-sm"
      data-bs-toggle="offcanvas"
      type="button"
      @click="getTrackingDetail(props.itemId)"
  >
    <font-awesome-icon :icon="['fas', 'eye']"/>
    Ver detalle
  </button>

  <div :id="`staticBackdrop-${props.itemId}`"
       aria-labelledby="staticBackdropLabel"
       class="offcanvas offcanvas-end"
       data-bs-backdrop="static"
       tabindex="-1"
  >

    <div class="offcanvas-header">
      <h5 id="staticBackdropLabel"
          class="offcanvas-title"
      >
        Detalle de la Encuesta: {{ props.patientCode }}
      </h5>
      <button aria-label="Close" class="btn-close" data-bs-dismiss="offcanvas" type="button"></button>
    </div>
    <div class="offcanvas-body">

      <div v-if="infoLoadingStatus" class="row">
        <div class="col d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>

      <div v-else id="test" class="tree">
        <ul v-for="(item, index) in trackingDetailInfo" :key="index">
          <li class="parent_li">
            <span>
              <p class="fw-bold mb-0">
                Estado: <span> {{ item.nombre }}</span>
              </p>
            </span>
            <ul>
              <li class="parent_li">
                <p class="fw-bold mb-0">
                  Creado por:
                  <span>
                    {{ item.firstName ?? '' }}
                    {{ item.lastName ?? '' }}
                  </span>
                </p>
              </li>
              <li class="parent_li">
                <p class="fw-bold mb-0">
                  Fecha:
                  <span>
                    {{ dayjs(item.created_at).format('YYYY-MM-DD') ?? '' }}
                  </span>
                </p>
              </li>
              <li class="parent_li">
                <p class="fw-bold mb-0">
                  + Info:
                  <span>
                    {{ item.info ?? '' }}
                  </span>
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<style scoped>
.tree {
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #fbfbfb;
  border: 1px solid #999;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05)
}

.tree li {
  list-style-type: none;
  margin: 0;
  padding: 10px 5px 0 5px;
  position: relative
}

.tree li::before, .tree li::after {
  content: '';
  left: -20px;
  position: absolute;
  right: auto
}

.tree li::before {
  border-left: 1px solid #999;
  bottom: 50px;
  height: 100%;
  top: 0;
  width: 1px
}

.tree li::after {
  border-top: 1px solid #999;
  height: 20px;
  top: 25px;
  width: 25px
}

.tree li span:not(.glyphicon) {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  display: inline-block;
  padding: 4px 9px;
  text-decoration: none
}

.tree li.parent_li > span:not(.glyphicon) {
  cursor: pointer
}

.tree > ul > li::before, .tree > ul > li::after {
  border: 0
}

.tree li:last-child::before {
  height: 30px
}

.tree li.parent_li > span:not(.glyphicon):hover, .tree li.parent_li > span:not(.glyphicon):hover + ul li span:not(.glyphicon) {
  background: #eee;
  border: 1px solid #999;
  padding: 3px 8px;
  color: #000
}
</style>