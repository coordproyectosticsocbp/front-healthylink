<script setup>
import {biochemicalOptions} from "@/utils/const/patientComplementaryInfo.js";
import {ref} from "vue";

const props = defineProps({
  itemIndexVal: Number
})

const initialValue = ref({
  labDate: null,
  labType: null
})

const biochemicalHistory = ref([])

const addItemToLabArray = () => {
  biochemicalHistory.value.push({...initialValue.value})
  initialValue.value = {
    labDate: null,
    labType: null
  }
}

const removeLabFromArray = (index) => {
  biochemicalHistory.value.splice(index, 1)
}

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
          Antecedentes de Laboratorios Bioquímicos
        </h6>
      </div>
    </div>

    <hr>

    <div class="row mb-5">
      <div class="col">
        <form autocomplete="off" @submit.prevent="addItemToLabArray">

          <div class="row">

            <div class="col-3 d-flex align-items-center">
              <input id="inputLabDate"
                     v-model="initialValue.labDate"
                     class="form-control"
                     required
                     type="date"
              >
              <!--              </div>-->
            </div>

            <div class="col-8 d-flex flex-wrap justify-content-between align-items-center">

              <div v-for="(item, index) in biochemicalOptions" :key="index"
                   class="form-check form-check-inline flex-child-item"
              >
                <input :id="`inlineRadio1-${index}`" v-model="initialValue.labType"
                       :value="item.value"
                       class="form-check-input"
                       name="inlineRadioOptions"
                       required
                       type="radio"
                >
                <label :for="`inlineRadio1-${index}`" class="form-check-label">
                  {{ item.label }}
                </label>
              </div>

            </div>
            <div class="col-1 d-flex align-items-center">
              <button class="btn btn-sm rounded btn-outline-secondary"
                      title="Agregar nuevo registro"
                      type="submit"
              >
                <font-awesome-icon :icon="['fas', 'plus']"/>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>

    <!-- Hormonal List -->
    <div class="row">
      <div class="col">
        <h6 class="fw-bold mb-4">Listado de Laboratorios: {{ biochemicalHistory.length }}</h6>
        <ul v-for="(item, index) in biochemicalHistory" :key="index">

          <li>
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
          </li>

        </ul>

      </div>
    </div>
  </div>
  <!-- End Hormonal List -->
</template>

<style scoped>
.flex-child-item {
  flex: 1 0 21%;
  margin: 5px;
}
</style>