<script setup>

import {ref} from "vue";

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
const handleFileChange = (event) => {
  const files = event.target.files;
  for (const file of files) {
    console.log(file)
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const fileData = parseFile(file.type, fileContent);
      uploadedFiles.value.push({
        name: file.name,
        size: file.size,
        type: file.type,
        content: fileContent,
        ...fileData,
      });
    };
    reader.readAsDataURL(file);
  }
}
const removeFile = (key) => {
  console.log(key)
  uploadedFiles.value.splice(key, 1)
}
const isPDF = (fileType) => fileType === 'application/pdf'
const isExcel = (fileType) => fileType.startsWith('application/vnd.')

const parseFile = (fileType, fileContent) => {
  if (isPDF(fileType)) {
    return fileContent
  } else if (isExcel(fileType)) {
    return fileContent
  } else {
    return {}
  }
};

const fileSize = (size => {
  if (size < 1024) {
    return `${size} bytes`
  } else if (size < 1048576) {
    return `${(size / 1024).toFixed(1)}` + '.KB'
  } else {
    return `${(size / 1048576).toFixed(1)}` + '.MB'
  }
})

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
        <div class="filezone">
          <input ref="fileInput" :accept="acceptFormats"
                 multiple
                 type="file"
                 @change="handleFileChange"
          />
          <p>
            Arrastra tus archivos aquí <br>o click aquí para Buscar
            <br>
            Formatos aceptados: (.xlsx, .xls, .pdf)
          </p>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col">
        <div class="uploaded-files-container">
          <div v-for="(file, index) in uploadedFiles" :key="index">
            <div class="file-info">
              <span class="file-name">{{ file.name }}</span>
              <span class="file-size">{{ fileSize(file.size) }}</span>
              <button class="btn btn-sm btn-outline-danger" @click="removeFile(index)">
                <font-awesome-icon :icon="['fas', 'trash']"/>
              </button>
            </div>
            <pre v-if="isPDF(file.type)"/>
            <div v-else-if="isExcel(file.type)">
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