<script setup>
import {ref} from "vue";
import useLocalStorage from "@/composables/useLocalStorage.js";
import dayjs from "dayjs";

const props = defineProps({
  itemIndexVal: Number
})

const hormonalesOptions = ref([
  {
    label: 'TSH (hormona estimulante del tiroides)',
    value: 'TSH (hormona estimulante del tiroides)',
    model: 'tsh',
    unity: 'mUI/L'
  },
  {
    label: 'Hormonas T3',
    value: 'Hormonas T3',
    model: 'HormonasT3',
    unity: 'ng/dL'
  },
  {
    label: 'Hormonas T4',
    value: 'Hormonas T4',
    model: 'HormonasT4',
    unity: 'ng/dL'
  },
])
const formDate = ref('')
const formValues = ref({})

const hormonalHistory = useLocalStorage([], `hormonalHistory-${props.itemIndexVal}`)

const addItemToLabArray = () => {
  const newData = {
    labDate: formDate.value,
    values: hormonalesOptions.value.map(option => ({
      labType: option.label,
      valueLab: `${formValues.value[option.model] || 0} ${option.unity}`,
    }))
  }
  hormonalHistory.value.push(newData)
  clearFields()
}

const removeLabFromArray = (index) => {
  hormonalHistory.value.splice(index, 1)
}

function clearFields() {
  formDate.value = ''
  formValues.value = {}
}

defineExpose({
  clearFields
})

</script>

<template>
  <div :id="`v-pills-hormonales-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-hormonales-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Resultados de Laboratorios Hormonales
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
                    <li v-for="item in hormonalesOptions" :key="item.value">

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
              <h6 class="fw-bold mb-4">Listado de Laboratorios: {{ hormonalHistory.length }}</h6>

              <ul>

                <li v-for="(data, index) in hormonalHistory" :key="index" class="mb-3">
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
  <!-- End Hormonal List -->
</template>

<style scoped>

</style>