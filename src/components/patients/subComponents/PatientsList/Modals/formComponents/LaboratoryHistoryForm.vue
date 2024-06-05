<script setup>
import {ref} from "vue";
import useLocalStorage from "@/composables/useLocalStorage.js";
import dayjs from "dayjs";
//import {laboratoriesOptions} from "@/utils/const/patientComplementaryInfo.js";

const props = defineProps({
  itemIndexVal: Number
})

const laboratoriesOptions = ref([
  {label: 'Hb', value: 'Hb', model: 'LabHb', unity: 'gr/dl'},
  {label: 'Leucocitos', value: 'Leucocitos', model: 'LabLeucocitos', unity: '10*3/Ul'},
  {label: 'Neutrofilos', value: 'Neutrofilos', model: 'LabNeutrofilos', unity: '10*3/U'},
  {label: 'Linfocitos', value: 'Linfocitos', model: 'LabLinfocitos', unity: '10*3/U'},
  {label: 'Plaquetas', value: 'Plaquetas', model: 'LabPlaquetas', unity: '10*3/U'},
])
const formDate = ref('')
const formValues = ref({})

/*const formData = ref(
    laboratoriesOptions.value.reduce((acc, option) => {
      acc[option.value] = ''
      return acc
    }, {date: ''})
);*/

const laboratoryHistory = useLocalStorage([], `laboratoryHistory-${props.itemIndexVal}`)

const addItemToLabArray = () => {

  const newData = {
    labDate: formDate.value,
    values: laboratoriesOptions.value.map(option => ({
      labType: option.label,
      valueLab: `${formValues.value[option.model] || 0} ${option.unity}`,
    }))
  }
  //console.log(newData)
  laboratoryHistory.value.push(newData)
  clearFields()
}

const removeLabFromArray = (index) => {
  laboratoryHistory.value.splice(index, 1)
}

function clearFields() {
  formDate.value = ''
  formValues.value = {}
  /*formData.value.date = '';
  laboratoriesOptions.value.forEach(option => {
    formData.value[option.value] = '';
  });*/
}

defineExpose({
  clearFields
})

</script>

<template>
  <div :id="`v-pills-hematologicos-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-hematologicos-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Resultados de Laboratorios Hematológicos
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
                    <li v-for="item in laboratoriesOptions" :key="item.value">

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
                                 required
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
              <h6 class="fw-bold mb-4">Listado de Laboratorios: {{ laboratoryHistory.length }}</h6>

              <ul>

                <li v-for="(data, index) in laboratoryHistory" :key="index" class="mb-3">
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
                <!--                <li>
                                  <div class="row">
                                    <div class="col">
                                      <ul class="list-unstyled">
                                        <li>
                                          <p class="mb-0 fw-bold text-uppercase">
                                            LABORATORIO # {{ index + 1 }}:
                                          </p>

                                          <ul class="list-unstyled">
                                            <li>
                                              <p class="mb-0">
                                                Fecha:
                                                <span>{{ item.labDate }}</span>
                                              </p>
                                            </li>
                                            <li>
                                              <p class="mb-0">
                                                Tipo:
                                                <span>{{ item.labType }}</span>
                                              </p>
                                            </li>
                                            <li>
                                              <p class="mb-0">
                                                Valor:
                                                <span>{{ item.valueLab }}</span>
                                              </p>
                                            </li>
                                          </ul>
                                        </li>
                                      </ul>
                                    </div>
                                    <div class="col text-end">
                                      <button class="btn btn-sm rounded btn-outline-danger" @click.prevent="removeLabFromArray(index)">
                                        <font-awesome-icon :icon="['fas', 'trash']"/>
                                      </button>
                                    </div>
                                  </div>
                                </li>-->

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
</template>

<style scoped>

</style>