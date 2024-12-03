<script setup lang="ts">

</script>

<template>
  <div class="header_wrapper">
    <v-row no-gutters align="center">
      <v-col md="1" />
      <v-col class="header_item" md="2">
        <v-img src="../assets/favicon.png" class="icon" />
        <p style="align-items: start;" class="h3">
          Dot Reviewer
        </p>
      </v-col>
      <v-spacer />
      <v-col class="header_item text-large" md="2">
        <button class="link_item"> Reviewer </button>
        <button class="link_item"> Docs </button>
        <button class="link_item"> About </button>
      </v-col>
      <v-col md="2" />
    </v-row>
  </div>
</template>

<style scoped>
.header_wrapper {
  background-color: white;

  height: 8vh;
  width: 100vw;

  padding: 1vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;

  border-bottom: lightgray 0.1vh solid;
}

.header_item {
  height: 6vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
}

.icon {
  height: 5vh;
  max-width: 5vh;
  margin-right: 30px;
}

.link_item {
  text-decoration: none;
  margin-right: 2vw;
}
</style>
