<script setup>

</script>

<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1>404</h1>
      </div>
      <h2>Oops! Nothing was found</h2>
      <p>
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
        <router-link :to="{ name: 'statistics' }">
          Return to HomePage
        </router-link
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
#notfound {
  position: relative;
  height: 100vh;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound {
  max-width: 767px;
  width: 100%;
  line-height: 1.4;
  text-align: center;
  padding: 15px;
}

.notfound .notfound-404 {
  position: relative;
  height: 220px;
}

.notfound .notfound-404 h1 {
  font-family: kanit, sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 186px;
  font-weight: 200;
  margin: 0;
  background-image: linear-gradient(to right, #0b588e, #76d3f5);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  text-transform: uppercase;
}

.notfound h2 {
  font-family: 'Quicksand', sans-serif;
  font-size: 33px;
  font-weight: 200;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 25px;
  letter-spacing: 3px;
}

.notfound p {
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 25px;
}
</style>