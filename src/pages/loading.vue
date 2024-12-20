<script setup lang="ts">

import {ref} from "vue";
import {mockReviewCode, reviewCode} from "@/utils/AIReview";
import router from "@/router";

const loadingPeriod = ref<String>("");
const loadingInterval = setInterval(() => {
  loadingPeriod.value += ".";
  if (loadingPeriod.value.length > 3) {
    loadingPeriod.value = "";
  }
}, 500);

sessionStorage.removeItem("result");
reviewCode().then(res => {
  sessionStorage.setItem("result", JSON.stringify(res));
  clearInterval(loadingInterval);
  router.push("/result");
});

</script>

<template>
  <div class="loading-wrapper">
    <v-progress-circular
      indeterminate
      color="var(--blue)"
      size="50"
    ></v-progress-circular>
    <p class="h2 loading-text">AI is thinking{{loadingPeriod}}</p>
  </div>
</template>

<style scoped>
.loading-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(10px);
}
.loading-text {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
</style>
