<script setup>

import {ref} from "vue";
import {toast} from "vue3-toastify";

const props = defineProps({
  itemIndexVal: Number
})

const files = ref([])
const filesRef = ref()
const previewRef = ref([])

/*
* Methods
* */
const removeFile = (key) => {
  console.log(key)
  files.value.splice(key, 1)
  getImagePreviews()
}

const submitFiles = () => {
  for (let i = 0; i < files.value.length; i++) {
    if (files.value[i].id) {
      continue;
    }
    let formData = new FormData();
    formData.append('file', this.files[i]);

    //files.value[i].i =

    console.log(formData)
    /*axios.post('/' + this.post_url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
    ).then(function (data) {
      this.files[i].id = data['data']['id'];
      this.files.splice(i, 1, this.files[i]);
      console.log('success');
    }.bind(this)).catch(function (data) {
      console.log('error');
    });*/
  }
}

const handleFiles = () => {

  let uploadedFiles = filesRef.value.files
  if (/\.(xlsx|xls|pdf)$/i.test(uploadedFiles[0].name.split('.').pop().toLowerCase())) {
    for (let i = 0; i < uploadedFiles.length; i++) {
      files.value.push(uploadedFiles[i]);
    }
  } else {
    toast.error('Tipo de archivo no Permitido, solo (xlsx, xls, pdf)')
    return false
  }
  console.log(uploadedFiles[0].name.split('.').pop().toLowerCase())
  console.log(uploadedFiles[0].name)

  getImagePreviews()
  /*for (let i = 0; i < uploadedFiles.length; i++) {
    files.value.push(uploadedFiles[i]);
  }
  getImagePreviews()*/
}

function getImagePreviews() {
  for (let i = 0; i < files.value.length; i++) {
    if (/\.(xlsx|xls|pdf)$/i.test(files.value[i].name)) {
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        previewRef.value[i].src =
            files.value[i].name.split('.').pop().toLowerCase() === 'pdf' ?
                '/images/pdf_icon.png' : '/images/excel_icon.png';
      }.bind(this), false);
      reader.readAsDataURL(files.value[i]);
    } else {
      toast.error('Tipo de archivo no Permitido, solo (xlsx, xls, pdf)')
      return false;
    }
  }
}


</script>

<template>

  <div :id="`v-pills-attachment-${props.itemIndexVal}`"
       :aria-labelledby="`v-pills-attachment-tab-${props.itemIndexVal}`"
       class="tab-pane fade show"
       role="tabpanel" tabindex="0"
  >

    <div class="row mb-3">
      <div class="col text-center">
        <h6 class="fw-bold text-uppercase">
          Anexos
        </h6>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col">
        <div class="large-12 medium-12 small-12 filezone">
          <input id="files" ref="filesRef" multiple type="file" v-on:change="handleFiles()"/>
          <p class="mb-0">
            Arrastra tus archivos aquí <br>o click aquí para Buscar
            <br>
            Formatos aceptados: (.xlsx, .xls, .pdf)
          </p>
        </div>

        <div v-for="(file, key) in files" :key="key" class="file-listing">
          <img ref="previewRef" class="preview"/>
          {{ file.name }}
          <div v-if="file.id > 0" class="success-container">
            Success
          </div>
          <div v-else class="remove-container">
            <a class="remove" v-on:click="removeFile(key)">Remove</a>
          </div>
        </div>

        <a v-show="files.length > 0" class="submit-button" v-on:click="submitFiles()">Submit</a>
      </div>
      <!-- /.col -->

      //
    </div>

  </div>


</template>

<style scoped>
input[type="file"] {
  opacity: 0;
  width: 100%;
  height: 150px;
  position: absolute;
  cursor: pointer;
}

.filezone {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: #ccc;
  color: dimgray;
  padding: 10px 10px;
  min-height: 150px;
  position: relative;
  cursor: pointer;
}

.filezone:hover {
  background: #c0c0c0;
}

.filezone p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 50px 50px 50px;
}

div.file-listing img {
  max-width: 90%;
}

div.file-listing {
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

div.file-listing img {
  height: 100px;
}

div.success-container {
  text-align: center;
  color: green;
}

div.remove-container {
  text-align: center;
}

div.remove-container a {
  color: red;
  cursor: pointer;
}

a.submit-button {
  display: block;
  margin: auto;
  text-align: center;
  width: 200px;
  padding: 10px;
  text-transform: uppercase;
  background-color: #CCC;
  color: white;
  font-weight: bold;
  margin-top: 20px;
}

.preview {
  height: 30px !important;
}
</style>