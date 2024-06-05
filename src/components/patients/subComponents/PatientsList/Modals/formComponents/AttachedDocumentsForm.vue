<script setup>

import {ref} from "vue";
import FileUploadService from "@/services/patients/FileUpload.service.js";

const props = defineProps({
  itemIndexVal: Number
})

/*
* Global Variables
* */
const acceptFormats = '.xlsx, .xls, .pdf';
const uploadedFiles = ref([])
const fileInput = ref(null)

/*
* Methods
*
* */
const handleFileChange = async (event) => {
  if (!event.target.files[0]) return
  try {
    //Step 1 Starts
    const imageFile = event.target.files[0];
    let fileName = imageFile.name
    let fileExtension = fileName.split('.').pop()
    let formData = new FormData();
    const folder = 'files/' + props.itemIndexVal //Folder inside S3 where files will store

    // FormData
    formData.set("minv_formulario_id", props.itemIndexVal)
    formData.set("filename", fileName)
    formData.set("directory", folder)
    formData.set("file", imageFile)
    formData.set("fileExtension", fileExtension)

    //Consuming File Service
    let res = await FileUploadService.imgPreSignedUrl(formData)
    //Step 1 ends

    // Step 5 Starts
    let inputs = res.data.inputs;
    let attributes = res.data.attributes;
    formData = new FormData();
    Object.keys(inputs).forEach((key) => {
      formData.append(key, inputs[key]);
    });
    formData.append("file", imageFile)

    let ress = await fetch(attributes.action, {
      method: "POST",
      body: formData,
      mode: "cors",
    })
    console.log("Posted image on s3", ress);
    // Step 5 Ends

  } catch (err) {
    console.log("Failed to upload");
    console.log(err);
  }
}
const removeFile = (key) => {
  console.log(key)
  uploadedFiles.value.splice(key, 1)
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

    <div class="row mb-4">
      <div class="col">
        <form enctype="multipart/form-data" @change="handleFileChange">
          <div class="filezone">
            <input ref="fileInput" :accept="acceptFormats"
                   multiple
                   type="file"
            />
            <p>
              Arrastra tus archivos aquí <br>o click aquí para Buscar
              <br>
              Formatos aceptados: (.xlsx, .xls, .pdf)
            </p>
          </div>
        </form>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col">
        <div class="uploaded-files-container">
          <div v-for="(file, index) in uploadedFiles" :key="index">
            <div class="file-info">
              <span class="file-name">{{ file.name }}</span>
              <span class="file-size">{{ file.size }}</span>
              <button class="btn btn-sm btn-outline-danger" @click="removeFile(index)">
                <font-awesome-icon :icon="['fas', 'trash']"/>
              </button>
            </div>
            <!--            <pre v-if="isPDF(file.type)"/>-->
            <!--            <div v-else-if="isExcel(file.type)">-->
            <div>
              <table>
                <thead>
                <tr>
                  <th v-for="(column, index) in file.headers" :key="index">{{ column }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row, index) in file.data" :key="index">
                  <td v-for="(cell, index) in row" :key="index">{{ cell }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- /.col -->
    </div>

  </div>


</template>

<style scoped>
input[type="file"] {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.filezone {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: #ccc;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
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

.file-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.file-name {
  font-weight: bold;
  margin-right: 10px;
}

.file-size {
  color: gray;
}
</style>