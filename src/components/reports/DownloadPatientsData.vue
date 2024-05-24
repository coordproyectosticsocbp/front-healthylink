<script setup>

import {ref} from "vue";
import * as XLSX from "xlsx";
import ReportsServices from "@/services/Reports/Reports.services.js";
import {getError} from "@/utils/helpers/getError.js";
import {useLoading} from "vue-loading-overlay";

const dateToday = new Date().toISOString().split('T')[0]
const currentDate = ref(dateToday)
const initDate = ref(dateToday)
const endDate = ref(dateToday)
const dataToExport = ref([])
const isLoadingData = ref(false)
const fullPage = ref(true)

const $loading = useLoading({
  loader: 'dots',
  isFullPage: fullPage,
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
})
const exportToExcel = () => {
  let data = XLSX.utils.json_to_sheet(dataToExport.value)
  const workbook = XLSX.utils.book_new()
  const filename = 'informacionComplementaria'
  XLSX.utils.book_append_sheet(workbook, data, filename)
  XLSX.writeFile(workbook, `${filename}.xlsx`)
}
const getDataByDate = async () => {

  const loader = $loading.show()
  dataToExport.value = []
  isLoadingData.value = true

  ReportsServices.getDataByDate(initDate.value, endDate.value)
      .then((response) => {
        if (response.data.statusCode !== 200) {
          Swal.fire({
            icon: 'error',
            title: 'Oooops!',
            text: 'Error al Obtener los DATOS.'
          })
          isLoadingData.value = false
          loader.hide()
        } else {
          dataToExport.value = response.data.data.dataComplementaria
          isLoadingData.value = false
          loader.hide()
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oooops!',
          text: getError(error)
        })
        isLoadingData.value = false
        loader.hide()
      })
}

</script>

<template>
  <div class="container">

    <div class="row mb-3">
      <div class="col-xl-8 m-auto col-sm-12">

        <div class="card">

          <div class="card-body">

            <form autocomplete="off">

              <div class="row">

                <div class="col-xl-5 col-sm-12 mb-sm-3">
                  <label class="form-label" for="inputInitDate">
                    Fecha Inicio:
                  </label>
                  <input id="inputInitDate"
                         v-model="initDate"
                         :max="currentDate"
                         class="form-control"
                         type="date"
                  >
                </div>
                <!-- /.col -->

                <div class="col-xl-5 col-sm-12 mb-sm-3">
                  <label class="form-label" for="inputInitDate">
                    Fecha Inicio:
                  </label>
                  <input id="inputInitDate"
                         v-model="endDate"
                         :max="currentDate"
                         class="form-control"
                         type="date"
                  >
                </div>
                <!-- /.col -->

                <div class="col d-flex align-items-center">
                  <button :disabled="isLoadingData"
                          class="btn btn-outline-primary rounded w-100"
                          type="button"
                          @click.prevent="getDataByDate"
                  >
                    <font-awesome-icon :icon="['fas', 'search']"/>
                    {{ isLoadingData ? 'Buscando' : 'Buscar' }}
                  </button>
                </div>
                <!-- /.col -->

              </div>
              <!-- /.row -->

            </form>


          </div>
          <!-- /.card-body -->

        </div>
        <!-- /.card -->

      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <div v-if="dataToExport.length" class="row">
      <div class="col d-flex justify-content-center">
        <button class="btn btn-success" @click="exportToExcel">
          <font-awesome-icon :icon="['fas', 'download']"/>
          Descargar Datos
        </button>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

  </div>
  <!-- /.container -->
</template>

<style scoped>

</style>