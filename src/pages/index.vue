<script lang="ts" setup>
import router from "@/router";

function toReviewer() {
  router.push("/reviewer");
}

</script>

<template>
  <div class="background-wave" />
  <div class="content-wrapper">
    <v-container style="width: 40%; height: 20vh; margin-top: -20vh">
      <v-row>
        <p class="h1" style="font-size: 64px">Dot Reviewer</p>
      </v-row>
      <v-row>
        <p class="h3" style="font-weight: normal">Your next AI powered code quality analyzer</p>
      </v-row>
      <v-row style="margin-top: 40px; margin-bottom: 10px">
        <v-divider/>
      </v-row>
      <v-row>
        <v-col md="4">
          <v-btn color="var(--blue)" size="large" @click="toReviewer">
            <p class="h5 light">Get Started</p>
          </v-btn>
        </v-col>
        <v-col md="3">
          <v-btn color="var(--light)" size="large">
            <p class="h5" style="font-weight: normal">Docs</p>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div style="width: 50%">
      <v-img
        class="display-img"
        src="@/assets/placeholder.jpg"
        max-width="35vw"
      />
    </div>
  </div>
</template>

<style>

.content-wrapper {
  position: absolute;
  top: 54vh;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;

  display: flex;
  flex-direction: row;

  align-items: center;
}
.display-img {
  opacity: 90%;
  box-shadow: var(--dark) 0px 0px 20px;
}
</style>
