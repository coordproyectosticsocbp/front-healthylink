<script setup>

import {ref} from "vue";


const crfModalRef = ref()
const formIsDisplay = ref(false)

const toggleModalMuestra = () => {
  crfModalRef.value.show
}

const toggleForm = () => {
  formIsDisplay.value = !formIsDisplay.value
}



</script>

<template>


  <!-- Modal -->
  <div id="exampleModal" ref="crfModalRef" aria-hidden="true" aria-labelledby="exampleModalLabel" class="modal fade"
       tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="exampleModalLabel" class="modal-title fs-5">
            Validacion de cierre de lote
          </h1>
          <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
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
          <div class="container-fluid">

            <div class="row mb-3">
              <div class="col-4">
                <h6 class="fw-bold text-uppercase">
                  Codigo de muestras
                </h6>
              </div>
              <div class="col-5">
                <div>
                  <input type="text" class="form-control" placeholder="Por ejemplo: MU-55"
                         aria-label="Recipient's username"
                         aria-describedby="basic-addon2">
                </div>
              </div>
              <div class="col-3">
                <div>
                  <button class="btn btn-sm btn-aqua-color" @click="toggleForm">
                    Agregar <font-awesome-icon :icon="['fas', 'plus']" />
                  </button>
                </div>
              </div>
            </div>


            <hr/>
            <div class="row mb-3">
              <div class="col-4">
                <h6 class="fw-bold text-uppercase">

                </h6>
              </div>
              <div class="col-5">
                <div>

                </div>
              </div>

            </div>

          </div>
          <!-- End Form Fields -->


        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>