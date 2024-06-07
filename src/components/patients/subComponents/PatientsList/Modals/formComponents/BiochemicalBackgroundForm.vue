<script setup>
import {ref} from "vue";
import useLocalStorage from "@/composables/useLocalStorage.js";
import dayjs from "dayjs";

const props = defineProps({
  itemIndexVal: Number
})

const biochemicalOptions = ref([
  {
    label: 'Creatinina',
    value: 'Creatinina',
    model: 'LabCreatinina',
    unity: 'mg/dl'
  },
  {
    label: 'Urea',
    value: 'Urea',
    model: 'LabUrea',
    unity: 'mg/dl'
  },
  {
    label: 'TGO',
    value: 'TGO',
    model: 'LabTGO',
    unity: 'U/l'
  },
  {
    label: 'TGP',
    value: 'TGP',
    model: 'LabTGP',
    unity: 'U/l'
  },
  {
    label: 'Bilirrubina total',
    value: 'Bilirrubina total',
    model: 'LabBilirrubinaTotal',
    unity: 'mg/dL'
  },
  {
    label: 'Fosfatasa Alcalina',
    value: 'Fosfatasa Alcalina',
    model: 'LabFosfatasaAlcalina',
    unity: 'UI/L'
  },
  {
    label: 'Glucosa',
    value: 'Glucosa',
    model: 'LabGlucosa',
    unity: 'mg/dL mmol/L'
  },
  {
    label: 'Hemoglobina glicosilada',
    value: 'Hemoglobina glicosilada',
    model: 'LabHemoglobinaGlicosilada',
    unity: 'mg/dL'
  },
  {
    label: 'Colesterol total',
    value: 'Colesterol total',
    model: 'LabColesterolTotal',
    unity: 'mg/dL'
  },
  {
    label: 'Colesterol HDL',
    value: 'Colesterol HDL',
    model: 'LabColesterolHDL',
    unity: 'mg/dL'
  },
  {
    label: 'Colesterol LDL',
    value: 'Colesterol LDL',
    model: 'LabColesterolLDL',
    unity: 'mg/dL'
  },
  {
    label: 'Colesterol VLDL',
    value: 'Colesterol VLDL',
    model: 'LabColesterolVLDL',
    unity: 'mg/dL'
  },
  {
    label: 'Trigliceridos',
    value: 'Trigliceridos',
    model: 'LabTrigliceridos',
    unity: 'mg/dL'
  },
])
const formDate = ref('')
const formValues = ref({})

const biochemicalHistory = useLocalStorage([], `biochemicalHistory`)

const addItemToLabArray = () => {
  const newData = {
    labDate: formDate.value,
    values: biochemicalOptions.value.map(option => ({
      labType: option.label,
      valueLab: `${formValues.value[option.model] || 0} ${option.unity}`,
    }))
  }
  biochemicalHistory.value.push(newData)
  clearFields()
}

const removeLabFromArray = (index) => {
  biochemicalHistory.value.splice(index, 1)
}

function clearFields() {
  formDate.value = ''
  formValues.value = {}
  biochemicalHistory.value = []
}

defineExpose({
  clearFields
})

</script>

<template>
  <div :id="`v-pills-bioquimico-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-bioquimico-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Resultados de Laboratorios Bioquímicos
        </h6>
      </div>
    </div>

    <hr>

    <div class="row mb-5">
      <div class="col">
        <form autocomplete="off" @submit.prevent="addItemToLabArray">

          <div class="row">

            <div class="col-xl-6 col-sm-12 mb-sm-3 border-end">

              <div class="row mb-4">
                <div class="col">
                  <input id="inputLabDate"
                         v-model="formDate"
                         :max="dayjs().format('YYYY-MM-DD')"
                         class="form-control"
                         required
                         type="date"
                  >
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->

              <div class="row">
                <div class="col-xl-12">

                  <ol>
                    <li v-for="item in biochemicalOptions" :key="item.value">

                      <div class="row mb-2">
                        <div class="col-xl col-sm-12 d-flex align-items-center">
                          <label :for="item.value" v-text="item.label"/>
                        </div>
                        <!-- /.col -->
                        <div class="col-xl col-sm-12 d-flex align-items-center">
                          <input :id="item.value"
                                 v-model="formValues[item.model]"
                                 :name="item.value"
                                 :placeholder="item.value"
                                 class="form-control"
                                 type="text"
                          >
                        </div>
                        <!-- /.col -->
                        <div class="col-xl-2 col-sm-12 d-flex justify-content-center align-items-center">
                          <label :for="item.value" v-text="item.unity"/>
                        </div>
                        <!-- /.col -->
                      </div>
                      <!-- /.row -->

                    </li>
                  </ol>

                  <button
                      class="form-control btn btn-sm btn-outline-secondary"
                      type="submit"
                  >
                    <font-awesome-icon :icon="['fas', 'plus']"/>
                    Agregar
                  </button>


                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->


            </div>
            <!-- /.col -->

            <!-- Laboratories List -->
            <div class="col-xl-6">
              <h6 class="fw-bold mb-4">Listado de Laboratorios: {{ biochemicalHistory.length }}</h6>

              <ul>

                <li v-for="(data, index) in biochemicalHistory" :key="index" class="mb-3">
                  <div class="row">
                    <div class="col">
                      <strong>Fecha:</strong> {{ data.labDate }} <br/>
                      <span v-for="(value, key) in data.values" :key="key">
                        <strong>
                          {{ value.labType }}:
                        </strong> {{ value.valueLab }} <br/>
                      </span>
                    </div>
                    <!-- /.col -->

                    <div class="col d-flex justify-content-end align-items-center">
                      <button class="btn btn-sm rounded btn-outline-danger"
                              @click.prevent="removeLabFromArray(index)"
                      >
                        <font-awesome-icon :icon="['fas', 'trash']"/>
                      </button>
                    </div>
                    <!-- /.col -->

                  </div>
                  <!-- /.row -->

                </li>

              </ul>
            </div>
            <!-- /.col -->
            <!-- End Laboratories List -->

          </div>
          <!-- /.row -->


        </form>
      </div>
    </div>

  </div>
  <!-- End Biochemical List -->
</template>

<style scoped>
.flex-child-item {
  flex: 1 0 21%;
  margin: 5px;
}
</style>