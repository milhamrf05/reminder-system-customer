<template>
  <div id="auth-layout">
    <div class="row">
      <div class="col-md-6" v-show="$q.screen.gt.sm">
        <div class="logo-wrapper row justify-center items-center">
          <div class="logo">
            <q-img class="logo-auto2000" src="~assets/auto2000logo.png"></q-img>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.logo-wrapper {
  height: 100vh;
  /* border: 1px solid #ff0000; */
}

.logo-auto2000 {
  width: 100px;
  height: 30px;
  flex-shrink: 0;
}
</style>
