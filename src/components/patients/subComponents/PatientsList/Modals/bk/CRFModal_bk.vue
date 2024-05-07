<script setup>

import {defineProps} from "vue";
import PathologicalHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/PathologicalHistoryForm.vue";
import PharmacologicalHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/PharmacologicalHistoryForm.vue";
import OthersHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/OthersHistoryForm.vue";
import LaboratoryHistoryForm
  from "@/components/patients/subComponents/PatientsList/Modals/formComponents/LaboratoryHistoryForm.vue";
import {patientComplementayTabOption} from "@/utils/const/patientComplementaryInfo.js";

/*
const crfModalRef = ref()
const formIsDisplay = ref(false)
*/

const props = defineProps({
  itemInformation: Object
})

//console.log(props.itemInformation)
/*const toggleModal = () => {
  crfModalRef.value.show
}

const toggleForm = () => {
  formIsDisplay.value = !formIsDisplay.value
}*/

</script>

<template>

  <button :data-bs-target="`#crfmodal-${props.itemInformation.id}`"
          class="btn btn-global-color btn-sm rounded"
          data-bs-toggle="modal"
          title="Completar CRF"
          type="button"
  >
    <font-awesome-icon :icon="['fas', 'list-check']"/>
  </button>

  <!-- Modal -->
  <div :id="`crfmodal-${props.itemInformation.id}`"
       aria-hidden="true"
       aria-labelledby="exampleModalLabel"
       class="modal fade"
       tabindex="-1"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="exampleModalLabel" class="modal-title fs-5">
            2. Recolección de información por Historia clínica {{ props.itemInformation.id }}
          </h1>
          <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"/>
        </div>
        <div class="modal-body">
          <!-- Form Fields -->
          <!--          <ul id="myTab" class="nav nav-tabs nav-justified" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button id="home-tab" aria-controls="home-tab-pane" aria-selected="true" class="nav-link active"
                                data-bs-target="#home-tab-pane" data-bs-toggle="tab" role="tab" type="button">
                          Antecedentes Patológicos
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button id="profile-tab" aria-controls="profile-tab-pane" aria-selected="false" class="nav-link"
                                data-bs-target="#profile-tab-pane" data-bs-toggle="tab" role="tab" type="button">
                          Antecedentes Farmacológicos
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button id="contact-tab" aria-controls="contact-tab-pane" aria-selected="false" class="nav-link"
                                data-bs-target="#contact-tab-pane" data-bs-toggle="tab" role="tab" type="button">
                          Otros Antecedentes
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button id="disabled-tab" aria-controls="disabled-tab-pane" aria-selected="false" class="nav-link"
                                data-bs-target="#disabled-tab-pane" data-bs-toggle="tab" role="tab" type="button">
                          Laboratorios / Imágenes
                        </button>
                      </li>
                    </ul>
                    <div id="myTabContent" class="tab-content">
                      <div id="home-tab-pane" aria-labelledby="home-tab" class="tab-pane fade show active p-3" role="tabpanel"
                           tabindex="0"
                      >
                        <div class="row mb-3">
                          <div class="col">
                            <textarea id="exampleFormControlTextarea1" class="form-control"
                                      placeholder="Antecedentes Patológicos"
                                      rows="3"/>
                          </div>
                        </div>
                      </div>
                      <div id="profile-tab-pane" aria-labelledby="profile-tab" class="tab-pane fade p-3" role="tabpanel"
                           tabindex="0">
                        ...
                      </div>
                      <div id="contact-tab-pane" aria-labelledby="contact-tab" class="tab-pane fade p-3" role="tabpanel"
                           tabindex="0">
                        ...
                      </div>
                      <div id="disabled-tab-pane" aria-labelledby="disabled-tab" class="tab-pane fade p-3" role="tabpanel"
                           tabindex="0">...
                      </div>
                    </div>-->
          <!--          <div class="container-fluid">

                      <div class="row mb-3">
                        <div class="col-4">
                          <h6 class="fw-bold text-uppercase">
                            2.1 - Antecedentes Patológicos:
                          </h6>
                          <button class="btn btn-sm btn-aqua-color" @click="toggleForm">
                            <font-awesome-icon :icon="['fas', 'file-circle-plus']"/>
                          </button>
                        </div>
                        <div :class="`${formIsDisplay ? 'col-5' : 'col-8'}`">
                          <div>
                                      <textarea id="exampleFormControlTextarea1" class="form-control"
                                                placeholder="Antecedentes Patológicos"
                                                rows="3"/>
                          </div>
                        </div>
                        <div :class="`col-3 ${!formIsDisplay ? 'd-none' : ''}`">
                          <div>
                                      <textarea id="exampleFormControlTextarea1" class="form-control"
                                                placeholder="Antecedentes Patológicos"
                                                rows="3"/>
                          </div>
                        </div>
                      </div>

                      <hr/>

                      <div class="row mb-3">
                        <div class="col-4">
                          <h6 class="fw-bold text-uppercase">
                            2.2. Antecedentes Farmacológicos:
                          </h6>
                          <button class="btn btn-sm btn-aqua-color" @click="toggleForm">
                            <font-awesome-icon :icon="['fas', 'file-circle-plus']"/>
                          </button>
                        </div>
                        <div :class="`${formIsDisplay ? 'col-5' : 'col-8'}`">
                          <div class="row mb-2">
                            <div class="col-6">
                              <input aria-label="First name" class="form-control" placeholder="Nombre Medicamento" type="text">
                            </div>
                            <div class="col-2">
                              <input aria-label="Last name" class="form-control" placeholder="Dosis" type="text">
                            </div>
                            <div class="col-2">
                              <input aria-label="Last name" class="form-control" placeholder="Presentación" type="text">
                            </div>
                            <div class="col-2">
                              <input aria-label="Last name" class="form-control" placeholder="Concentración" type="text">
                            </div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-6">
                              <input aria-label="First name" class="form-control" placeholder="Nombre Medicamento" type="text">
                            </div>
                            <div class="col-2">
                              <input aria-label="Last name" class="form-control" placeholder="Dosis" type="text">
                            </div>
                            <div class="col-2">
                              <input aria-label="Last name" class="form-control" placeholder="Presentación" type="text">
                            </div>
                            <div class="col-2">
                              <input aria-label="Last name" class="form-control" placeholder="Concentración" type="text">
                            </div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-6">
                              <input aria-label="First name" class="form-control" placeholder="Nombre Medicamento" type="text">
                            </div>
                            <div class="col-2">
                              <input aria-label="Last name" class="form-control" placeholder="Dosis" type="text">
                            </div>
                            <div class="col-2">
                              <input aria-label="Last name" class="form-control" placeholder="Presentación" type="text">
                            </div>
                            <div class="col-2">
                              <input aria-label="Last name" class="form-control" placeholder="Concentración" type="text">
                            </div>
                          </div>
                        </div>
                        <div :class="`col-3 ${!formIsDisplay ? 'd-none' : ''}`">
                          <div>
                                      <textarea id="exampleFormControlTextarea1" class="form-control"
                                                placeholder="Antecedentes Farmacológicos"
                                                rows="3"/>
                          </div>
                        </div>
                      </div>

                      <hr/>

                      <div class="row mb-3">
                        <div class="col-4">
                          <h6 class="fw-bold text-uppercase">
                            2.3. Otros Antecedentes:
                          </h6>
                          <button class="btn btn-sm btn-aqua-color" @click="toggleForm">
                            <font-awesome-icon :icon="['fas', 'file-circle-plus']"/>
                          </button>
                        </div>
                        <div :class="`${formIsDisplay ? 'col-5' : 'col-8'}`">
                          <div>
                                      <textarea id="exampleFormControlTextarea1" class="form-control"
                                                placeholder="Otros Antecedentes"
                                                rows="3"/>
                          </div>
                        </div>
                        <div :class="`col-3 ${!formIsDisplay ? 'd-none' : ''}`">
                          <div>
                                      <textarea id="exampleFormControlTextarea1" class="form-control"
                                                placeholder="Otros Antecedentes"
                                                rows="3"/>
                          </div>
                        </div>
                      </div>

                      <hr/>

                      <div class="row mb-3">
                        <div class="col">
                          <h5 class="fw-bold">
                            2.4. Laboratorios / imágenes
                          </h5>

                          <hr>

                          <ul class="mb-5">
                            <li>
                              <div class="row">
                                <div class="col">
                                  <h6 class="text-uppercase fw-bold">Hematológico:</h6>
                                </div>
                                <div class="col text-end">
                                  <button class="btn btn-sm btn-primary">
                                    <font-awesome-icon :icon="['fas', 'plus']"/>
                                    Agregar
                                  </button>
                                </div>
                              </div>
                              <div class="row mb-3">
                                <div class="col-3">
                                  <label for="inputDateHb">Fecha:</label>
                                  <input id="inputDateHb" aria-label="First name" class="form-control" placeholder="First name"
                                         type="date">
                                </div>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <label for="inputHB">Hemoglobina:</label>
                                  <input id="inputHB" aria-label="First name" class="form-control" placeholder="hb"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputLeucocitos">Leucocitos:</label>
                                  <input id="inputLeucocitos" aria-label="First name" class="form-control"
                                         placeholder="leucocitos"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputNeutrofilos">Neutrofilos:</label>
                                  <input id="inputNeutrofilos" aria-label="First name" class="form-control"
                                         placeholder="neutrofilos"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputLinfocitos">Linfocitos:</label>
                                  <input id="inputLinfocitos" aria-label="First name" class="form-control"
                                         placeholder="linfocitos"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputPlaquetas">Plaquetas:</label>
                                  <input id="inputPlaquetas" aria-label="First name" class="form-control" placeholder="plaquetas"
                                         type="text">
                                </div>
                              </div>

                            </li>
                          </ul>

                          <ul class="mb-5">
                            <li>
                              <div class="row mb-3">
                                <div class="col">
                                  <h6 class="text-uppercase fw-bold">BIOQUÍMICO:</h6>
                                </div>
                                <div class="col text-end">
                                  <button class="btn btn-sm btn-primary">
                                    <font-awesome-icon :icon="['fas', 'plus']"/>
                                    Agregar
                                  </button>
                                </div>
                              </div>
                              <div class="row mb-3">
                                <div class="col-3">
                                  <label class="form-label" for="inputDateHb">Fecha:</label>
                                  <input id="inputDateHb" aria-label="First name" class="form-control" placeholder="First name"
                                         type="date">
                                </div>
                              </div>
                              <div class="row mb-3">
                                <div class="col">
                                  <label for="inputHB">Creatinina:</label>
                                  <input id="inputHB" aria-label="First name" class="form-control" placeholder="Creatinina"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputLeucocitos">Urea:</label>
                                  <input id="inputLeucocitos" aria-label="First name" class="form-control"
                                         placeholder="Urea"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputNeutrofilos">TGO:</label>
                                  <input id="inputNeutrofilos" aria-label="First name" class="form-control"
                                         placeholder="TGO"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputLinfocitos">TGP:</label>
                                  <input id="inputLinfocitos" aria-label="First name" class="form-control"
                                         placeholder="TGP"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputPlaquetas">Bilirrubina total:</label>
                                  <input id="inputPlaquetas" aria-label="First name" class="form-control"
                                         placeholder="Bilirrubina total"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputPlaquetas">Fosfatasa Alcalina:</label>
                                  <input id="inputPlaquetas" aria-label="First name" class="form-control"
                                         placeholder="Fosfatasa Alcalina"
                                         type="text">
                                </div>
                              </div>

                              <div class="row mb-3">
                                <div class="col">
                                  <label for="inputPlaquetas">Bilirrubina total:</label>
                                  <input id="inputPlaquetas" aria-label="First name" class="form-control"
                                         placeholder="Bilirrubina total"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputPlaquetas">Glucosa:</label>
                                  <input id="inputPlaquetas" aria-label="First name" class="form-control"
                                         placeholder="Glucosa"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputPlaquetas">Hemoglobina glicosilada: %</label>
                                  <input id="inputPlaquetas" aria-label="First name" class="form-control"
                                         placeholder="Hemoglobina glicosilada"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputPlaquetas">Colesterol total :</label>
                                  <input id="inputPlaquetas" aria-label="First name" class="form-control"
                                         placeholder="Colesterol total "
                                         type="text">
                                </div>
                              </div>

                              <div class="row mb-3">
                                <div class="col">
                                  <label for="inputPlaquetas">Colesterol HDL:</label>
                                  <input id="inputPlaquetas" aria-label="First name" class="form-control"
                                         placeholder="Colesterol HDL"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputPlaquetas">Colesterol LDL:</label>
                                  <input id="inputPlaquetas" aria-label="First name" class="form-control"
                                         placeholder="Colesterol LDL"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputPlaquetas">Colesterol VLDL:</label>
                                  <input id="inputPlaquetas" aria-label="First name" class="form-control"
                                         placeholder="Colesterol VLDL"
                                         type="text">
                                </div>
                                <div class="col">
                                  <label for="inputPlaquetas">Trigliceridos:</label>
                                  <input id="inputPlaquetas" aria-label="First name" class="form-control"
                                         placeholder="Trigliceridos"
                                         type="text">
                                </div>
                              </div>

                            </li>
                          </ul>

                          <ul class="mb-5">
                            <li>
                              <div class="row">
                                <div class="col">
                                  <h6 class="text-uppercase fw-bold">Hormonales:</h6>
                                </div>
                                <div class="col text-end">
                                  <button class="btn btn-sm btn-primary">
                                    <font-awesome-icon :icon="['fas', 'plus']"/>
                                    Agregar
                                  </button>
                                </div>
                              </div>
                              <div class="row mb-3">
                                <div class="col-3">
                                  <label for="inputDateHb">Fecha:</label>
                                  <input id="inputDateHb" aria-label="First name" class="form-control" placeholder="First name"
                                         type="date">
                                </div>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <label for="inputHB">TSH (hormona estimulante del tiroides):</label>
                                  <input id="inputHB" aria-label="First name" class="form-control"
                                         placeholder="TSH (hormona estimulante del tiroides)"
                                         type="text">
                                </div>
                              </div>
                            </li>
                          </ul>

                          <ul class="mb-5">
                            <li>
                              <div class="row">
                                <div class="col">
                                  <h6 class="text-uppercase fw-bold">Imágenes:</h6>
                                </div>
                                <div class="col text-end">
                                  <button class="btn btn-sm btn-primary">
                                    <font-awesome-icon :icon="['fas', 'plus']"/>
                                    Agregar
                                  </button>
                                </div>
                              </div>
                              <div class="row mb-3">
                                <div class="col-3">
                                  <label for="inputDateHb">Fecha:</label>
                                  <input id="inputDateHb" aria-label="First name" class="form-control" placeholder="First name"
                                         type="date">
                                </div>
                              </div>
                              <div class="row mb-3">
                                <div class="col">
                                  <label for="inputHB">Tipo de Imágen:</label>
                                  <input id="inputHB" aria-label="First name" class="form-control"
                                         placeholder="Tipo de Imágen"
                                         type="text">
                                </div>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <label class="form-label" for="exampleFormControlTextarea1">Resultado:</label>
                                  <textarea id="exampleFormControlTextarea1" class="form-control"
                                            placeholder="Resultado"
                                            rows="3"/>
                                </div>
                              </div>
                            </li>
                          </ul>

                        </div>
                      </div>

                    </div>-->

          <div class="d-flex align-items-start">

            <div :id="`v-pills-tab-${props.itemInformation.id}`" aria-orientation="vertical"
                 class="nav flex-column nav-pills me-3 border-end p-1"
                 role="tablist"
            >
              <button v-for="option in patientComplementayTabOption"
                      :id="`v-pills-${option.value}-tab-${props.itemInformation.id}`"
                      :key="option.value"
                      :aria-controls="`v-pills-${option.value}-${props.itemInformation.id}`"
                      :data-bs-target="`#v-pills-${option.value}-${props.itemInformation.id}`"
                      aria-selected="true"
                      class="nav-link text-start"
                      data-bs-toggle="pill"
                      role="tab"
                      type="button"
              >
                {{ option.name }}
              </button>
            </div>

            <div :id="`v-pills-tabContent-${props.itemInformation.id}`" class="tab-content w-100">

              <PathologicalHistoryForm :itemIndexVal="props.itemInformation.id"/>

              <PharmacologicalHistoryForm :itemIndexVal="props.itemInformation.id"/>

              <OthersHistoryForm :itemIndexVal="props.itemInformation.id"/>

              <LaboratoryHistoryForm :itemIndexVal="props.itemInformation.id"/>

            </div>

          </div>

          <!--          <div class="d-flex align-items-start">
                      <div id="v-pills-tab" aria-orientation="vertical" class="nav flex-column nav-pills me-3" role="tablist">
                        <button id="v-pills-home-tab" aria-controls="v-pills-home" aria-selected="true" class="nav-link active"
                                data-bs-target="#v-pills-home" data-bs-toggle="pill" role="tab" type="button">Home
                        </button>
                        <button id="v-pills-profile-tab" aria-controls="v-pills-profile" aria-selected="false" class="nav-link"
                                data-bs-target="#v-pills-profile" data-bs-toggle="pill" role="tab" type="button">Profile
                        </button>
                        <button id="v-pills-disabled-tab" aria-controls="v-pills-disabled" aria-selected="false"
                                class="nav-link" data-bs-target="#v-pills-disabled" data-bs-toggle="pill" disabled
                                role="tab" type="button">Disabled
                        </button>
                        <button id="v-pills-messages-tab" aria-controls="v-pills-messages" aria-selected="false"
                                class="nav-link" data-bs-target="#v-pills-messages" data-bs-toggle="pill" role="tab"
                                type="button">Messages
                        </button>
                        <button id="v-pills-settings-tab" aria-controls="v-pills-settings" aria-selected="false"
                                class="nav-link" data-bs-target="#v-pills-settings" data-bs-toggle="pill" role="tab"
                                type="button">Settings
                        </button>
                      </div>
                      <div id="v-pills-tabContent" class="tab-content">
                        <div id="v-pills-home" aria-labelledby="v-pills-home-tab" class="tab-pane fade show active"
                             role="tabpanel" tabindex="0"
                        >
                          This is some placeholder content the Home tab's associated content. Clicking another tab will toggle the
                          visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility
                          and styling. You can use it with tabs, pills, and any other .nav-powered navigation.
                        </div>
                        <div id="v-pills-profile" aria-labelledby="v-pills-profile-tab" class="tab-pane fade" role="tabpanel"
                             tabindex="0">...
                        </div>
                        <div id="v-pills-disabled" aria-labelledby="v-pills-disabled-tab" class="tab-pane fade" role="tabpanel"
                             tabindex="0">...
                        </div>
                        <div id="v-pills-messages" aria-labelledby="v-pills-messages-tab" class="tab-pane fade" role="tabpanel"
                             tabindex="0">...
                        </div>
                        <div id="v-pills-settings" aria-labelledby="v-pills-settings-tab" class="tab-pane fade" role="tabpanel"
                             tabindex="0">...
                        </div>
                      </div>
                    </div>-->

          <!-- End Form Fields -->


        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>